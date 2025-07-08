import { factories } from '@strapi/strapi'

// Helper function to recursively get all child category IDs
async function getChildCategoryIds(parentId: number, categoryIds: Set<number>, strapi: any) {
  try {
    
    // Use strapi.db.query to get category with children
    const categoryWithChildren = await strapi.db.query('api::category.category').findOne({
      where: { id: parentId },
      populate: {
        children: {
          populate: ['children']
        }
      }
    });
        
    if (categoryWithChildren && categoryWithChildren.children) {
      const addChildrenIds = (children: any[]) => {
        children.forEach(child => {
          if (child.id && !categoryIds.has(child.id)) {
            console.log(`Adding child category ${child.id} to the set`);
            categoryIds.add(child.id);
            if (child.children && child.children.length > 0) {
              addChildrenIds(child.children);
            }
          }
        });
      };
      
      addChildrenIds(categoryWithChildren.children);
    } else {
      console.log(`❌ No children found for category ${parentId}`);
    }
  } catch (error) {
    console.error(`Error fetching children for category ${parentId}:`, error);
  }
}

// Helper function to parse category IDs from various formats
function parseCategoryIds(input: any): string[] {
  if (Array.isArray(input)) {
    return input;
  }
  
  if (typeof input === 'string') {
    // Handle comma-separated string like "8,17"
    return input.split(',').map(id => id.trim()).filter(id => id.length > 0);
  }
  
  return [];
}

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  // Override the find method to handle parent category filtering
  async find(ctx) {
    
    const { category, minPrice, maxPrice, filters, ...otherParams } = ctx.query;
    
    // Build the base query
    let queryFilters: any = {};
    let populate = ['*'];
    
    // Handle price filters
    if (minPrice || maxPrice) {
      queryFilters.price = {};
      if (minPrice) queryFilters.price.$gte = parseFloat(minPrice as string);
      if (maxPrice) queryFilters.price.$lte = parseFloat(maxPrice as string);
    }
    
    // Handle category filtering with parent/child logic
    let categoryIds: string[] = [];
    let categorySlugs: string[] = [];
    
    // Check for category parameter (new format)
    if (category) {
      categoryIds = parseCategoryIds(category);
    }
    
    // Check for filters[categories][id][$in] format (current frontend format)
    if (filters && typeof filters === 'object' && 'categories' in filters) {
      const filtersObj = filters as any;
      if (filtersObj.categories && filtersObj.categories.id && filtersObj.categories.id.$in) {
        const existingIds = parseCategoryIds(filtersObj.categories.id.$in);
        categoryIds = [...categoryIds, ...existingIds];
        console.log('🔍 Filters categories found:', existingIds);
      }
      
      // Check for filters[categories][slug][$in] format (frontend format)
      if (filtersObj.categories && filtersObj.categories.slug && filtersObj.categories.slug.$in) {
        const existingSlugs = parseCategoryIds(filtersObj.categories.slug.$in);
        categorySlugs = [...categorySlugs, ...existingSlugs];
        console.log('🔍 Filters categories slugs found:', existingSlugs);
      }
    }
        
    // Process category IDs
    if (categoryIds.length > 0) {
      // Get all selected categories and their children
      const allCategoryIds = new Set<number>();
      
      for (const categoryId of categoryIds) {
        const catId = parseInt(categoryId as string);
        if (!isNaN(catId)) {
          console.log(`🎯 Processing category ID: ${catId}`);
          allCategoryIds.add(catId);
          
          // Get children of this category recursively
          await getChildCategoryIds(catId, allCategoryIds, strapi);
        }
      }
      
      // Add to query filters
      if (allCategoryIds.size > 0) {
        queryFilters.categories = {
          id: {
            $in: Array.from(allCategoryIds)
          }
        };
      }
    }
    
    // Process category slugs
    if (categorySlugs.length > 0) {
      // Get categories by slugs
      const categoriesBySlug = await strapi.db.query('api::category.category').findMany({
        where: {
          slug: {
            $in: categorySlugs
          }
        },
        populate: {
          children: {
            populate: ['children']
          }
        }
      });
      
      // Get all category IDs (including children)
      const allCategoryIds = new Set<number>();
      
      for (const category of categoriesBySlug) {
        console.log(`🎯 Processing category slug: ${category.slug} (ID: ${category.id})`);
        allCategoryIds.add(category.id);
        
        // Get children of this category recursively
        await getChildCategoryIds(category.id, allCategoryIds, strapi);
      }
      
      // Update query filters
      if (allCategoryIds.size > 0) {
        if (queryFilters.categories) {
          // Merge with existing category filters
          const existingIds = queryFilters.categories.id.$in || [];
          queryFilters.categories.id.$in = [...new Set([...existingIds, ...Array.from(allCategoryIds)])];
        } else {
          queryFilters.categories = {
            id: {
              $in: Array.from(allCategoryIds)
            }
          };
        }
      }
    }
    
    // Merge with other filters from the original query
    if (filters && typeof filters === 'object') {
      const filtersObj = filters as any;
      // Remove the categories filter since we've handled it above
      const { categories, ...otherFilters } = filtersObj;
      Object.assign(queryFilters, otherFilters);
    }
        
    // Execute the query
    const { results, pagination } = await strapi.service('api::product.product').find({
      filters: queryFilters,
      populate,
      ...otherParams
    });
        
    return ctx.send({
      data: results,
      meta: {
        pagination
      }
    });
  },

  // Méthode personnalisée pour récupérer les produits suggérés basés sur les catégories
  async getSuggested(ctx) {
    try {
      console.log('🔍 Début de getSuggested avec params:', ctx.params);
      
      const { productId } = ctx.params;
      
      if (!productId) {
        console.log('❌ Pas d\'ID de produit fourni');
        return ctx.badRequest('ID du produit requis');
      }

      console.log('🎯 Recherche du produit avec ID:', productId);

      // Récupérer le produit actuel avec ses catégories
      const currentProduct = await strapi.service('api::product.product').findOne(productId, {
        populate: {
          categories: {
            populate: ['children']
          }
        }
      });

      if (!currentProduct) {
        console.log('❌ Produit non trouvé avec ID:', productId);
        return ctx.notFound('Produit non trouvé');
      }

      console.log('✅ Produit trouvé:', currentProduct.title);

      // Collecter toutes les catégories (parent + enfants)
      const allCategoryIds = new Set<number>();
      
      if (currentProduct.categories && currentProduct.categories.length > 0) {
        console.log('📂 Catégories du produit:', currentProduct.categories.map(c => c.name));
        
        for (const category of currentProduct.categories) {
          allCategoryIds.add(category.id);
          
          // Ajouter les catégories enfants récursivement
          if (category.children && category.children.length > 0) {
            const addChildrenIds = (children: any[]) => {
              children.forEach(child => {
                allCategoryIds.add(child.id);
                if (child.children && child.children.length > 0) {
                  addChildrenIds(child.children);
                }
              });
            };
            addChildrenIds(category.children);
          }
        }
      }

      console.log('🎯 IDs de catégories à rechercher:', Array.from(allCategoryIds));

      // Récupérer les produits suggérés basés sur les catégories communes
      const suggestedProducts = await strapi.service('api::product.product').find({
        filters: {
          publishedAt: {
            $notNull: true
          },
          // Exclure le produit actuel en utilisant son documentId (UUID) au lieu de l'ID numérique
          documentId: {
            $ne: productId
          },
          categories: {
            id: {
              $in: Array.from(allCategoryIds)
            }
          }
        },
        sort: { createdAt: 'desc' },
        pagination: {
          limit: 6
        },
        populate: {
          images: true,
          categories: true,
          reviews: true
        }
      });

      console.log('✅ Produits suggérés trouvés:', suggestedProducts.results.length);

      return ctx.send({
        data: suggestedProducts.results,
        meta: {
          pagination: suggestedProducts.pagination
        }
      });
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des produits suggérés:', error);
      return ctx.badRequest('Erreur lors de la récupération des produits suggérés');
    }
  }
}));
