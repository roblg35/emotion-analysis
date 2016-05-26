(function () {

  'use strict';

  angular.module('myApp')
    .controller('indexController', indexController);

  indexController.$inject = ['$rootScope', '$scope', '$location', 'mainService'];


//checks user is in DB and sets token for login
  function indexController($rootScope, $scope, $location, mainService) {
   $scope.smile = mainService.setStyle();
   $scope.smile = mainService.getGraphingSmile();
   
   mainService.getData()
   .then(function(data){
   	console.log(data)
   })

  }

})();