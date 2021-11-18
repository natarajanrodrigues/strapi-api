'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // GET /hello
  async index(ctx) {
    console.log(ctx.query)
    const xx = await strapi.services.activity.populate(ctx.query)
    console.log(xx)
    ctx.send('Hellooo');
  },
};
