angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

        //Cliente
        .when('/clientes', {
            templateUrl: 'views/cliente/list.html',
            controller: 'ClienteController'
        })

        .when('/clientes/create', {
            templateUrl: 'views/cliente/form.html',
            controller: 'ClienteController'
        })

        .when('/clientes/update/:clienteId', {
            templateUrl: 'views/cliente/form.html',
            controller: 'ClienteController'
        })

         //Doctor
        .when('/doctores', {
            templateUrl: 'views/doctor/list.html',
            controller: 'DoctorController'
        })

        .when('/doctores/create', {
            templateUrl: 'views/doctor/form.html',
            controller: 'DoctorController'
        })

        .when('/doctores/update/:instanceId', {
            templateUrl: 'views/doctor/form.html',
            controller: 'DoctorController'
        })


        // ---------------------------------REVISAR
        //Expedientes
		.when('/expedientes', {
			templateUrl: 'views/expediente.html',
			controller: 'ExpedienteController'
		})

		.when('/expedientes/create', {
			templateUrl: 'views/expediente.create.html',
			controller: 'ExpedienteController'
		})

		.when('/expedientes/update/:expedienteId', {
			templateUrl: 'views/expediente.create.html',
			controller: 'ExpedienteController'
		})
        // -----------------------------------

        //Oficina
        .when('/oficinas', {
            templateUrl: 'views/oficina/list.html',
            controller: 'OficinaController'
        })

        .when('/oficinas/create', {
            templateUrl: 'views/oficina/form.html',
            controller: 'OficinaController'
        })

        .when('/oficinas/update/:instanceId', {
            templateUrl: 'views/oficina/form.html',
            controller: 'OficinaController'
        })

        //Pivilegios
        .when('/privilegios', {
            templateUrl: 'views/privilegio/list.html',
            controller: 'PrivilegioController'
        })

        .when('/privilegios/create', {
            templateUrl: 'views/privilegio/form.html',
            controller: 'PrivilegioController'
        })

        .when('/privilegios/update/:instanceId', {
            templateUrl: 'views/privilegio/form.html',
            controller: 'PrivilegioController'
        })

         //Rol
        .when('/roles', {
            templateUrl: 'views/rol/list.html',
            controller: 'RolController'
        })

        .when('/roles/create', {
            templateUrl: 'views/rol/form.html',
            controller: 'RolController'
        })

        .when('/roles/update/:instanceId', {
            templateUrl: 'views/rol/form.html',
            controller: 'RolController'
        })

        //User
        .when('/users', {
            templateUrl: 'views/user/list.html',
            controller: 'UserController'
        })

        .when('/users/create', {
            templateUrl: 'views/user/form.html',
            controller: 'UserController'
        })

        .when('/users/update/:instanceId', {
            templateUrl: 'views/user/form.html',
            controller: 'UserController'
        })

		
		////pendiente de cambio de  nombre -----------------------

        .when('/geeks', {
            templateUrl: 'views/geek.html',
            controller: 'GeekController'    
        })

		.when('/signin', {
            templateUrl: 'views/main/signin.html',
            controller: 'MainController'
        })
        // .when('/signup', {
        //     templateUrl: 'views/main/signup.html',
        //     controller: 'MainController'
        // })
        .when('/me', {
            templateUrl: 'views/main/detail.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        })
		//-----------------------
		;

	$locationProvider.html5Mode(true);

	//Interceptor - adds the token to the header
	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);


}]);