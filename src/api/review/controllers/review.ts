import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { data } = ctx.request.body;
    const entry = await strapi.entityService.create('api::review.review', {
      data: {
        ...data,
        user: user.id,
      },
      populate: ['user','product','img'],
    });

    return ctx.send({ data: entry });
  },
  
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
  
    // 1) Récupère toutes les notes de la base
    const allGrades = await strapi.db
      .query('api::review.review')
      .findMany({ select: ['grade'] });
  
    // 2) Calcule les stats sur toutes les reviews
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
  
    allGrades.forEach(({ grade }) => {
      const g = parseInt(grade, 10);
      if (counts[g] !== undefined) {
        counts[g] += 1;
        sum += g;
      }
    });
  
    const totalRatings = allGrades.length;
    const average = totalRatings > 0
      ? Number((sum / totalRatings).toFixed(1))
      : 0;
  
    // 5) On injecte en meta
    meta.ratingStats = {
      average,
      counts,
      totalRatings
    };
  
    return { data, meta };
  }
  
}));
