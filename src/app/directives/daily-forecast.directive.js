import angular from 'angular';
import template from './daily-forecast.html';

function dailyForecast() {
  return {
    restrict: 'E',
    scope: {
      forecast: '='
    },
    template
  };
}

export default angular.module('directives.dailyForecast', [])
  .directive('dailyForecast', dailyForecast)
  .name;
