(function () {

  'use strict';

  angular.module('myApp')
    .controller('uploadController', uploadController);

  uploadController.$inject = ['$rootScope', '$scope','$window', 'mainService','SocketService', 'videoService'];



//checks user is in DB and sets token for login
  function uploadController($rootScope, $scope, $window, mainService, SocketService, videoService) {
   $scope.smile = mainService.setStyle();
   $scope.smile = mainService.getGraphingLines();
  
   SocketService.forward('status', $scope);
   $scope.$on('socket:status', function (ev, data) {
       mainService.graphArrays(data);
       $scope.smile = mainService.getGraphingLines();
    });
   $scope.playVid2 = mainService.localFileVideoPlayer()

   $scope.reload = function(){
   	console.log('worked')
   	videoService.uploadVidPlayer()
   }

   $scope.$on('$routeChangeSuccess', function(event, current) {
		videoService.uploadVidPlayer()
	     console.log('route changed');
   });
  }


})();