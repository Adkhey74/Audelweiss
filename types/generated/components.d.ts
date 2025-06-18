import type { Schema, Struct } from '@strapi/strapi';

export interface HeaderNavItem extends Struct.ComponentSchema {
  collectionName: 'components_header_nav_items';
  info: {
    displayName: 'nav_item';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'header.nav-item': HeaderNavItem;
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
    }
  }
}
