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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.footer-main': FooterFooterMain;
      'footer.footer-nav-item': FooterFooterNavItem;
      'header.nav-item-with-sublinks': HeaderNavItemWithSublinks;
      'nav.nav-item': NavNavItem;
    }
  }
}
