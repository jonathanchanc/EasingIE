angular.module('OficinaCtrl', ['ngMessages','ui.bootstrap'/*,'btford.socket-io'*/])
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

	// inject the Oficina service factory into our controller
	.controller('OficinaController', ['$scope','$routeParams','$location','$http','Oficinas','$filter', /*'Socket',*/ function($scope, $routeParams, $location, $http, Oficinas, $filter /*, Socket*/) {
		$scope.controlNameSingular = 'Oficina';
		$scope.controlNamePlural = 'Oficinas';
		$scope.controllerInstance = 'oficinas';

		$scope.searchData = {};
		$scope.formData = {estado:'Activo'};
		
		$scope.loading = true;
		$scope.oficinas = [];

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';

		//console.log($routeParams.oficinaId);
		
		// GET =====================================================================
		// when landing on the page, get all rows and show them
		// use the service to get all the rows

		$scope.inicio = function(){
			Oficinas.get()
				.success(function(data) {
					//$scope.oficinas = angular.copy(data);
					$scope.loading = false;
					//console.log(data);
				})
				.error(function(data, status) {
					console.log("Error en la busqueda de oficinas");
	            })
			;
		}

		
		$scope.searchOficina = function(){
			if($scope.searchData.data != undefined && $scope.searchData.data != ''){
				Oficinas.search($scope.searchData)
					.success(function(data) {
						$scope.oficinas = {};
						$scope.oficinas = angular.copy(data);
					})
					.error(function(data, status) {
						console.log("Error en la busqueda de oficinas");
						$location.path('/oficinas');
		            })
					;
			}
		}
		

		$scope.getOficina = function(){
			//console.log($routeParams);
			if($routeParams.oficinaId != undefined){
				Oficinas.findById($routeParams.oficinaId)
					.success(function(data) {
						$scope._id = $routeParams.oficinaId;
						$scope.formData = angular.copy(data);
						//console.log(data);
					})
					.error(function(data, status) {
						console.log("No se encontró oficina");
						$location.path('/oficinas');
		            })
					;
			}
			console.log($scope._id);
		}


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrUpdateOficina = function(isValid, _id) {
			//console.log($scope.formData);
			$scope.messageShow = false;
			$scope.messageClass = "";
			$scope.messageText = '';
			//$scope.formData.estado = "Activo";

			// Valida formData, si el #Instancia y el Nombre estan asiganaods, crea el registro
			if (isValid) {

				$scope.loading = true;

				if(_id != undefined) {
					//UPDATE
					Oficinas.update(_id,$scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log("Registro actualizado con exito");
							$location.path('/oficinas');
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
					Oficinas.create($scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log("Registro insertado con exito");
							$location.path('/oficinas');
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
		$scope.deleteOficina = function(_id,id) {
			$scope.loading = true;

			Oficinas.delete(_id);
		};

		// Update ==================================================================
		// Update Method
		$scope.updateOficina = function(_id,id) {
			//$scope.loading = true; //COMENTAR AL GUSTO
			//Valida formData, si el #Dispositivo y el Nombre estan asiganaods, crea el registro
			if (_id != undefined && _id != '') {
				//Validamos los campos del formulario
				$scope.formData.nombre = ($scope.formData.nombre!=undefined)?$scope.formData.nombre:'';
				$scope.formData.direccion = ($scope.formData.direccion!=undefined)?$scope.formData.direccion:'';
				$scope.formData.telefono = ($scope.formData.telefono!=undefined)?$scope.formData.telefono:'';
				$scope.formData.estado = ($scope.formData.estado!=undefined)?$scope.formData.estado:'';

				//Actualizamos
            	Oficinas.update(_id,$scope.formData);
			}

		};


	}]);



	