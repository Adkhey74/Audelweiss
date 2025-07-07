import type { Schema, Struct } from '@strapi/strapi';

export interface AboutParcoursProfessionnel extends Struct.ComponentSchema {
  collectionName: 'components_about_parcours_professionnels';
  info: {
    displayName: 'Parcours professionnel';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
  };
}

export interface AboutPremiereSection extends Struct.ComponentSchema {
  collectionName: 'components_about_premiere_sections';
  info: {
    description: '';
    displayName: 'Premi\u00E8re section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
  };
}

export interface FooterFooterMain extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_mains';
  info: {
    description: '';
    displayName: 'Footer_main';
  };
  attributes: {
    description: Schema.Attribute.Text;
    img: Schema.Attribute.Media<'images'>;
  };
}

export interface FooterFooterNavItem extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_nav_items';
  info: {
    description: '';
    displayName: 'Footer_nav_item';
  };
  attributes: {
    category: Schema.Attribute.String;
    links: Schema.Attribute.Component<'nav.nav-item', true>;
  };
}

export interface HeaderNavItemWithSublinks extends Struct.ComponentSchema {
  collectionName: 'components_header_nav_item_with_sublinks';
  info: {
    description: '';
    displayName: 'Nav_item_with_sublinks';
  };
  attributes: {
    img: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sublinks: Schema.Attribute.Component<'nav.nav-item', true>;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface HomeAboutCreator extends Struct.ComponentSchema {
  collectionName: 'components_home_about_creators';
  info: {
    displayName: 'AboutCreator';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface HomeArgumentsBlocks extends Struct.ComponentSchema {
  collectionName: 'components_home_arguments_blocks';
  info: {
    displayName: 'ArgumentsBlocks';
  };
  attributes: {
    Arguments: Schema.Attribute.Component<'home.second-section-block', true>;
  };
}

export interface HomeBlogsBlock extends Struct.ComponentSchema {
  collectionName: 'components_home_blogs_blocks';
  info: {
    displayName: 'BlogsBlock';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeCategoryBlock extends Struct.ComponentSchema {
  collectionName: 'components_home_category_blocks';
  info: {
    displayName: 'CategoryBlock';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    title: Schema.Attribute.String;
  };
}

export interface HomeHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface HomeProductsBlock extends Struct.ComponentSchema {
  collectionName: 'components_home_products_blocks';
  info: {
    displayName: 'ProductsBlock';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeSecondSectionBlock extends Struct.ComponentSchema {
  collectionName: 'components_home_second_section_blocks';
  info: {
    description: '';
    displayName: 'ArgumentsItem';
    icon: 'apps';
  };
  attributes: {
    Content: Schema.Attribute.RichText;
    Title: Schema.Attribute.String;
  };
}

export interface NavNavItem extends Struct.ComponentSchema {
  collectionName: 'components_nav_nav_items';
  info: {
    displayName: 'Nav_item';
  };
  attributes: {
    img: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ProductColorVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_color_variants';
  info: {
    description: '';
    displayName: 'color-variant';
  };
  attributes: {
    color: Schema.Attribute.Relation<'oneToOne', 'api::color.color'>;
    price: Schema.Attribute.Decimal;
  };
}

export interface ProductInformations extends Struct.ComponentSchema {
  collectionName: 'components_product_informations';
  info: {
    displayName: 'informations';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ProductPomponVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_pompon_variants';
  info: {
    description: '';
    displayName: 'pompon_variant';
  };
  attributes: {
    enabled: Schema.Attribute.Boolean;
    price: Schema.Attribute.Decimal;
  };
}

export interface ProductSizeVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_size_variants';
  info: {
    displayName: 'size_variant';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    size: Schema.Attribute.Enumeration<['Adulte', 'Enfant', 'Unique']>;
  };
}

export interface ProductSubcategoryAssignment extends Struct.ComponentSchema {
  collectionName: 'components_product_subcategory_assignments';
  info: {
    description: "Association d'un produit \u00E0 une sous-cat\u00E9gorie sp\u00E9cifique";
    displayName: 'Subcategory Assignment';
  };
  attributes: {
    category: Schema.Attribute.Relation<'manyToOne', 'api::category.category'> &
      Schema.Attribute.Required;
    subcategoryName: Schema.Attribute.String & Schema.Attribute.Required;
    subcategorySlug: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.parcours-professionnel': AboutParcoursProfessionnel;
      'about.premiere-section': AboutPremiereSection;
      'footer.footer-main': FooterFooterMain;
      'footer.footer-nav-item': FooterFooterNavItem;
      'header.nav-item-with-sublinks': HeaderNavItemWithSublinks;
      'home.about-creator': HomeAboutCreator;
      'home.arguments-blocks': HomeArgumentsBlocks;
      'home.blogs-block': HomeBlogsBlock;
      'home.category-block': HomeCategoryBlock;
      'home.hero-section': HomeHeroSection;
      'home.products-block': HomeProductsBlock;
      'home.second-section-block': HomeSecondSectionBlock;
      'nav.nav-item': NavNavItem;
      'product.color-variant': ProductColorVariant;
      'product.informations': ProductInformations;
      'product.pompon-variant': ProductPomponVariant;
      'product.size-variant': ProductSizeVariant;
      'product.subcategory-assignment': ProductSubcategoryAssignment;
    }
  }
}
