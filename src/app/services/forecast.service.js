import angular from 'angular';

class Forecast {

  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;

    this.cache = {};
    this.timeout = 10 * 60 * 1000; // 10 minutes
  }

  processForcast(response) {
    const forecast = response.data.list;
    const dailyForecast = {};

    angular.forEach(forecast, item => {
      const splitted = item.dt_txt.split(' ');

      if (!dailyForecast[splitted[0]]) {
        dailyForecast[splitted[0]] = [];
      }

      dailyForecast[splitted[0]].push({
        item,
        time: splitted[1]
      });
    });

    return dailyForecast;
  }

  getForecast(cityId) {
    const apiKey = '8d40a876d2c32e2d0f274ddeabdfbdb8';
    const url = 'http://api.openweathermap.org/data/2.5/forecast';
    let isCached = false;

    const config = {
      params: {
        id: cityId,
        APPID: apiKey
      }
    };

    const defered = this.$q.defer();

    if (this.cache[cityId]) {
      const currentTime = new Date().getTime();

      if (currentTime - this.cache[cityId].timestamp < this.timeout) {
        isCached = true;
        defered.resolve(this.cache[cityId].response);
      } else {
        delete this.cache[cityId];
      }
    }

    if (!isCached) {
      this.$http.get(url, config).then(response => {
        const forecast = this.processForcast(response);
        this.cache[cityId] = {
          timestamp: new Date().getTime(),
          response: forecast
        };

        defered.resolve(forecast);
      }, error => {
        defered.reject(error);
      });
    }

    return defered.promise;
  }
}

export default angular.module('services.forecast', [])
  .service('forecast', Forecast)
  .name;

Forecast.$inject = ['$http', '$q'];
