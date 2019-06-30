angular.module('app')

.factory('distanceService', function distanceServiceFactory() {
  return {
    calcDistance: function(lat1, lon1, lat2, lon2) {
      var R = 3959; // Radius of the earth in mi
      var dLat = (lat2-lat1) * (Math.PI/180);
      var dLon = (lon2-lon1) * (Math.PI/180);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    }
  }
})

.factory('geolocationService', ['$q', '$window', function geolocationServiceFactory($q, $window) {
  return {
    getCurrentPosition: function() {
      var deferred = $q.defer();

      if (!$window.navigator.geolocation) {
        deferred.reject('Geolocation not supported.');
      } else {
        $window.navigator.geolocation.getCurrentPosition(
          function (position) {
            deferred.resolve(position);
          },
          function (err) {
            deferred.reject(err);
          }
        );
      }

      return deferred.promise;
    }
  };
}]);
