angular.module('MainCtrl', [])

.factory('_',['$window', function($window){
            return $window._;
        }])

.controller('MainController', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', 'Roles', 'Privilegios', function($rootScope, $scope, $location, $localStorage, Main, Roles, Privilegios) {
	$scope.tagline = 'Sistema para administración de ingresos y egresos';
    //$rootScope.baseUrl = "http://ades-suciqroo.rhcloud.com";
    //$rootScope.baseUrl = "http://10.10.35.44:3000";
    //$rootScope.baseUrl = "http://192.168.1.132:3000";
    //$rootScope.baseUrl = "http://localhost:3000";
    $rootScope._ = _;
	$scope.token = $localStorage.token;
    
    $scope.getPrivilegios = function(){
        if($scope.token)
        Main.me(function(res) {
            Roles.findById(res.data.rol)
                .success(function(data) {
                    $scope.rol = angular.copy(data);

                    Privilegios.query({ query: { _id: {$in: data.privilegios} } })
                        .success(function(data) {
                            //Copiamos el objeto data a ambos arrays - Data es una instancia del modelo Users
                            var privilegios = angular.copy(data.instanceList);
                            var modulos = angular.copy(data.instanceList);
                            //Extraemos todos los datos a partir de una propiedad de Users
                            privilegios = _.pluck(privilegios, 'nombre');
                            modulos = _.pluck(modulos, 'modulo');
                            //Asiganmos al $scope el array sin valores repetidos (unique)
                            $scope.privilegios = _.uniq(privilegios);
                            $scope.modulos = _.uniq(modulos);
                            console.log($scope.privilegios);
                        });

                });


        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
                
    }


    
	$scope.signin = function() {
        var formData = {
            usuario: $scope.usuario,
            password: $scope.password
        }

        Main.signin(formData, function(res) {
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

    // $scope.signup = function() {
    //     var formData = {
    //         usuario: $scope.usuario,
    //         password: $scope.password
    //     }

    //     Main.save(formData, function(res) {
    //         if (res.type == false) {
    //             alert(res.data)
    //         } else {
    //             $localStorage.token = res.data.token;
    //             window.location = "/"    
    //         }
    //     }, function() {
    //         $rootScope.error = 'Failed to signup';
    //     })
    // };

    $scope.me = function() {
        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
    };

    $scope.logout = function() {
        Main.logout(function() {
            window.location = "/"
        }, function() {
            alert("Failed to logout!");
        });
    };
        

}]);