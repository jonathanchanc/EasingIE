angular.module('MainCtrl', [])

.factory('_',['$window', function($window){
            return $window._;
        }])

.controller('MainController', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', 'Roles', 'Privilegios', function($rootScope, $scope, $location, $localStorage, Main, Roles, Privilegios) {
	$scope.tagline = 'Sistema para administración de ingresos y egresos';
    $rootScope._ = _;
	$scope.token = $localStorage.token;
    //$localStorage.privilegios = [];


    $scope.getExpanded = function(){
        //Al inicial el controlador obtenemos el boton (togle data)
        $scope.buttonExpanded = angular.element( document.querySelector( '#btnExpanded' ) );
        //Obtenemos sus atributos
        $scope.classExpanded = $scope.buttonExpanded.attr('class');
        //Si contiene el atributo collapsed, significa que esta contraido, no esta desplegado y actualizamos variable
        if( _.contains($scope.classExpanded.split(' '),'collapsed') )
            $scope.hideAfterClick = false
        else
            $scope.hideAfterClick = true
    };

    
    $scope.getPrivilegios = function(){
        if($scope.token){
            Main.getPrivilegios().then(function(data){
                $scope.privilegios = $rootScope.privilegios;
                $scope.modulos = $rootScope.modulos;
                //console.log($scope.privilegios);
                //console.log($scope.modulos);
            });
        }
        //Leemos el estado del nav al iniciar la vista y despues de obtener los privilegios
        $scope.getExpanded();
            
        /*
            Main.getPrivilegios()
                .success(function(data) {
                    console.log(data);
                            //Copiamos el objeto data a ambos arrays - Data es una instancia del modelo Users
                            var privilegios = angular.copy(data);
                            var modulos = angular.copy(data);
                            //Extraemos todos los datos a partir de una propiedad de Users
                            privilegios = _.pluck(privilegios, 'nombre');
                            modulos = _.pluck(modulos, 'modulo');
                            //Asiganmos al $scope el array sin valores repetidos (unique)
                            $scope.privilegios = _.uniq(privilegios);
                            $scope.modulos = _.uniq(modulos);
                            console.log($scope.privilegios);
                            $localStorage.privilegios = $scope.privilegios;
                })
                .error(function(data, status) {
                    console.log('Error: ' + status);
                    console.log(data);
                })
            ;
            */

        /*
        if($scope.token)
        Main.me(function(res) {
            Roles.findById(res.data.rol)
                .success(function(data) {
                    $scope.rol = angular.copy(data);

                    Privilegios.query({ query: { _id: {$in: data.privilegios}, estado: 'Activo' } })
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
                            $localStorage.privilegios = $scope.privilegios
                        });

                });


        }, function() {
            $rootScope.error = 'Failed to fetch details';
        });
        */
                
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
        console.log($rootScope.privilegios);
        Main.me(
            //).success(
            function(res) {
            $scope.myDetails = res;
        },
        //).error(
            function() {
            $rootScope.error = 'Failed to fetch details';
            console.log('Failed to fetch details');
        });
    };

    $scope.logout = function() {
        Main.logout(function() {
            window.location = "/"
        }, function() {
            alert("Failed to logout!");
        });
    };
        

}]);