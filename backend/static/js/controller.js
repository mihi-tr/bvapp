var badVoltageApp = angular.module("badVoltageApp", []).config(
    function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://audio.lugradio.org/badvoltage/**']);
            });

badVoltageApp.directive("scroll", function($window) {
    return function(scope,element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (window.pageYOffset == 0) {
                scope.load(); };
            scope.$apply();
            });
        }
    });

badVoltageApp.controller("itemListCtrl" , function($scope,$http,$window) {    
    $scope.episodes=[];
    $scope.load=function() {
        $http.get('/feed/').success(function(data) {
            $scope.episodes=data;
            });
            };
    $scope.load();
    });
