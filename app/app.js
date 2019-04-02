var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/");

     $stateProvider
        .state("search", {
            url: "/",
            templateUrl: "templates/main.html",
            controller: "IndexController",
        })
        .state("results", {
            url:"/results/{zip}",
            templateUrl: "templates/results.html",
            controller: "SearchController",
            resolve: {
              zipcodes: ['$http', function($http) {
                return $http.get('data/zipcodes.json')
                  .then(function(data) { return data.data; });
              }],
              meshes: ['zipcodes', '$http', function(zipcodes, $http) {
                return $http.get('data/meshes.json')
                  .then(function(data) {
                    return Object.keys(data.data).map((meshName) => {
                      let mesh =  data.data[meshName];
                      let coords = zipcodes[mesh.zip];
                      return Object.assign(mesh, {"name": meshName}, {lat: coords.lat, lon: coords.lon});
                    });
                  });
              }],
              results: ['zipcodes', 'meshes', 'distanceService', '$stateParams', function(zipcodes, meshes, distanceService, $stateParams) {
                return meshes.map((mesh) => {
                  return Object.assign(mesh, {distance: distanceService.calcDistance(mesh.lat, mesh.lon, zipcodes[$stateParams.zip].lat, zipcodes[$stateParams.zip].lon)});
                }).sort(function(a, b) {
                  return a.distance - b.distance;
                });
              }]
            },
        })
        .state("list", {
            url:"/list",
            templateUrl: "templates/results.html",
            controller: "SearchController",
            resolve: {
              results: ['$http', function($http) {
                return $http.get('data/meshes.json')
                  .then(function(data) {
                    return Object.keys(data.data).map((meshName) => {
                      let mesh =  data.data[meshName];
                      return Object.assign(mesh, {"name": meshName});
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
            url:"/about",
            templateUrl: "templates/about.html",
        });
});
