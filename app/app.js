var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when("", "/");

  $stateProvider
    .state("search", {
      url: "/",
      templateUrl: "templates/main.html",
      controller: "IndexController",
      resolve: {
        zipcodes: ['$http', function($http) {
          return $http.get('data/zipcodes.json')
            .then(function(data) {
              return data.data;
            });
        }]
      }
    })
    .state("results", {
      url: "/results/{lat},{lon}",
      templateUrl: "templates/results.html",
      controller: "ResultsController",
      resolve: {
        zipcodes: ['$http', function($http) {
          return $http.get('data/zipcodes.json')
            .then(function(data) {
              return data.data;
            });
        }],
        meshes: ['zipcodes', '$http', function(zipcodes, $http) {
          return $http.get('data/meshes.json')
            .then(function(data) {
              return Object.keys(data.data).map((meshName) => {
                let mesh = data.data[meshName];
                let locations = mesh.locations.map((location) => {
                  let lat = location.lat;
                  let lon = location.lon;
                  if (!lat || !lon && location.zip) {
                    lat = zipcodes[location.zip].lat;
                    lon = zipcodes[location.zip].lon;
                  }
                  return Object.assign(location, {
                    "lat": lat,
                    "lon": lon
                  });
                });
                return Object.assign(mesh, {
                  "name": meshName,
                  "locations": locations
                });
              });
            });
        }],
        results: ['meshes', 'distanceService', '$stateParams', function(meshes, distanceService, $stateParams) {
          return meshes.map((mesh) => {
            let locations = mesh.locations.map((location) => {
              let distance = distanceService.calcDistance(location.lat, location.lon, $stateParams.lat, $stateParams.lon);
              return Object.assign(location, {
                "distance": distance
              });
            }).sort(function(a, b) {
              return a.distance - b.distance;
            });
            let nearest = locations.length ? locations[0] : {};
            return Object.assign(mesh, {
              "locations": locations,
              "nearest": nearest
            });
          }).sort(function(a, b) {
            return a.nearest.distance - b.nearest.distance;
          });
        }]
      },
    })
    .state("list", {
      url: "/list",
      templateUrl: "templates/results.html",
      controller: "ResultsController",
      resolve: {
        results: ['$http', function($http) {
          return $http.get('data/meshes.json')
            .then(function(data) {
              return Object.keys(data.data).map((meshName) => {
                let mesh = data.data[meshName];
                return Object.assign(mesh, {
                  "name": meshName
                });
              }).sort(function(a, b) {
                if (a.name.toString() < b.name.toString()) return -1;
                if (a.name.toString() > b.name.toString()) return 1;
                return 0;
              });
            });
        }],
      },
    })
    .state("about", {
      url: "/about",
      templateUrl: "templates/about.html",
    });
});
