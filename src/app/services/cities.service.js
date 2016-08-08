import angular from 'angular';

class Cities {

  constructor($q) {
    this.$q = $q;
  }

  getAvailableCities() {
    const defered = this.$q.defer();
    const response = [
      {
        id: 3435910,
        name: "Buenos Aires",
        image: "./../../../../resources/buenos-aires.jpg"
      },
      {
        id: 7778677,
        name: "Dublin",
        image: "./../../../../resources/dublin.jpg"
      }
    ];

    defered.resolve(response);

    return defered.promise;
  }
}

export default angular.module('services.cities', [])
  .service('cities', Cities)
  .name;

Cities.$inject = ['$q'];
