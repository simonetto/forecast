import landing from './index';
import angular from 'angular';
import 'angular-mocks/angular-mocks';

describe('Controller: Landing', () => {
  let $controller;

  beforeEach(angular.mock.module(landing));

  beforeEach(angular.mock.inject(_$controller_ => {
    $controller = _$controller_;
  }));

  it('there are two cities', () => {
    const ctrl = $controller('LandingController');

    ctrl.getCities();

    setTimeout(() => {
      expect(ctrl.model.cities.length).toBe(2);
    }, 0);
  });
});
