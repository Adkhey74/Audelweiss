/**
 * user-addresse controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::user-addresse.user-addresse",
  ({ strapi }) => ({
    // Hérite de toutes les actions par défaut
    async find(ctx) {
      // Appel de l'action par défaut
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },

    async findOne(ctx) {
      const { data } = await super.findOne(ctx);
      return { data };
    },

    async create(ctx) {
      const { data } = await super.create(ctx);
      return { data };
    },

    async update(ctx) {
      const { data } = await super.update(ctx);
      return { data };
    },

    async delete(ctx) {
      const { data } = await super.delete(ctx);
      return { data };
    },
  })
);
