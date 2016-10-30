angular.module('OficinaCtrl', ['ngMessages','ui.bootstrap'])
	
	.controller('OficinaController', ['$scope','$routeParams','$location','Oficinas', function($scope, $routeParams, $location, Oficinas) {
		$scope.controlNameSingular = 'Oficina';
		$scope.controlNamePlural = 'Oficinas';
		$scope.controllerInstance = 'oficinas';

		$scope.searchData = {};
		$scope.formData = {estado:'Activo'};
		
		$scope.loading = true;
		$scope.instanceList = [];

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';

		//console.log($routeParams.instanceId);
		
		// GET =====================================================================
		// Get all rows and show them, use the service to get all the rows
		$scope.inicio = function(){
			Oficinas.get()
				.success(function(data) {
					$scope.instanceList = angular.copy(data);
					$scope.loading = false;
				})
				.error(function(data, status) {
					console.log("Error en la busqueda de "+$scope.controlNamePlural);
	            })
			;
		}

		
		$scope.search = function(){
			if($scope.searchData.data != undefined && $scope.searchData.data != ''){
				Oficinas.search($scope.searchData)
					.success(function(data) {
						$scope.instanceList = {};
						$scope.instanceList = angular.copy(data);
					})
					.error(function(data, status) {
						console.log("Error en la busqueda de "+$scope.controlNamePlural);
						$location.path('/'+$scope.controllerInstance);
		            })
					;
			}
		}
		

		$scope.get = function(){
			//console.log($routeParams);
			if($routeParams.instanceId != undefined){
				Oficinas.findById($routeParams.instanceId)
					.success(function(data) {
						$scope._id = $routeParams.instanceId;
						$scope.formData = angular.copy(data);
						//console.log(data);
					})
					.error(function(data, status) {
						console.log("No se encontró "+$scope.controlNameSingular);
						$location.path('/'+$scope.controllerInstance);
		            })
					;
			}
			//console.log($scope._id);
		}


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrUpdate = function(isValid, _id) {
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
							$location.path('/'+$scope.controllerInstance);
						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = "alert-danger";
							$scope.messageText = "Error al actualizar";
					        console.log('Error: ' + status);
					        console.log(data);
			            })
						;
				} else {
					//CREATE
					// call the create function from our service (returns a promise object)
					Oficinas.create($scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log("Registro insertado con exito");
							$location.path('/'+$scope.controllerInstance);
						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = "alert-danger";
							$scope.messageText = "Error al crear";
					        console.log('Error: ' + status);
					        console.log(data);
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
		$scope.delete = function(_id) {
			$scope.loading = true;

			Oficinas.delete(_id);
		};

	}]);