(function () {

  'use strict';

  angular.module('myApp')
    .controller('indexController', indexController);

  indexController.$inject = ['$rootScope', '$scope', '$location', 'mainService', 'SocketService'];


//checks user is in DB and sets token for login
  function indexController($rootScope, $scope, $location, mainService, SocketService) {
   $scope.smile = mainService.setStyle();
   $scope.smile = mainService.getGraphingSmile();
   
   SocketService.forward('status', $scope);
    $scope.$on('socket:status', function (ev, data) {
      console.log(ev, data);
    });

    mainService.ping().then(function(data){
    	console.log(data)
    })
  }

})();