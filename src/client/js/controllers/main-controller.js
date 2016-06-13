(function() {

    'use strict';

    angular.module('myApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$rootScope', '$scope', '$window', 'adService', 'SocketService', 'videoService'];



    //checks user is in DB and sets token for login
    function mainController($rootScope, $scope, $window, adService, SocketService, videoService) {
        $scope.smile = adService.setStyle();
        $scope.smile = adService.getGraphingLines();

        SocketService.forward('status', $scope);
        $scope.$on('socket:status', function(ev, data) {
            adService.graphArrays(data);
            $scope.smile = adService.getGraphingLines();
        });

        $scope.reload = function() {
            videoService.uploadVidPlayer()
        }

        $scope.$on('$routeChangeSuccess', function(event, current) {
            videoService.uploadVidPlayer()
        });
    }


})();