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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'header.nav-item': HeaderNavItem;
    }
  }
}
