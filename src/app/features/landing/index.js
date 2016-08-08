import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './landing.routes';
import LandingController from './landing.controller';

import forecast from '../../services/forecast.service';
import cities from '../../services/cities.service';

import dailyForecast from '../../directives/daily-forecast.directive';

export default angular.module('app.home', [uirouter, forecast, cities, dailyForecast])
  .config(routing)
  .controller('LandingController', LandingController)
  .name;
