const BaseController = require(`${__base}/controllers/BaseController`);

class WeatherController extends BaseController {

    constructor(weatherService) {
        super();

        this.__weatherService = weatherService;
    }

    async getWeatherByCityName(req, res) {
        let result;

        try {
            result = await this.__weatherService.getWeatherByCityName( req.params.city );
        } catch (e) {
            this.__processErrors( e, res );
        }

        return res.status(200).json(result);
    }

}

module.exports = WeatherController;