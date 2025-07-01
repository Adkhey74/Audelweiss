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
            console.log(`➕ Adding child category ${child.id} to the set`);
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
    }
        
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
            
      // Filter by all categories (parent + children)
      if (allCategoryIds.size > 0) {
        queryFilters.categories = {
          id: {
            $in: Array.from(allCategoryIds)
          }
        };
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
  }
}));
