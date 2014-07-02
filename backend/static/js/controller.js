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

var request = window.navigator.mozApps.checkInstalled("http://badvoltageapp.appspot.com/manifest.webapp");
request.onsuccess = function(e) {
    if (!request.result) {
        document.getElementById("install").style.display="block";
        }
    }
document.getElementById("install").addEventListener('click',function() {
    window.navigator.mozApps.checkInstalled("http://badvoltageapp.appspot.com/manifest.webapp");
    },false);
