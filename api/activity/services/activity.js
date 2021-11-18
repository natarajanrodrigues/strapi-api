'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const axios = require('axios')
const qs = require('querystring')

module.exports = {

  populate: async (params) => {

    try {


      const myUrl = `https://www.siscultural.herokuapp.com/xxxx?${qs.stringify(
        params
      )}`


      console.log(myUrl)



    } catch (e) {
      console.error(e)
    }

  }
};
