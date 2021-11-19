"use strict"

/**
 * import-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `import-plugin` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    const data = await strapi.services["agenda-content"].find()

    // console.log("AQUI")
    // console.log(strapi.services)

    // Send 200 `ok`
    ctx.send({
      // message: "ok"
      data
    })
  }
}
