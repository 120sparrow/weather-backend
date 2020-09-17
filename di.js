const Bottle = require('bottlejs');
const di = new Bottle();
const models = require(`${__base}/models`)

di.factory('CityModel', () => models.City);
di.service('WeatherService', require(`${__base}/services/WeatherServices`), 'CityModel');
di.service('WeatherController', require(`${__base}/controllers/v1/WeatherController`), 'WeatherService');

module.exports = di.container;