(function () {

  'use strict';

  angular.module('myApp')
    .config(appConfig)

  appConfig.$inject = ['$routeProvider', '$httpProvider'];


  function appConfig($routeProvider, $httpProvider) {
    $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'mainController',
      restricted: false,
      preventLoggedIn: false
    }).when('/', {
      templateUrl: 'views/main.html',
      controller: 'indexController',
      restricted: false,
      preventLoggedIn: false
    })

  }
  
  

})();