import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
  async create(ctx) {
    
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { data } = ctx.request.body;
    
    const product = await strapi.entityService.findOne('api::product.product', data.product);
    if (!product) {
      return ctx.badRequest(`Produit avec l'ID ${data.product} non trouvé`);
    }
    
    const createData = {
      ...data,
      user: user.id,
      product: product.id,
    };
    
    const entry = await strapi.entityService.create('api::review.review', {
      data: createData,
      populate: ['user','product','img'],
    });

    return ctx.send({ data: entry });
  },
  
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
  
    const { filters } = ctx.query;

    const allGrades = await strapi.db
      .query('api::review.review')
      .findMany({
        where: filters,
        select: ['grade'],
      });
    
  
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
  
    allGrades.forEach(({ grade }, index) => {
      const g = parseInt(grade, 10);
      
      if (counts[g] !== undefined) {
        counts[g] += 1;
        sum += g;
      } else {
        console.log(`Grade ${g} not in valid range (1-5)`);
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
