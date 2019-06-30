angular.module('app')

  .controller('IndexController', ['$scope', '$state', 'zipcodes', 'geolocationService', function IndexController($scope, $state, zipcodes, geolocationService) {
    $scope.loading = false;

    $scope.submit = function() {
      let coords = zipcodes[$scope.zip];
      $state.transitionTo('results', {
        lat: coords.lat,
        lon: coords.lon
      });
    };

    $scope.geolocate = function() {
      $scope.loading = true;
      geolocationService.getCurrentPosition().then((position) => {
          $state.transitionTo('results', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        })
        .finally(() => {
          $scope.loading = false;
        });
    }
  }])

  .controller('ResultsController', ['$scope', 'results', function ResultsController($scope, results) {
    $scope.results = results;
  }]);
