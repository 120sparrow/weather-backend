const moment = require('moment');
const {
    CITY,
    YYYY_MM_DD_HH_MM
} = require(`../helpers/enums`);
const cities = require('./data/cities');

module.exports = {
  up: queryInterface => {
      const seedData = cities.map( ({ id, city }) => ({
          id,
          city_name: city,
          created_at: moment().format(YYYY_MM_DD_HH_MM),
          updated_at: moment().format(YYYY_MM_DD_HH_MM),
      }))

      return queryInterface.bulkInsert(CITY, seedData, {});
  },

  down: queryInterface => queryInterface.bulkDelete(CITY, null, {})
};
