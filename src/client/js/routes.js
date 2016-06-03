(function () {

  'use strict';

  angular.module('myApp', ['ngRoute', 'btford.socket-io'])
    .config(appConfig)

  appConfig.$inject = ['$routeProvider', '$httpProvider'];


  function appConfig($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/landing.html',
      controller: 'mainController',
      restricted: false,
      preventLoggedIn: false
    }).when('/everything', {
      templateUrl: 'views/everything.html',
      controller: 'indexController',
      restricted: false,
      preventLoggedIn: false
    }).when('/comp', {
      templateUrl: 'views/comp.html',
      controller: 'indexController',
      restricted: false,
      preventLoggedIn: false
    })
    .otherwise({redirectTo: '/'});
  }
  
  

})();