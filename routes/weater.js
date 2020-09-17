const router = require('express').Router();
const { WeatherController } = require(`${__base}/di`);

router.get('/:city', WeatherController.getWeatherByCityName.bind(WeatherController));

module.exports = router;