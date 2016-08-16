angular.module('PrivilegioCtrl', ['ngMessages','ui.bootstrap'/*,'btford.socket-io'*/])
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

	// inject the Privilegio service factory into our controller
	.controller('PrivilegioController', ['$scope','$routeParams','$location','$http','Privilegios','$filter', /*'Socket',*/ function($scope, $routeParams, $location, $http, Privilegios, $filter /*, Socket*/) {
		//$scope.formData = {};
		$scope.searchData = {};
		//$scope.estado_civiles = ['Casado(a)','Divorciado(a)','Soltero(a)','Union Libre','Viudo(a)'];
		//$scope.escolaridades = ['Ninguna','Primaria','Secundaria','Preparatoria','Licenciatura','Posgrado'];
		//$scope.tipo_relaciones_sexuales = ['Heterosexual','Homosexual','Bisexual'];
		//$scope.buena_regular_mala = ['Buena','Regular','Mala'];
		//$scope.si_no = ['Si','No'];
		//$scope.formData = {sexo:'Hombre'};
		
		$scope.loading = true;
		$scope.privilegios = [];


		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';


		//USADOS POR DATEPICKER
		//$scope.popup1 = { opened: false };
		//$scope.popup2 = { opened: false };
		//$scope.popup3 = { opened: false };
		//$scope.dateOptions = {
	    	//dateDisabled: false,
		    //formatYear: 'yyyy',
		    //maxDate: new Date(2016, 5, 22),
		    //minDate: new Date(),
		    //startingDay: 1
	  	//};
	  	
	  	/*$scope.open = function(popup) {
	  		switch(popup){
	  			case 1:
	  				$scope.popup1.opened = true;
	  				break;
  				case 2:
  					$scope.popup2.opened = true;
	  				break;
  				case 3:
  					$scope.popup3.opened = true;
	  				break;
	  		}
		};*/



		console.log($routeParams.privilegioId);
		
		// GET =====================================================================
		// when landing on the page, get all devices and show them
		// use the service to get all the devices

		$scope.inicio = function(){
			Privilegios.get()
				.success(function(data) {
					$scope.privilegios = angular.copy(data);
					$scope.loading = false;
					console.log(data);
				})
			;
		}

		
		$scope.searchPrivilegio = function(){
			if($scope.searchData.data != undefined && $scope.searchData.data != ''){
				Privilegios.search($scope.searchData)
					.success(function(data) {
						$scope.privilegios = {};
						$scope.privilegios = angular.copy(data);
					})
					.error(function(data, status) {
						console.log("Error en la busqueda de privilegios");
						$location.path('/privilegios');
		            })
					;
			}
		}
		
		
		$scope.getPrivilegio = function(){
			//console.log($routeParams);
			if($routeParams.privilegioId != undefined){
				Privilegios.findById($routeParams.privilegioId)
					.success(function(data) {
						$scope._id = $routeParams.privilegioId;
						$scope.formData = angular.copy(data);
						$scope.formData.fecha_nacimiento = new Date($scope.formData.fecha_nacimiento);
						//console.log(data);
					})
					.error(function(data, status) {
						console.log("No se encontró privilegio");
						$location.path('/privilegios');
		            })
					;
			}
			console.log($scope._id);
		}

		
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrUpdatePrivilegio = function(isValid, _id) {
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
					Privilegios.update(_id,$scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log("Registro actualizado con exito");
							$location.path('/privilegios');
						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = "alert-danger";
					        $scope.message = data || "Request failed";
							console.log("Datos invalidos: "+status+" - "+$scope.message);
			            })
						;
				} else {
					//CREATE
					// call the create function from our service (returns a promise object)
					Privilegios.create($scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log("Registro insertado con exito");
							$location.path('/privilegios');
						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = "alert-danger";
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
				console.log("Datos invalidos: "+$scope.message);
			}
		};
		

		// DELETE ==================================================================
		// Delete Method
		$scope.deletePrivilegio = function(_id,id) {
			$scope.loading = true;

			Privilegios.delete(_id)
				/*
				// if successful creation, call our get function to get all the new devices
				.success(function(data) {
					$scope.loading = false;
					$scope.devices = data; // assign our new list of devices
					Socket.emit("led:deleted"); //Envio la funcion al socket
					Socket.emit('led:off',{pin: id}); //Al eliminar mando a apagar el dispositivo
				})
				*/
				;
		};

		// Update ==================================================================
		// Update Method
		$scope.updatePrivilegio = function(_id,id) {
			//$scope.loading = true; //COMENTAR AL GUSTO
			//Valida formData, si el #Dispositivo y el Nombre estan asiganaods, crea el registro
			if (_id != undefined && _id != '') {
				//Validamos los campos del formulario
				//$scope.formData.nombre = nombre; //Asignamos el disposito para que no se cambie de pin
				$scope.formData.descripcion = ($scope.formData.descripcion!=undefined)?$scope.formData.descripcion:'';
				$scope.formData.estado = ($scope.formData.estado!=undefined)?$scope.formData.estado:'';
				//Actualizamos
          		Privilegios.update(_id,$scope.formData)
            		/*
					// if successful creation, call our get function to get all the new devices
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.devices = data; // assign our new list of devices
						Socket.emit("led:updated"); //Envio la funcion al socket
					})
					*/
					;
			}

		};



	}]);



	