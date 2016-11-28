angular.module('ReporteCtrl',[])

	.controller('ReporteController', ['$scope','$routeParams','$location','Reportes', 'Fichas', 'Especialidades', 'Programas', 'Proveedores', 'Clientes', function($scope, $routeParams, $location, Reportes, Fichas, Especialidades, Programas, Proveedores, Clientes) {
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
		$scope.formTemp = { filtros: [] };
		$scope.formData = {estado:'Activo', reporte: { filtros:[] } };

		$scope.instanceList = [];
		$scope.dataReporte = [];
		$scope.Especialidades = [];
		$scope.Programas = [];
		$scope.Proveedores = [];
		$scope.Clientes = [];
		
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		$scope.textPagination = '';

		$scope.modelTemp = {
			cliente: 'Cliente',
			especialidad: 'Especialidad',
			programa: 'Programa',
			proveedor: 'Proveedor',
		}

		$scope.model = { 
						reporte: 'Reporte',
						nombre: 'Nombre',
						descripcion: 'Descripción',
						estado: 'Estado',
						consultar: 'Consultar',
						descargar: 'Descargar',
					};

		$scope.Reportes = [
			{ _id: 1, nombre: 'Servicios Pagados', table: 'Fichas', 
				filtros: ['estado', 'fecha_ini', 'fecha_fin', 'cliente' ], query: {}, columns:[] },
			{ _id: 2, nombre: 'Proveedores Pagados', table: 'Facturas',
			 	filtros: ['estado', 'fecha_ini', 'fecha_fin', 'proveedor' ], query: {}, columns:[] },
			{ _id: 3, nombre: 'Balance General', table: 'Fichas', 
				filtros: ['estado'], query: {}, columns:[] },
			{ _id: 4, nombre: 'Fichas por Usuario', table: 'Fichas', filtros: [], query: {}, columns:[] },
			{ _id: 5, nombre: 'Pago de Servicios', table: 'Fichas', filtros: [], query: {}, columns:[] },
			{ _id: 6, nombre: 'Historico', table: 'Historico', filtros: [], query: {}, columns:[] },
		];

		$scope.inicio = function(){
			console.log('Modulo de reportes');
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
		};

		$scope.openPdf = function() {
		    pdfMake.createPdf(dd).open();
	  	};
		 
		$scope.downloadPdf = function() {
		    pdfMake.createPdf(dd).download('Reporte');
		};

		$scope.getDataReporte = function() {
			if($scope.formData.reporte._id){
				//Buscar el programa seleccionado dentro de la lista de programas para obtener datos
		        var reporte = _.find($scope.Reportes, function(reporte){ return reporte._id ==$scope.formData.reporte._id; });
		        console.log(reporte);
		        $scope.formData.reporte.nombre = reporte.nombre;
		        $scope.formData.reporte.table = reporte.table;
		        $scope.formData.reporte.filtros = reporte.filtros;
		        $scope.formData.reporte.query = reporte.query;
		        $scope.formData.reporte.columns = reporte.columns;
		        $scope.showHideFiltros();
		    }
		};

		$scope.showHideFiltros = function(){
			if(_.contains($scope.formData.reporte.filtros,'cliente')){
		        	$scope.showThis1 = true;
		        	console.log("contiene");
        	} else {
	        	$scope.showThis1 = false;
	        	console.log("no contiene");
        	}
		};

		$scope.createPdf = function() {
			console.log($scope.formData.reporte);
			switch($scope.formData.reporte){
				case 'Servicios Pagados':
					console.log('sswidj');
					Fichas.query({ query: { estado: 'Activo' }, select: 'folio anio monto_total' })
						.success(function(data) { 
							$scope.dataReporte = angular.copy(data.instanceList); 

							//$scope.docDefinition.content = {};
							$scope.docDefinition.content['0'].text = $scope.formData.reporte;
							var table = {
									style: 'demoTable',
									table: {
										widths: ['*', '*', '*'],
										body: [
											[{text: 'Folio', style: 'header'}, {text: 'Año', style: 'header'},{text: 'Monto', style: 'header'}],
										]
									}
								};
							console.log($scope.dataReporte);
							var fichas = [];
							_.each($scope.dataReporte, function(ficha){
								fichas.push([ficha.folio_ficha, ficha.anio, ficha.monto_total]);
							});
							table.table.body.push(fichas);
							$scope.docDefinition.content['1'].table.body.push(table);
							console.log($scope.docDefinition);
						    //pdfMake.createPdf($scope.docDefinition).open();
						    pdfMake.createPdf($scope.docDefinition).download('Reporte');


						})
						.error(function(data, status) {
							$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
			            });
			            break;
				case 'Proveedores Pagados':
				case 'Balance General':
				case 'Fichas por Usuario':
				case 'Pago de Servicios':
				case 'Historico':
			}


			
	  	};



	  	$scope.createPdf2 = function() {
			console.log($scope.formData.reporte);
			switch($scope.formData.reporte){
				case 'Servicios Pagados':
					Fichas.query({ query: { estado: 'Activo' }, select: 'folio anio monto_total' })
						.success(function(data) { 
							$scope.dataReporte = angular.copy(data.instanceList);
							columns = ['Folio', 'Año', 'Monto'];
							var externalData = [];
							_.each($scope.dataReporte, function(ficha){
								externalData.push({ 
													Folio: ficha.folio_ficha, 
													Año: ficha.anio,
													Monto: ficha.monto_total,
												});
							});
							externalDataRetrievedFromServer = externalData;

						    dd = {
							    content: [
							        { text: 'Dynamic parts', style: 'header' },
							        table(externalDataRetrievedFromServer, columns)
							    ]
							}

						    $scope.openPdf();
						})
						.error(function(data, status) {
							$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
			            });
			            break;
				case 'Proveedores Pagados':
				case 'Balance General':
				case 'Fichas por Usuario':
				case 'Pago de Servicios':
				case 'Historico':
			}


			
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




		//////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////
		var columns = ['Folio', 'Año', 'Monto'];
		var externalDataRetrievedFromServer = [
		    { name: 'Bartek', age: 34 },
		    { name: 'John', age: 27 },
		    { name: 'Elizabeth', age: 30 },
		];

		function buildTableBody(data, columns) {
		    var body = [];

		    body.push(columns);

		    data.forEach(function(row) {
		        var dataRow = [];

		        columns.forEach(function(column) {
		            dataRow.push(row[column].toString());
		        })

		        body.push(dataRow);
		    });

		    return body;
		}

		function table(data, columns) {
		    return {
		        table: {
		            headerRows: 1,
		            body: buildTableBody(data, columns)
		        }
		    };
		}

		var dd = {
		    content: [
		        { text: 'Dynamic parts', style: 'header' },
		        table(externalDataRetrievedFromServer, ['name', 'age'])
		    ]
		}

		/*
		$scope.docDefinition = {
		    content: [
				{
					text: 'Fruits and Calories'
				},
				{
					style: 'demoTable',
					table: {
						widths: ['*', '*', '*'],
						body: [
							[{text: 'Fruit', style: 'header'}, {text: 'Quantity', style: 'header'},{text: 'Calories', style: 'header'}],
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
	  	*/

	}]);