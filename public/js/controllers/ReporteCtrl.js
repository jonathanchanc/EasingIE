angular.module('ReporteCtrl',[])

	.controller('ReporteController', ['$rootScope','$scope','$routeParams','$location','Main','Reportes', 'Fichas', 'Especialidades', 'Programas', 'Proveedores', 'Clientes', 'Users', function($rootScope, $scope, $routeParams, $location, Main, Reportes, Fichas, Especialidades, Programas, Proveedores, Clientes, Users) {
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
		$scope.formTemp = { filtros: [], estado:'', pagado:'' };
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
		$scope.dateOptionsIni = {};
		$scope.dateOptionsFin = {};
		//$scope.dateOptions = {
	    	//dateDisabled: false,
		    //formatYear: 'yyyy',
		    //minDate: $scope.formTemp.fecha_ini,
		    //maxDate: $scope.formTemp.fecha_fin,
		    //startingDay: 1
	  	//};
	  	
	  	$scope.open = function(popup) {
	  		switch(popup){
	  			case 1:
	  				$scope.popup1.opened = true;
	  				break;
  				case 2:
  					$scope.popup2.opened = true;
	  				break;
	  		}

	  		if($scope.formTemp.$gte!=undefined)
	  			$scope.dateOptionsFin['minDate'] = $scope.formTemp.$gte;
	  		
	  		if($scope.formTemp.$lte!=undefined)
	  			$scope.dateOptionsIni['maxDate'] = $scope.formTemp.$lte;
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
				//filtros: ["fecha_ini", "fecha_fin", "cliente", "estado", "pagado"],
				filtros: {$gte: 'usuario.fecha', $lte: 'usuario.fecha', cliente: 'cliente._id', estado: 'estado', pagado: 'programas.pagado'},
				query: {}, 
				//select:{'folio':1, 'anio':1, 'monto_total':1},
				select:{},
				columns:['fecha_corta','folio', 'usuario.usuario', 'nombre', 'cliente.credencial', 'total', 'monto_apoyo_terceros', 'pagado', 'monto_suciqroo', 'factura.folio_factura'],
				head:['Fecha','Folio', 'Operador', 'Programa', 'Folio Credencial', 'Precio Total', 'Terceros', 'Pagado', 'Suciqroo', 'Factura' ],
				widths: ['auto','auto','auto',100,'auto','auto','auto','auto','auto','auto']
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
			{ 
				_id: 7, nombre: 'Servicios Pagados', table: 'Fichas', 
				filtros: ["fecha_ini", "fecha_fin", "cliente", "estado", "pagado"],
				query: {}, 
				select:{'folio':1, 'anio':1, 'monto_total':1},
				columns:['folio_ficha', 'anio', 'monto_total'],
				head:['Folio', 'Año', 'Monto'],
				widths: ['*','*','*']
			},
			{ 
				_id: 8, nombre: 'Reporte de Gastos', table: 'Egresos', 
				filtros: ["fecha_ini", "fecha_fin", "estado", "pagado"],
				query: {}, 
				select:{'folio_egreso':1, 'fecha':1, 'monto_salida':1, 'monto_total':1, 'monto_cambio':1, 'concepto':1, 'estado':1, 'factura.folio_factura':1, 'oficina.nombre':1},
				columns:['folio_egreso', 'fecha', 'monto_salida', 'monto_total', 'monto_cambio', 'concepto', 'estado', 'factura.folio_factura', 'oficina.nombre'],
				head:['Folio', 'Fecha', 'Salida', 'Total', 'Cambio', 'Concepto', 'Estado', 'Factura', 'Oficina'],
				widths: ['*','*','*','*','*','*','*','*','*']
			},
		];


	

		$scope.inicio = function(){
			Main.getPrivilegios().then(function(){ $scope.privilegios = $rootScope.privilegios});
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
			_.each($scope.formData.reporte.filtros, function(value, filtro){
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

			console.log($scope.formData.reporte)
			console.log($scope.formData.reporte.columns)
			if($scope.formData.reporte._id)
				Reportes.getReporteById($scope.formData.reporte, $scope.formTemp, descargar);
			/*
			var externalData = Reportes.getReporteById($scope.formData.reporte, $scope.formTemp);
			$scope.name = $scope.formData.reporte.nombre;
			$scope.head = $scope.formData.reporte.head;
			$scope.widths = $scope.formData.reporte.widths;
			$scope.columns =  $scope.formData.reporte.columns;
			$scope.externalDataRetrievedFromServer = externalData;
		    $scope.openPdf(descargar);
		    */
		}

		$scope.getPdf1 = function(descargar) {
			var arrQuery = {};
			var and = [];
			_.each($scope.formData.reporte.filtros, function(filtro){
				if($scope.formTemp[filtro.toString()] != undefined && $scope.formTemp[filtro.toString()] != '' ){
					var whereFiled = {};
					whereFiled[filtro.toString()] = $scope.formTemp[filtro.toString()];
					and.push(whereFiled);
				}
			});
			if(and.length > 0)
				arrQuery.query = { $and: and };
			else 
				arrQuery.query = {};
			arrQuery.select =  $scope.formData.reporte.select;
			$scope.name = $scope.formData.reporte.nombre;
			$scope.head = $scope.formData.reporte.head;
			$scope.widths = $scope.formData.reporte.widths;
			$scope.columns =  $scope.formData.reporte.columns;

			console.log(arrQuery.query);
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

		    //data.forEach(function(row) {
		    angular.forEach(data,function(row) {
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
		    pdfMake.createPdf(docDefinition).open();
		    //pdfMake.createPdf($scope.docDefinition).open();
		    //pdfMake.createPdf($scope.docDefinitionFicha).open();
	  	};



	  	var docDefinition = {
	  		// a string or { width: number, height: number }
  			pageSize: 'Letter',
			// by default we use portrait, you can change it to landscape if you wish
			pageOrientation: 'landscape',
			// [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
			//pageMargins: [ 40, 60, 40, 60 ],
			background: {
					      // you'll most often use dataURI images on the browser side
					      // if no width/height/fit is provided, the original size will be used
					      image: 'data:image/jpeg;base64,img/suciqroo_logo_2.jpg'
					    },
			content: [
				'paragraph 1',
				'paragraph 2',
				{
				  columns: [
				    'first column is a simple text',
				    {
				      stack: [
				        // second column consists of paragraphs
				        'paragraph A',
				        'paragraph B',
				        'these paragraphs will be rendered one below another inside the column'
				      ],
				      fontSize: 15
				    }
				  ]
				}
			]
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

	  	$scope.docDefinitionFicha = {
		    content: [
				{
					text: 'Fruits and Calories'
				},
				{
					style: 'demoTable',
					table: {
						widths: ['*', '*'],
						body: [
							['Fecha', '30 Nov 2016'],
							['Programa', 'Consulta medica'],
							['Nombre', 'Jonathan Chan'],
							['Dirección', 'Reg. 99 Mz 36 Lote 23 Calle 8'],
							['Telefono', '9981123456'],
							['Email', 'mail@mail.com'],
							['Folio', '2016-000000123'],
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