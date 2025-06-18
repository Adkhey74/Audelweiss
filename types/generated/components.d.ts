import type { Schema, Struct } from '@strapi/strapi';

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

export interface HomeHeroAttribut extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_attributs';
  info: {
    description: '';
    displayName: 'Hero attribut';
    icon: 'apps';
  };
  attributes: {
    Texte: Schema.Attribute.String;
  };
}

export interface HomeSecondSectionBlock extends Struct.ComponentSchema {
  collectionName: 'components_home_second_section_blocks';
  info: {
    description: '';
    displayName: 'Second section block';
    icon: 'apps';
  };
  attributes: {
    Content: Schema.Attribute.RichText;
    Title: Schema.Attribute.String;
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
      'footer.footer-main': FooterFooterMain;
      'footer.footer-nav-item': FooterFooterNavItem;
      'header.nav-item-with-sublinks': HeaderNavItemWithSublinks;
      'nav.nav-item': NavNavItem;
      'home.hero-attribut': HomeHeroAttribut;
      'home.second-section-block': HomeSecondSectionBlock;
      'product.color-variant': ProductColorVariant;
      'product.informations': ProductInformations;
      'product.pompon-variant': ProductPomponVariant;
      'product.size-variant': ProductSizeVariant;
    }
  }
}
