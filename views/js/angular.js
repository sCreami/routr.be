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

        $scope.codeAddress = function(address, markerOnly) {
        	codeAddress(address, markerOnly);
        };

        $scope.rate = function(id,up,that) {
        	rate(id, up, that);
    	};

        setTimeout($scope.loadSignals, 1);
    });