var badVoltageApp = angular.module("badVoltageApp", []).config(
    function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://audio.lugradio.org/badvoltage/**']);
            });


badVoltageApp.controller("itemListCtrl" , function($scope,$http) {    
    $scope.episodes=[];
    $http.get('/feed/').success(function(data) {
        $scope.episodes=data;
        });

    });
