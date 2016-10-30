angular.module('UserCtrl', ['ngMessages','ui.bootstrap', 'localytics.directives'])
	
	.controller('UserController', ['$scope','$routeParams','$location','Users', 'Oficinas', 'Roles', function($scope, $routeParams, $location, Users, Oficinas, Roles) {
		$scope.controlNameSingular = 'User';
		$scope.controlNamePlural = 'Users';
		$scope.controllerInstance = 'users';

		$scope.searchData = {};
		$scope.formData = {estado:'Activo'};
		
		$scope.loading = true;
		$scope.instanceList = [];
		$scope.Oficinas = [];
		$scope.Roles = [];

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';

		//console.log($routeParams.instanceId);
		
		// GET =====================================================================
		// Get all rows and show them, use the service to get all the rows
		$scope.inicio = function(){
			Users.get()
				.success(function(data) {
					//DESCOMENTAR AL IMPLEMENTAR DB 
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
				Users.search($scope.searchData)
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
			Oficinas.query({estado: 'Activo'})
				.success(function(data) { $scope.Oficinas = angular.copy(data); })
				.error(function(data, status) { console.log("Error al obtener Oficinas"); })
			;

			Roles.query({estado: 'Activo'})
				.success(function(data) { $scope.Roles = angular.copy(data); })
				.error(function(data, status) { console.log("Error al obtener Roles"); })
			;


			if($routeParams.instanceId != undefined){
				Users.findById($routeParams.instanceId)
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
			console.log($scope._id);
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
					Users.update(_id,$scope.formData)
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
					Users.create($scope.formData)
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

			Users.delete(_id);
		};

	}]);