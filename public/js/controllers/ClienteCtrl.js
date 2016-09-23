angular.module('ClienteCtrl', ['ngMessages','ui.bootstrap'/*,'btford.socket-io'*/])
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

	// inject the Cliente service factory into our controller
	.controller('ClienteController', ['$scope','$routeParams','$location','$http','Clientes','$filter', /*'Socket',*/ function($scope, $routeParams, $location, $http, Clientes, $filter /*, Socket*/) {
		$scope.controlNameSingular = 'Cliente';
		$scope.controlNamePlural = 'Clientes';
		$scope.controllerInstance = 'clientes';

		$scope.searchData = {};
		$scope.formData = {estado:'Activo'};
		
		$scope.loading = true;
		$scope.clientes = [];

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';

		//console.log($routeParams.clienteId);
		
		// GET =====================================================================
		// when landing on the page, get all rows and show them
		// use the service to get all the rows

		$scope.inicio = function(){
			Clientes.get()
				.success(function(data) {
					$scope.clientes = angular.copy(data);
					$scope.loading = false;
					console.log(data);
				})
				.error(function(data, status) {
					console.log("Error en la busqueda de "+$scope.controlNamePlural);
	            })
			;
		}

		
		$scope.searchCliente = function(){
			if($scope.searchData.data != undefined && $scope.searchData.data != ''){
				Clientes.search($scope.searchData)
					.success(function(data) {
						$scope.clientes = {};
						$scope.clientes = angular.copy(data);
					})
					.error(function(data, status) {
						console.log("Error en la busqueda de "+$scope.controlNamePlural);
						$location.path('/'+$scope.controllerInstance);
		            })
					;
			}
		}
		

		$scope.getCliente = function(){
			//console.log($routeParams);
			if($routeParams.clienteId != undefined){
				Clientes.findById($routeParams.clienteId)
					.success(function(data) {
						$scope._id = $routeParams.clienteId;
						$scope.formData = angular.copy(data);
						$scope.formData.fecha_nacimiento = new Date($scope.formData.fecha_nacimiento);
						//console.log(data);
					})
					.error(function(data, status) {
						console.log("No se encontró cliente");
						$location.path('/'+$scope.controllerInstance);
		            })
					;
			}
			console.log($scope._id);
		}


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrUpdateCliente = function(isValid, _id) {
			//console.log($scope.formData);
			$scope.messageShow = false;
			$scope.messageClass = "";
			$scope.messageText = '';
			$scope.formData.estado = "Activo";

			// Valida formData, si el #Dispositivo y el Nombre estan asiganaods, crea el registro
			if (isValid) {

				$scope.loading = true;

				if(_id != undefined) {
					//UPDATE
					Clientes.update(_id,$scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log("Registro actualizado con exito");
							$location.path('/'+$scope.controllerInstance);
						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = "alert-danger";
							$scope.messageText = "Error al actualizar";
					        $scope.message = data || "Request failed";
							console.log("Datos invalidos: "+status+" - "+$scope.message);
			            })
						;
				} else {
					//CREATE
					// call the create function from our service (returns a promise object)
					Clientes.create($scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log("Registro insertado con exito");
							$location.path('/'+$scope.controllerInstance);
						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = "alert-danger";
							$scope.messageText = "Error al crear";
					        $scope.message = data || "Request failed";
							console.log("Datos invalidos: "+status+" - "+$scope.message);
			            })
						;
				}
			} else {
				$scope.loading = false;
				//$scope.status = 0;
				$scope.messageShow = true;
				$scope.messageClass = "alert-danger";
		        $scope.messageText = "Rellene los datos correctamente";
			}
		};

		// DELETE ==================================================================
		// Delete Method
		$scope.deleteCliente = function(_id,id) {
			$scope.loading = true;

			Clientes.delete(_id);
		};

		// Update ==================================================================
		// Update Method
		$scope.updateCliente = function(_id,id) {
			//$scope.loading = true; //COMENTAR AL GUSTO
			//Valida formData, si el #Dispositivo y el Nombre estan asiganaods, crea el registro
			if (_id != undefined && _id != '') {
				//Validamos los campos del formulario
				//$scope.formData.nombre = nombre; //Asignamos el disposito para que no se cambie de pin
				$scope.formData.nombre = ($scope.formData.nombre!=undefined)?$scope.formData.nombre:'';
				$scope.formData.apPaterno = ($scope.formData.apPaterno!=undefined)?$scope.formData.apPaterno:'';
				$scope.formData.apaMaterno = ($scope.formData.apaMaterno!=undefined)?$scope.formData.apaMaterno:'';
				$scope.formData.edad = ($scope.formData.edad!=undefined)?$scope.formData.edad:'';
				$scope.formData.estado_civil = ($scope.formData.estado_civil!=undefined)?$scope.formData.estado_civil:'';

				//Actualizamos
            	Clientes.update(_id,$scope.formData);
			}

		};



	}]);



	