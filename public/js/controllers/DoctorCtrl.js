angular.module('DoctorCtrl', ['ngMessages','ui.bootstrap'/*,'btford.socket-io'*/])
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

	// inject the Doctor service factory into our controller
	.controller('DoctorController', ['$scope','$routeParams','$location','$http','Doctores','$filter', /*'Socket',*/ function($scope, $routeParams, $location, $http, Doctores, $filter /*, Socket*/) {
		$scope.controlNameSingular = 'Doctor';
		$scope.controlNamePlural = 'Doctores';
		$scope.controllerInstance = 'doctores';

		$scope.searchData = {};
		$scope.formData = {estado:'Activo'};
		
		$scope.loading = true;
		$scope.doctores = [];

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';

		//console.log($routeParams.doctorId);
		
		// GET =====================================================================
		// Get all rows and show them, use the service to get all the rows
		$scope.inicio = function(){
			Doctores.get()
				.success(function(data) {
					//DESCOMENTAR AL IMPLEMENTAR DB 
					$scope.doctores = angular.copy(data);
					$scope.loading = false;
					//DESCOMENTAR AL IMPLEMENTAR DB 
					console.log(data);
				})
				.error(function(data, status) {
					console.log("Error en la busqueda de "+$scope.controlNamePlural);
	            })
			;
		}

		
		$scope.search = function(){
			if($scope.searchData.data != undefined && $scope.searchData.data != ''){
				Doctores.search($scope.searchData)
					.success(function(data) {
						$scope.doctores = {};
						$scope.doctores = angular.copy(data);
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
			if($routeParams.doctorId != undefined){
				Doctores.findById($routeParams.doctorId)
					.success(function(data) {
						$scope._id = $routeParams.doctorId;
						$scope.formData = angular.copy(data);
						//console.log(data);
					})
					.error(function(data, status) {
						console.log("No se encontró doctor");
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
					Doctores.update(_id,$scope.formData)
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
					Doctores.create($scope.formData)
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
		$scope.delete = function(_id) {
			$scope.loading = true;

			Doctores.delete(_id);
		};

	}]);