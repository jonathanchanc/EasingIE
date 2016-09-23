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

        //Oficina
        .when('/oficinas', {
            templateUrl: 'views/oficina/list.html',
            controller: 'OficinaController'
        })

        .when('/oficinas/create', {
            templateUrl: 'views/oficina/form.html',
            controller: 'OficinaController'
        })

        .when('/oficinas/update/:oficinaId', {
            templateUrl: 'views/oficina/form.html',
            controller: 'OficinaController'
        })

        //Pivilegios
        .when('/privilegios', {
            templateUrl: 'views/admin/privilegio/privilegio.html',
            controller: 'PrivilegioController'
        })

        .when('/privilegios/create', {
            templateUrl: 'views/admin/privilegio/privilegio.create.html',
            controller: 'PrivilegioController'
        })

        .when('/privilegios/update/:privilegioId', {
            templateUrl: 'views/admin/privilegio/privilegio.create.html',
            controller: 'PrivilegioController'
        })

		
		////pendiente de cambio de  nombre -----------------------

        .when('/geeks', {
            templateUrl: 'views/geek.html',
            controller: 'GeekController'    
        })

		.when('/signin', {
            templateUrl: 'views/user/signin.html',
            controller: 'MainController'
        })
        .when('/signup', {
            templateUrl: 'views/user/signup.html',
            controller: 'MainController'
        })
        .when('/me', {
            templateUrl: 'views/user/form.html',
            controller: 'UserController'
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