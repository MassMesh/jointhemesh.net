angular.module('app')

.controller('IndexController', ['$scope', '$state', function IndexController($scope, $state) {
  $scope.submit = function() {
    $state.transitionTo('results', {zip: $scope.zip});
  };
}])

.controller('SearchController', ['$scope', 'results', function SearchController($scope, results) {
  $scope.results = results;
}]);
