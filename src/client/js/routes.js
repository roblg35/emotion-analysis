(function () {

  'use strict';

  angular.module('myApp')
    .config(appConfig)

  appConfig.$inject = ['$routeProvider', '$httpProvider'];


  function appConfig($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController',
      restricted: false,
      preventLoggedIn: false
    })
  }
  
  

})();