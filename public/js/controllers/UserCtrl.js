angular.module('UserCtrl', ['ngMessages','ui.bootstrap'/*,'btford.socket-io'*/])
	//NUEVO
	/*
	.factory('Socket', ['socketFactory',
	    function(socketFactory) {
	    	return socketFactory();
	    }
	])
	.factory('_',['$window', function($window){
            return $window._;
        }])
	*/
	//NUEVO

	// inject the User service factory into our controller
	.controller('UserController', ['$rootScope', '$scope', '$location', 'User', function($rootScope, $scope, $location, User) {

        User.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })

	}]);