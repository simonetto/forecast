import forecast from './forecast.service';
import angular from 'angular';
import 'angular-mocks/angular-mocks';

describe('Service: Forecast', () => {
  let $service;

  beforeEach(angular.mock.module(forecast));

  beforeEach(angular.mock.inject(_forecast_ => {
    $service = _forecast_;
  }));

  it('response is empty', () => {
    const srv = $service;

    const mock = {
      data: {
        list: []
      }
    };

    const response = srv.processForcast(mock);

    expect(response).toEqual({});
  });

  it('response is empty', () => {
    const srv = $service;

    const mock = {
      data: {
        list: [{
          dt: 1470679200,
          main: {
            temp: 289.53
          },
          dt_txt: '2016-08-08 18:00:00'
        }, {
          dt: 1470690000,
          main: {
            temp: 286.82
          },
          dt_txt: '2016-09-08 21:00:00'
        }]
      }
    };

    const response = srv.processForcast(mock);

    expect(response).toEqual({
      '2016-08-08': [{
        item: {
          dt: 1470679200,
          main: {
            temp: 289.53
          },
          dt_txt: '2016-08-08 18:00:00'
        },
        time: '18:00:00'
      }],
      '2016-09-08': [
        {
          item: {
            dt: 1470690000,
            main: {
              temp: 286.82
            },
            dt_txt: '2016-09-08 21:00:00'
          },
          time: '21:00:00'
        }]
    });
  });
});
