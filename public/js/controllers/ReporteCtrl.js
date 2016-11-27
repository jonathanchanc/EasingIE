angular.module('ReporteCtrl',[])

	.controller('ReporteController', ['$scope','$routeParams','$location','Reportes', function($scope, $routeParams, $location, Reportes) {
		$scope.controlNameSingular = 'Reporte';
		$scope.controlNamePlural = 'Reportes';
		$scope.controllerInstance = 'reportes';

		$scope.label = {};
		$scope.label.search = 'Buscar';
		$scope.label.searchResults = 'Resultados de la búsqueda: ';
		$scope.label.add = 'Nuevo';
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

		$scope.model = { 
						id: 'ids',
						nombre: 'Nombre',
						modulo: 'Módulo',
						descripcion: 'Descripción',
						estado: 'Estado'
					};

		var docDefinition = {
		    content: [
				{
					text: 'Fruits and Calories'
				},
				{
					style: 'demoTable',
					table: {
						widths: ['*', '*', '*'],
						body: [
							[{text: 'Fruit', style: 'header'}, {text: 'Quantity', style: 'header'},
								{text: 'Calories', style: 'header'}
							],
							['Apple', '100 grams', '52'],
							['Bananas', '100 grams', '89'],
							['Guava', '100 grams', '68'],
							['Lemon', '100 grams', '29'],
							['Mangos', '100 grams', '60'],
							['Orange', '100 grams', '47'],
							['Strawberries', '100 grams', '33']
						]
					}
				}
		    ],
			styles: {
				header: {
					bold: true,
					color: '#000',
					fontSize: 11
				},
				demoTable: {
					color: '#666',
					fontSize: 10
				}
		    }
	  	};

		$scope.inicio = function(){
			
		}

		$scope.openPdf = function() {
		    pdfMake.createPdf(docDefinition).open();
	  	};
		 
		$scope.downloadPdf = function() {
		    pdfMake.createPdf(docDefinition).download('Reporte');
		};

		

		$scope.showMessage = function(show,type,message,status,data) {
			$scope.messageShow = show;
			$scope.messageClass = type;
			$scope.messageText = message;
			if(status){
				console.log('Error: ' + status);
	        	console.log(data);
			}
		};

	}]);