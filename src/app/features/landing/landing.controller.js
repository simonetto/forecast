export default class LandingController {
  constructor(forecastService, citiesService) {
    this.citiesService = citiesService;
    this.forecastService = forecastService;

    this.model = {
      cities: [],
      dates: [],
      forecast: [],
      forecastByDate: [],
      selectedCity: null,
      selectedDate: null
    };

    this.getCities();
  }

  getCities() {
    this.citiesService.getAvailableCities().then(response => {
      this.model.selectedCity = response.length > 0 ? response[0] : null;
      this.model.cities = response;
      this.onCityChange();
    });
  }

  onCityChange() {
    this.forecastService.getForecast(this.model.selectedCity.id).then(response => {
      const keys = Object.keys(response);
      this.model.forecast = response;
      this.model.selectedDate = keys.length > 0 ? keys[0] : null;
      this.model.dates = keys;
      this.onDateChange();
    });
  }

  onDateChange() {
    this.model.forecastByDate = this.model.forecast[this.model.selectedDate];
  }
}

LandingController.$inject = ['forecast', 'cities'];
