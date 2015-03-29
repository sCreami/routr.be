var app = angular.module('routr', []);

    app.config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });
    
    app.controller('SignalsCtrl', function($scope, $http) {
        $scope.signals = [];

        $scope.loadSignals = function() {
            var httpRequest = $http({
                method: 'GET',
                url: '/ajax'
            }).success(function(data, status) {
                $scope.signals = data;
            });
        };

        window.onload = $scope.loadSignals;
    });