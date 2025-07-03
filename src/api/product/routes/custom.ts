/**
 * Custom product routes
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/products/:productId/suggested',
      handler: 'product.getSuggested',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 