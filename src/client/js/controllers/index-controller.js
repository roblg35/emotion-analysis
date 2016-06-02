(function () {

  'use strict';

  angular.module('myApp')
    .controller('indexController', indexController);

  indexController.$inject = ['$rootScope', '$scope', '$location', 'mainService','SocketService'];



//checks user is in DB and sets token for login
  function indexController($rootScope, $scope, $location, mainService, SocketService) {
   $scope.smile = mainService.setStyle();
   $scope.smile = mainService.getGraphingLines();
  
   SocketService.forward('status', $scope);
   $scope.$on('socket:status', function (ev, data) {
       mainService.graphArrays(data);
       $scope.smile = mainService.getGraphingLines();
    });
   // console.log(mainService.getVideoData())
   mainService.background()
       $scope.playVid = mainService.localFileVideoPlayer();
  }

})();