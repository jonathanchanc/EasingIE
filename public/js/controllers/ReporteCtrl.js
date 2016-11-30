angular.module('ReporteCtrl',[])

	.controller('ReporteController', ['$rootScope','$scope','$routeParams','$location','Reportes', 'Fichas', 'Especialidades', 'Programas', 'Proveedores', 'Clientes', 'Users', function($rootScope, $scope, $routeParams, $location, Reportes, Fichas, Especialidades, Programas, Proveedores, Clientes, Users) {
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
		$scope.label.yes = 'Si';
		$scope.label.no = 'No';

		$scope.messageShow = false;
		$scope.messageClass = "";
		$scope.messageText = '';
		$scope.messageAlertSuccess = 'alert-success';
		$scope.messageAlertInfo = 'alert-info';
		$scope.messageAlertDanger = 'alert-danger';

		$scope.searchData = {};
		$scope.filtros = {};
		$scope.formTemp = { filtros: [], estado:'Activo', pagado:'Si' };
		$scope.formData = { reporte: { filtros:[] } };

		$scope.instanceList = [];
		$scope.dataReporte = [];
		$scope.Especialidades = [];
		$scope.Programas = [];
		$scope.Proveedores = [];
		$scope.Clientes = [];
		$scope.Usuarios = [];
		
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		$scope.textPagination = '';

		//USADOS POR DATEPICKER
		$scope.popup1 = { opened: false };
		$scope.popup2 = { opened: false };
		$scope.dateOptions = {
	    	//dateDisabled: false,
		    //formatYear: 'yyyy',
		    //maxDate: new Date(2016, 5, 22),
		    //minDate: new Date(),
		    //startingDay: 1
	  	};
	  	
	  	$scope.open = function(popup) {
	  		switch(popup){
	  			case 1:
	  				$scope.popup1.opened = true;
	  				break;
  				case 2:
  					$scope.popup2.opened = true;
	  				break;
	  		}
		};

		$scope.modelTemp = {
			cliente: 'Cliente',
			especialidad: 'Especialidad',
			programa: 'Programa',
			proveedor: 'Proveedor',
			usuario: 'Usuario',
			fecha_ini: 'Fecha Inicio',
			fecha_fin: 'Fecha Final',
			estado: 'Estado',
			pagado: 'Pagado',
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
			{ 
				_id: 1, nombre: 'Servicios Pagados', table: 'Fichas', 
				filtros: ["fecha_ini", "fecha_fin", "cliente", "estado", "pagado"],
				query: {}, 
				select:{'folio':1, 'anio':1, 'monto_total':1},
				columns:['folio_ficha', 'anio', 'monto_total'],
				head:['Folio', 'Año', 'Monto'],
				widths: ['*','*','*']
			},
			{ _id: 2, nombre: 'Proveedores Pagados', table: 'Facturas',
			 	filtros: ["fecha_ini", "fecha_fin", "proveedor", "estado", "pagado"], query: {}, columns:[] },
			{ _id: 3, nombre: 'Pogramas Vendidos', table: 'Fichas', 
				filtros: ["fecha_ini", "fecha_fin", "programa", "estado", "pagado"], query: {}, columns:[] },
			{ _id: 4, nombre: 'Fichas por Usuario', table: 'Fichas', 
				filtros: ["fecha_ini", "fecha_fin", "usuario", "estado", "pagado"], query: {}, columns:[] },
			//{ _id: 5, nombre: 'Pago de Servicios', table: 'Fichas',
			//	filtros: ["estado", "fecha_ini", "fecha_fin", "programa" ], query: {}, columns:[] },
			//{ _id: 6, nombre: 'Historico', table: 'Historico',
			//	filtros: ["estado", "fecha_ini", "fecha_fin", "historico" ], query: {}, columns:[] },
			{ _id: 7, nombre: 'Reimpresion de ficha', table: 'Fichas', 
				filtros: ["fecha_ini", "fecha_fin", "estado", "pagado"], query: {}, columns:[] },
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

	        Users.query({ query: { estado: 'Activo' } })
				.success(function(data) { $scope.Usuarios = angular.copy(data.instanceList); })
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });
		};

		

		$scope.getDataReporte = function() {
			if($scope.formData.reporte._id){
				//Buscar el programa seleccionado dentro de la lista de programas para obtener datos
		        var reporte = _.find($scope.Reportes, function(reporte){ return reporte._id ==$scope.formData.reporte._id; });
		        console.log(reporte);
		        $scope.formData.reporte = reporte;
		        /*$scope.formData.reporte.table = reporte.table;
		        $scope.formData.reporte.filtros = reporte.filtros;
		        $scope.formData.reporte.query = reporte.query;
		        $scope.formData.reporte.select = reporte.select;
		        $scope.formData.reporte.head = reporte.head;
		        $scope.formData.reporte.columns = reporte.columns;
		        */
		        $scope.showHideFiltros();
		    }
		};

		$scope.showHideFiltros = function(){
			$scope.filtros = {};
			_.each($scope.formData.reporte.filtros, function(filtro){
				$scope.filtros[filtro] = true;
			});
			/*
			$scope.filtros.usuario = (_.contains($scope.formData.reporte.filtros,'usuario')) ? true : false;
			$scope.filtros.cliente = (_.contains($scope.formData.reporte.filtros,'cliente')) ? true : false;
			$scope.filtros.programa = (_.contains($scope.formData.reporte.filtros,'programa')) ? true : false;
			$scope.filtros.proveedor = (_.contains($scope.formData.reporte.filtros,'proveedor')) ? true : false;
			$scope.filtros.especialidad = (_.contains($scope.formData.reporte.filtros,'especialidad')) ? true : false;
			$scope.filtros.fecha_ini = (_.contains($scope.formData.reporte.filtros,'fecha_ini')) ? true : false;
			$scope.filtros.fecha_fin = (_.contains($scope.formData.reporte.filtros,'fecha_fin')) ? true : false;
			$scope.filtros.estado = (_.contains($scope.formData.reporte.filtros,'estado')) ? true : false;
			$scope.filtros.pagado = (_.contains($scope.formData.reporte.filtros,'pagado')) ? true : false;
			*/
		};

		$scope.getPdf = function(descargar) {
			var arrQuery = {};
			var and = [];
			_.each($scope.formData.reporte.filtros, function(filtro){
				if($scope.formTemp[filtro.toString()] != undefined){
					var whereFiled = {};
					whereFiled[filtro.toString()] = $scope.formTemp[filtro.toString()];
					and.push(whereFiled);
				}
			});
			arrQuery.query = { $and: and };
			arrQuery.select =  $scope.formData.reporte.select;
			$scope.name = $scope.formData.reporte.nombre;
			$scope.head = $scope.formData.reporte.head;
			$scope.widths = $scope.formData.reporte.widths;
			$scope.columns =  $scope.formData.reporte.columns;

			//Vendria siendo esto pero por cada filtro
			//arrQuery.query = {
			//				$and: [
			//					{ 'estado': formTemp.estado },
			//					{ 'programa': formTemp.programa }
			//				]
			//			};

			var Service;
			switch($scope.formData.reporte){
				case 'Servicios Pagados':
					Service = Fichas;
		            break;
				case 'Proveedores Pagados':
				case 'Balance General':
				case 'Fichas por Usuario':
				case 'Pago de Servicios':
				case 'Historico':
			}

			Fichas.query(arrQuery)
				.success(function(data) { 
					var externalData = [];
					_.each(data.instanceList, function(instance){
						var objectData = {};
						_.each($scope.formData.reporte.columns, function(column){
							objectData[column.toString()] = instance[column.toString()];
						});
						externalData.push(objectData);
					});
					$scope.externalDataRetrievedFromServer = externalData;
				    $scope.openPdf(descargar);
				})
				.error(function(data, status) {
					$scope.showMessage(true, $scope.messageAlertDanger, $scope.label.errorResults, status, data);
	            });
	  	};


	  	$scope.createPdf2 = function() {
			console.log($scope.formData.reporte);
			switch($scope.formData.reporte._id){
				case 1:
					Fichas.query({ query: { estado: 'Activo' }, select: 'folio anio monto_total' })
						.success(function(data) { 
							$scope.dataReporte = angular.copy(data.instanceList);
							$scope.columns = ['Folio', 'Año', 'Monto'];
							var externalData = [];
							_.each($scope.dataReporte, function(ficha){
								externalData.push({ 
													Folio: ficha.folio_ficha, 
													Año: ficha.anio,
													Monto: ficha.monto_total,
												});
							});
							$scope.externalDataRetrievedFromServer = externalData;

						    dd = {
							    content: [
							        { text: 'Dynamic parts', style: 'header' },
							        table($scope.head, $scope.columns, $scope.externalDataRetrievedFromServer)
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
		/*
		var head = ['DD', 'ASD', 'Monto'];
		var columns = ['Folio', 'Año', 'Monto'];
		var externalDataRetrievedFromServer = [
		    { name: 'Bartek', age: 34 },
		    { name: 'John', age: 27 },
		    { name: 'Elizabeth', age: 30 },
		];
		*/
		
		$scope.name = 'Reporte';
		$scope.head = ['Nombre', 'Edad'];
		$scope.columns = ['name', 'age'];
		$scope.widths = ['*', '*'];
		$scope.externalDataRetrievedFromServer = [
		    { name: 'Bartek', age: 34 },
		    { name: 'John', age: 27 },
		    { name: 'Elizabeth', age: 30 },
		];
		$scope.dd = {
		    content: [
		        { text: 'Dynamic parts', style: 'header' },
		        table($scope.head, $scope.columns, $scope.externalDataRetrievedFromServer)
		    ]
		}

		function buildTableBody(head, columns, data) {
		    var body = [];

		    body.push(head);

		    data.forEach(function(row) {
		        var dataRow = [];

		        angular.forEach(columns,function(column) {
		            dataRow.push(row[column].toString());
		        })

		        body.push(dataRow);
		    });

		    return body;
		}

		function table(head, columns, data) {
		    return {
		        table: {
		            headerRows: 1,
		            widths: $scope.widths,
		            body: buildTableBody(head, columns, data)
		        }
		    };
		}

		$scope.openPdf = function(descargar) {
			if($scope.formData.reporte._id){
				$scope.dd = {
				    content: [
				        { text: $scope.name, style: 'header' },
				        table($scope.head, $scope.columns, $scope.externalDataRetrievedFromServer)
				    ]
				}
				if(descargar)
					pdfMake.createPdf($scope.dd).download($scope.name);
			    else
			    	pdfMake.createPdf($scope.dd).open();
			} else {
				$scope.showMessage(true, $scope.messageAlertInfo, 'Seleccione un reporte');
			}
	  	};

	  	


	  	//////////////////////////////////////////////////////////////////////77777
	  	// TEMPORAL
		$scope.openPdfOld = function() {
		    pdfMake.createPdf($scope.docDefinition).open();
	  	};
		 
		$scope.downloadPdf = function() {
			dd = {
			    content: [
			        { text: $scope.name, style: 'header' },
			        table($scope.head, $scope.columns, $scope.externalDataRetrievedFromServer)
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
			}
		    pdfMake.createPdf(dd).download('Reporte');
		};
		

		
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
	  	

	}]);