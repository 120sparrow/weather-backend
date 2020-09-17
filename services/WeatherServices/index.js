const moment = require('moment');
const errors = require('./errors');
const { YYYY_MM_DD } = require(`${__base}/helpers/enums`)

class WeatherServices {

    constructor(cityModel) {
        this.__cityModel = cityModel;
        this.__errors = errors;
    }

    async getWeatherByCityName(cityName) {
        const dateNow = Date.now();
        const dayNow = moment(dateNow).format(YYYY_MM_DD);
        const firsDayOfWeek = moment(dateNow).isoWeekday(1).format(YYYY_MM_DD);
        const firsDayOfData = firsDayOfWeek === dayNow
            ? moment(dateNow).subtract(1, 'days').format(YYYY_MM_DD)
            : firsDayOfWeek;
        const scope = [
            {
                method: [
                    'withTemperature',
                    cityName,
                    dayNow,
                    firsDayOfData
                ]
            }
        ];
        const result = await this.__cityModel.scope(scope).findOne();

        if (!result) {
            throw new this.__errors.WeatherNotFoundError();
        }

        return result.render(dayNow, firsDayOfWeek);
    }

}

module.exports = WeatherServices;