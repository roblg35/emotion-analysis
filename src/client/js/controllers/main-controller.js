(function () {

  'use strict';

  angular.module('myApp')
    .controller('mainController', mainController);

  mainController.$inject = ['$rootScope', '$scope', '$location', 'mainService'];


//checks user is in DB and sets token for login
  function mainController($rootScope, $scope, $location, mainService) {
   $scope.playVid = mainService.localFileVideoPlayer()
  }

})();