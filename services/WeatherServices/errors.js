const errors = require(`${__base}/errors`);

class WeatherServicesError extends errors.ApplicationError {}

class WeatherNotFoundError extends WeatherServicesError {}

module.exports = {
  WeatherServicesError,
  WeatherNotFoundError
};