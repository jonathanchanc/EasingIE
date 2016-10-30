angular.module('PrivilegioCtrl',[])

	.controller('PrivilegioController', ['$scope','$routeParams','$location','Privilegios', function($scope, $routeParams, $location, Privilegios) {
		$scope.controlNameSingular = 'Privilegio';
		$scope.controlNamePlural = 'Privilegios';
		$scope.controllerInstance = 'privilegios';

		$scope.labels = {};
		$scope.labels.search = 'Buscar';
		$scope.labels.searchResults = 'Resultados de la búsqueda: ';
		$scope.labels.add = 'Nuevo';
		$scope.labels.edit = 'Editar';
		$scope.labels.save = 'Guardar';
		$scope.labels.cancel = 'Cancelar';
		$scope.labels.list = 'Lista';
		$scope.labels.backToList = 'Click aqui para regresar a la lista';
		$scope.labels.noResults = 'No se encontraron resultados';
		$scope.labels.errorResults = 'Error al cargar lista';
		$scope.labels.invalidDataForm = 'Rellene los datos correctamente';
		$scope.labels.noFindRow = 'Registro no encontrado';
		$scope.labels.createSuccess = 'Registro insertado con éxito';
		$scope.labels.createFailed = 'Error al crear';
		$scope.labels.updateSuccess = 'Registro actualizado con éxito';
		$scope.labels.updateFailed = 'Error al actualizar';
		$scope.labels.paginationShowing = 'Mostrando resultados';
		$scope.labels.paginationTo = '-';
		$scope.labels.paginationFrom = 'de';

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';
		$scope.messageAlertSuccess = 'alert-success';
		$scope.messageAlertInfo = 'alert-info';
		$scope.messageAlertDanger = 'alert-danger';

		$scope.searchData = {};
		$scope.formData = {estado:'Activo'};

		$scope.instanceList = [];
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		$scope.textPagination = '';

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
					  				{descripcion: { $regex : data, $options:"i" } },
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
			Privilegios.query(query)
				.success(function(data) {
					$scope.instanceList = angular.copy(data.instanceList);
					$scope.totalItems = data.totalItems;
					$scope.calculateTextPagination();
					if($scope.searchData.active){
						$scope.messageShow = true;
						$scope.messageClass = $scope.messageAlertInfo;
						$scope.messageText = $scope.labels.searchResults+' "'+$scope.searchData.data+'"... ';
					}
					
				})
				.error(function(data, status) {
					$scope.messageShow = true;
					$scope.messageClass = $scope.messageAlertDanger;
					$scope.messageText = $scope.labels.errorResults;
			        console.log('Error: ' + status);
			        console.log(data);
	            })
			;
		}


		$scope.calculateTextPagination = function(){
			var strFrom = ((($scope.currentPage - 1) * $scope.itemsPerPage) + 1);
			var strTo = ($scope.currentPage * $scope.itemsPerPage);
			if(strTo > $scope.totalItems || strTo == 0)
				strTo = $scope.totalItems;
			
			$scope.textPagination = 
				$scope.labels.paginationShowing+' '+strFrom+' '+
				$scope.labels.paginationTo +' '+strTo+' '+
				$scope.labels.paginationFrom+' '+$scope.totalItems;
		}
		

		$scope.get = function(){
			if($routeParams.instanceId != undefined){
				Privilegios.findById($routeParams.instanceId)
					.success(function(data) {
						$scope._id = $routeParams.instanceId;
						$scope.formData = angular.copy(data);
					})
					.error(function(data, status) {
						console.log($scope.labels.noFindRow);
						$location.path('/'+$scope.controllerInstance);
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
					Privilegios.update(_id,$scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log($scope.labels.updateSuccess);
							$location.path('/'+$scope.controllerInstance);

							//COMO ENVIAR ALERTA?							
							$scope.messageShow = true;
							$scope.messageClass = $scope.messageAlertSuccess;
							$scope.messageText = $scope.labels.updateSuccess;

						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = $scope.messageAlertDanger;
							$scope.messageText = $scope.labels.updateFailed;
					        console.log('Error: ' + status);
					        console.log(data);
			            })
						;
				} else {
					Privilegios.create($scope.formData)
						.success(function(data) {
							$scope.formData = {};
							console.log($scope.labels.createSuccess);
							$location.path('/'+$scope.controllerInstance);

							//COMO ENVIAR ALERTA?							
							$scope.messageShow = true;
							$scope.messageClass = $scope.messageAlertSuccess;
							$scope.messageText = $scope.labels.createSuccess;

						})
						.error(function(data, status) {
							$scope.messageShow = true;
							$scope.messageClass = $scope.messageAlertDanger;
							$scope.messageText = $scope.labels.createFailed;
					        console.log('Error: ' + status);
					        console.log(data);
			            })
						;
				}
			} else {
				$scope.messageShow = true;
				$scope.messageClass = $scope.messageAlertDanger;
		        $scope.messageText = $scope.labels.invalidDataForm;
			}
		};

		$scope.delete = function(_id) {
			//Privilegios.delete(_id);
		};

	}]);