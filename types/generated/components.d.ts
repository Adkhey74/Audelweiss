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
      'product.color-variant': ProductColorVariant;
      'product.informations': ProductInformations;
      'product.pompon-variant': ProductPomponVariant;
      'product.size-variant': ProductSizeVariant;
    }
  }
}
