angular.module('FichaCtrl',[])

	.controller('FichaController', ['$scope','$routeParams','$location','Fichas','Users','Oficinas','Especialidades','Programas','Proveedores','Clientes','Main', function($scope, $routeParams, $location, Fichas, Users, Oficinas, Especialidades, Programas, Proveedores, Clientes, Main) {
		$scope.controlNameSingular = 'Ficha';
		$scope.controlNamePlural = 'Fichas';
		$scope.controllerInstance = 'fichas';

		$scope.label = {};
		$scope.label.search = 'Buscar';
		$scope.label.searchResults = 'Resultados de la búsqueda: ';
		$scope.label.add = 'Nueva';
		$scope.label.edit = 'Editar';
		$scope.label.createOrEdit = '';
		$scope.label.save = 'Guardar';
		$scope.label.cancel = 'Cancelar';
		$scope.label.data = 'Datos';
		$scope.label.list = 'Lista';
		$scope.label.backToList = 'Click aqui para regresar a la lista';
		$scope.label.noResults = 'No se encontraron resultados';
		$scope.label.errorResults = 'Error al cargar lista';
		$scope.label.invalidDataForm = 'Rellene los datos correctamente';
		$scope.label.noFindRow = 'Registro no encontrado';
		$scope.label.createSuccess = 'Registro insertado con éxito';
		$scope.label.createFailed = 'Error al crear';
		$scope.label.updateSuccess = 'Registro actualizado con éxito';
		$scope.label.updateFailed = 'Error al actualizar';
		$scope.label.paginationShowing = 'Mostrando resultados';
		$scope.label.paginationTo = '-';
		$scope.label.paginationFrom = 'de';
		$scope.label.active = 'Activo';
		$scope.label.inactive = 'Inactivo';
		$scope.label.management = 'Administración';
		$scope.label.yes = 'Si';
		$scope.label.no = 'No';
		$scope.label.agregar = 'Agregar';
		$scope.label.delete = 'Borrar';

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';
		$scope.messageAlertSuccess = 'alert-success';
		$scope.messageAlertInfo = 'alert-info';
		$scope.messageAlertDanger = 'alert-danger';

		$scope.searchData = {};
		$scope.formTemp = {};
		$scope.formData = {estado:'Activo', afiliado:'No', pagado:'No', cliente:{afiliado:'No'}, usuario: { oficina: {} }, programas:[] };

		$scope.instanceList = [];
		$scope.Usuarios = [];
		$scope.Especialidades = [];
		$scope.Programas = [];
		$scope.Proveedores = [];
		$scope.Clientes = [];
		
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		$scope.textPagination = '';

		$scope.modelTemp = {
			especialidad: 'Especialidad',
			programa: 'Programa',
			proveedor: 'Proveedor',
			nombre_programa: 'Programa',
			concepto: 'Concepto',
			precio: 'Precio',
		}

		$scope.model = {
						//Ocultos
						id: 'ID',
						folio: 'Folio',
						fecha_alta: 'Fecha de alta',
						pagado: 'Pagado',
						estado: 'Estado',

						//YA no usados
						afiliado: 'Afiliado',
						precio: 'Precio',
						monto_apoyo_terceros: 'Monto terceros',
						monto_suciqroo: 'Monto suciqroo',
						programa: 'Programa',
						especialidad: 'Especialidad',
						proveedor: 'Proveedor/Doctor',
						cliente: 'Cliente',


						//Usados
						monto_total: 'Monto total',
						comentario: 'Comentario',
						cliente: {
							_id: 'Cliente',
							nombre: 'Nombre',
							apPaterno: 'Apellido Paterno',
							apMaterno: 'Apellido Materno',
							afiliado: 'Afiliado',
							credencial: 'Credencial',
						},
						usuario: {
							_id: 'Usuario',
							nombre: 'Usuario',
							oficia: {
								_id: 'Oficina',
								nombre: 'Oficina',
							}
						},
						programas: {
							_id: 'Programa',
							nombre: 'Nombre programa',
							precio: 'Precio',
							monto_apoyo_terceros: 'Monto terceros',
							monto_suciqroo: 'Monto suciqroo',
							proveedor: 'Proveedor/Doctor',
							especialidad: 'Especialidad/',
							pagado: 'Pagado',
							fecha_pago: 'Fecha pago',
						},						
					};

		$scope.inicio = function(){
			$scope.pagination();
		}

		$scope.pagination = function(search){
			var query = {};
			if(search==1) //if is from "Search" button, then set $scope.currentPage = 1; for pagination of search
				$scope.currentPage = 1;
			else if(search==0) //if is from "List" button, then set $scope.searchData.data = ''; for retur to normla list
				$scope.searchData.data = '';

			//Si $scope.searchData.data no esta vacio, buscamos por ese dato
			if($scope.searchData.data != undefined && $scope.searchData.data != ''){
				$scope.searchData.active = true;
				var data = $scope.searchData.data;
				data = data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	  			query.query = 	{ $or: [
					  				{nombre: { $regex : data, $options:"i" } },
					  				]
					  			};
			} else {
				$scope.searchData.active = false;
				$scope.messageShow = false;
	  			query.query = {};
			}
			
			query.limit = $scope.itemsPerPage;
    		query.page = $scope.currentPage-1;
    		query.sort = {};
			$scope.query(query);
		}


		$scope.query = function(query){
			Fichas.query(query)
				.success(function(data) {
					$scope.instanceList = angular.copy(data.instanceList);
					$scope.totalItems = data.totalItems;
					$scope.calculateTextPagination();
					if($scope.searchData.active){
						$scope.messageShow = true;
						$scope.messageClass = $scope.messageAlertInfo;
						$scope.messageText = $scope.label.searchResults+' "'+$scope.searchData.data+'"... ';
					}
					
				})
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            })
			;
		}


		$scope.calculateTextPagination = function(){
			var strFrom = ((($scope.currentPage - 1) * $scope.itemsPerPage) + 1);
			var strTo = ($scope.currentPage * $scope.itemsPerPage);
			if(strTo > $scope.totalItems || strTo == 0)
				strTo = $scope.totalItems;
			
			$scope.textPagination = 
				$scope.label.paginationShowing+' '+strFrom+' '+
				$scope.label.paginationTo +' '+strTo+' '+
				$scope.label.paginationFrom+' '+$scope.totalItems;
		}
		

		$scope.get = function(){

			//Comentar este bloque de users
			Users.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Usuarios = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });
			
	        Especialidades.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Especialidades = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

			Programas.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Programas = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

	        Proveedores.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Proveedores = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

			Clientes.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Clientes = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

			$scope.label.createOrEdit = $scope.label.add;
			if($routeParams.instanceId != undefined){
				Fichas.findById($routeParams.instanceId)
					.success(function(data) {
						$scope._id = $routeParams.instanceId;
						$scope.formData = angular.copy(data);
						$scope.label.createOrEdit = $scope.label.edit;
					})
					.error(function(data, status) {
						console.log($scope.label.noFindRow);
						$location.path('/'+$scope.controllerInstance);
		            })
					;
			} else {
				Main.me(function(userData) {
					Oficinas.query({ query: { _id: userData.data.oficina } })
						.success(function(data) {
							$scope.Usuarios = angular.copy(userData); //Comentar esta linea tambien
							data = data.instanceList[0];
							$scope.formData.usuario._id = userData.data._id;
							$scope.formData.usuario.nombre = userData.data.nombre_completo;
							$scope.formData.usuario.oficina._id = data._id;
							$scope.formData.usuario.oficina.nombre = data.nombre;
						})
						.error(function(data, status) {
							$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
			            });
		        }, function() {
					console.log('Error: ');
			        console.log(userData);
		        })
		        ;
			}
		}


		$scope.createOrUpdate = function(isValid, _id) {
			$scope.messageShow = false;
			$scope.messageClass = "";
			$scope.messageText = '';

			//Valida formData
			if (isValid) {
				
				if(_id != undefined) {
					Fichas.update(_id,$scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log($scope.label.updateSuccess);
							$location.path('/'+$scope.controllerInstance);
							//COMO ENVIAR ALERTA?							
							//$scope.messageShow = true;
							//$scope.messageClass = $scope.messageAlertSuccess;
							//$scope.messageText = $scope.label.updateSuccess;
						})
						.error(function(data, status) {
							$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.updateFailed, status, data);
			            })
						;
				} else {
					Fichas.create($scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log($scope.label.createSuccess);
							$location.path('/'+$scope.controllerInstance);
							//COMO ENVIAR ALERTA?							
							//$scope.messageShow = true;
							//$scope.messageClass = $scope.messageAlertSuccess;
							//$scope.messageText = $scope.label.createSuccess;
						})
						.error(function(data, status) {
							$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.createFailed, status, data);
			            })
						;
				}
			} else {
				$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.invalidDataForm);
			}
		};

		$scope.delete = function(_id) {
			//Fichas.delete(_id);
		};

		$scope.showMessage = function(show,type,message,status,data) {
			$scope.messageShow = show;
			$scope.messageClass = type;
			$scope.messageText = message;
			if(status){
				console.log('Error: ' + status);
	        	console.log(data);	
			}
			angular.element('#alertMessage').focus();
		};

		//Funciones para llenado del formulario
		$scope.getDataCliente = function(){
			if($scope.formData.cliente._id){
				//Buscar el programa seleccionado dentro de la lista de programas para obtener datos
		        var cliente = _.find($scope.Clientes, function(cliente){ return cliente._id ==$scope.formData.cliente._id; });
		        $scope.formData.cliente.nombre = cliente.nombre;
		        $scope.formData.cliente.apPaterno = cliente.apPaterno;
		        $scope.formData.cliente.apMaterno = cliente.apMaterno;
		        $scope.formData.cliente.afiliado = cliente.afiliado;
		        $scope.formData.cliente.credencial = cliente.credencial;
		    }
		    $scope.getDataPrograma();
		};


		$scope.getAllProgramas = function(reset){ //TAL VEZ QUITE ESTA FUNCION
			Especialidades.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Especialidades = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

			Programas.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Programas = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

	        Proveedores.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Proveedores = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

           	if(reset==1){
           		$scope.formTemp.especialidad = '';
           		$scope.formTemp.programa = '';
           		$scope.formTemp.proveedor = '';
           		$scope.formTemp.nombre_programa = '';
           		$scope.formTemp.precio = '';
           		$scope.formTemp.monto_apoyo_terceros = '';
           	}
		};

		$scope.getProgramasByEspecialidad = function(){
			Programas.query({ query: { especialidad: $scope.formTemp.especialidad, estado: 'Activo' } })
				.success(function(data) { 
					$scope.Programas = angular.copy(data.instanceList); 
				})
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });

	        Proveedores.query({ query: { especialidades: $scope.formTemp.especialidad, estado: 'Activo' } })
				.success(function(data) { 
					$scope.Proveedores = angular.copy(data.instanceList); 
				})
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });
		};

		$scope.getDataPrograma = function(){

			if($scope.formTemp.programa){
				//Actualizar especialidad
				Programas.query({ query: { _id: $scope.formTemp.programa, estado: 'Activo' } })
					.success(function(data) { 
						$scope.formTemp.especialidad = angular.copy(data.instanceList[0].especialidad); 
						//Buscar Proveedores
						Proveedores.query({ query: { especialidades: $scope.formTemp.especialidad , estado: 'Activo' } })
							.success(function(data) { 
								$scope.Proveedores = angular.copy(data.instanceList); 
							})
							.error(function(data, status) {
								$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
				            });
					})
					.error(function(data, status) {
						$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
		            });   

				//Buscar el programa seleccionado dentro de la lista de programas para obtener datos
		        var programa = _.find($scope.Programas, function(programa){ return programa._id ==$scope.formTemp.programa; });
		        $scope.formTemp.nombre_programa = programa.nombre;
		        $scope.formTemp.precio = ($scope.formData.cliente.afiliado=='Si')? programa.precio_suciqroo : programa.precio_publico;
		        $scope.formTemp.monto_apoyo_terceros = programa.monto_apoyo_terceros;
		        //$scope.formTemp.monto_suciqroo = programa.monto_suciqroo;
		    }
		};

		$scope.addPrograma = function(){

			if($scope.formData.cliente.nombre && $scope.formTemp.programa){
				//Buscar el programa seleccionado dentro de la lista de programas para obtener datos
				var data = {
					_id: $scope.formTemp.programa,
					nombre: $scope.formTemp.nombre_programa,
					precio: $scope.formTemp.precio,
					monto_apoyo_terceros: $scope.formTemp.monto_apoyo_terceros,
					monto_suciqroo: ($scope.formTemp.precio - $scope.formTemp.monto_apoyo_terceros),
					//pagado: 'No',
					//fecha_pago: null,
					especialidad: {},
					proveedor: {},
				};

				if($scope.formTemp.especialidad){
					var especialidad = _.find($scope.Especialidades, function(especialidad){ return especialidad._id ==$scope.formTemp.especialidad; });
					data.especialidad._id = especialidad._id;
					data.especialidad.nombre = especialidad.nombre;
				}

				if($scope.formTemp.proveedor){
					var proveedor = _.find($scope.Proveedores, function(proveedor){ return proveedor._id ==$scope.formTemp.proveedor; });
					data.proveedor._id = proveedor._id;
					data.proveedor.nombre = proveedor.nombre_completo;
				}

		        $scope.formData.programas.push(data);
		        $scope.getTotalPrograma();

		        //Delete form data
		        delete $scope.formTemp.especialidad;
           		delete $scope.formTemp.programa;
           		delete $scope.formTemp.proveedor;
		        delete $scope.formTemp.nombre_programa;
		        delete $scope.formTemp.precio;
		        delete $scope.formTemp.monto_apoyo_terceros;
		    }
		    else {
		    	$scope.showMessage(true, $scope.messageAlertInfo, 'Selecione un Cliente y un Programa ', status, data);
		    }
		};

		$scope.removePrograma = function(data){
			if(data){
				$scope.formData.programas = _.without($scope.formData.programas,data);
		    }
		    $scope.getTotalPrograma();
		};

		$scope.getTotalPrograma = function(){
			var total = 0;
			if($scope.formData.programas){
				angular.forEach($scope.formData.programas, function(programa) {
					total += programa.precio;
				});
			}
			$scope.formData.monto_total = total;
		}

	}]);