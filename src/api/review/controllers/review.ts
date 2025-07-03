import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
  async create(ctx) {
    console.log('=== CREATE REVIEW ===');
    console.log('User:', ctx.state.user);
    
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { data } = ctx.request.body;
    console.log('Request data:', data);
    
    const entry = await strapi.entityService.create('api::review.review', {
      data: {
        ...data,
        user: user.id,
      },
      populate: ['user','product','img'],
    });

    console.log('Created entry:', entry);
    return ctx.send({ data: entry });
  },
  
  async find(ctx) {
    console.log('=== FIND REVIEWS ===');
    const { data, meta } = await super.find(ctx);
    console.log('Initial data length:', data.length);
    console.log('Initial meta:', meta);
  
    const { filters } = ctx.query;

    // 1) Récupère toutes les notes de la base
    const allGrades = await strapi.db
      .query('api::review.review')
      .findMany({
        where: filters,
        select: ['grade'],
      });
    
    console.log('All grades from DB:', allGrades);
  
    // 2) Calcule les stats sur toutes les reviews
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
  
    allGrades.forEach(({ grade }, index) => {
      console.log(`Processing grade ${index}:`, grade, 'Type:', typeof grade);
      const g = parseInt(grade, 10);
      console.log(`Parsed grade:`, g, 'Is NaN:', isNaN(g));
      
      if (counts[g] !== undefined) {
        counts[g] += 1;
        sum += g;
        console.log(`Updated counts[${g}] = ${counts[g]}, sum = ${sum}`);
      } else {
        console.log(`Grade ${g} not in valid range (1-5)`);
      }
    });
  
    const totalRatings = allGrades.length;
    const average = totalRatings > 0
      ? Number((sum / totalRatings).toFixed(1))
      : 0;
      
    console.log('Final counts:', counts);
    console.log('Total ratings:', totalRatings);
    console.log('Sum:', sum);
    console.log('Average:', average);
  
    // 5) On injecte en meta
    meta.ratingStats = {
      average,
      counts,
      totalRatings
    };
    
    console.log('Final meta:', meta);
  
    return { data, meta };
  }
  
}));
