const moment = require('moment');
const _ = require('lodash');
const sinon = require('sinon');
const {
    CITY_WEATHER,
    YYYY_MM_DD,
    YYYY_MM_DD_HH_MM
} = require('../helpers/enums');
const cities = require('./data/cities');
const temperature = require('./data/temperature');

module.exports = {
    up: queryInterface => {
        let stub;
        if (process.env.NODE_ENV === 'test') {
            stub = sinon.stub( Date, 'now' );
            stub.returns( 1599350400000 );
        }

        const seedData = cities.map(({id}) => {
            const dateNow = Date.now();
            const dayNow = moment(dateNow).date();
            return temperature.map((item, index) => {
                const date = moment(dateNow)
                    .subtract(dayNow + 1, 'days')
                    .day(dayNow + 1 - index)
                    .format(YYYY_MM_DD);
                const temperature = item;
                return {
                    city_id: id,
                    date,
                    temperature,
                    created_at: moment().format(YYYY_MM_DD_HH_MM),
                    updated_at: moment().format(YYYY_MM_DD_HH_MM),
                }
            })
        })

        if (process.env.NODE_ENV === 'test') stub.restore()


        return queryInterface.bulkInsert(CITY_WEATHER, _.flatten(seedData), {});
    },

    down: queryInterface => queryInterface.bulkDelete(CITY_WEATHER, null, {})
};
