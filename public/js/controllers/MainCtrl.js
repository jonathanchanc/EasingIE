angular.module('MainCtrl', [])


//.controller('UserController', function($scope) {
.controller('MainController', ['$rootScope', '$scope', '$location', '$localStorage', 'User', function($rootScope, $scope, $location, $localStorage, User) {
	$scope.tagline = 'Expedientes, expedientes y expedientes';	

	$scope.token = $localStorage.token;

	$scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        User.signin(formData, function(res) {
            if (res.type == false) {
                alert(res.data)    
            } else {
                $localStorage.token = res.data.token;
                window.location = "/";    
            }
        }, function() {
            $rootScope.error = 'Failed to signin';
        })
    };

    $scope.signup = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        User.save(formData, function(res) {
            if (res.type == false) {
                alert(res.data)
            } else {
                $localStorage.token = res.data.token;
                window.location = "/"    
            }
        }, function() {
            $rootScope.error = 'Failed to signup';
        })
    };

    $scope.me = function() {
        User.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
    };

    $scope.logout = function() {
        User.logout(function() {
            window.location = "/"
        }, function() {
            alert("Failed to logout!");
        });
    };
        

}]);