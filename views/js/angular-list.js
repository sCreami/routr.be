var app = angular.module('routr', []);

    app.config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });
    
    app.controller('SignalsCtrl', function($scope, $http, $timeout) {
        $scope.signals = [];

        $scope.loadSignals = function() {
            var httpRequest = $http({
                method: 'GET',
                url: '/ajax'
            }).success(function(data, status) {
                $scope.signals = data;

                $timeout(function(){
                    $('.rating').each(function(){
                        if(parseInt($(this).text()) < 1) $(this).removeClass('label-info').addClass('label-warning')
                    })
                })
            });
        };

        $scope.codeAddress = function(address, markerOnly) {
        	codeAddress(address, markerOnly);
        };

        $scope.rate = function(id, up, that) {
        	rate(id, up, that);
    	};

        window.onpageshow = $scope.loadSignals;
    });
