angular.module('ReporteService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Reportes', ['$rootScope', '$http', 'Fichas',function($rootScope, $http, Fichas) {
        //var baseUrl = $rootScope.baseUrl;
        //var nameUrl = '/api/reportes';

        //Variables para reportes
        var name = 'Reporte';
		var head = ['Nombre', 'Edad'];
		var columns = ['name', 'age'];
		var widths = ['*', '*'];
		var externalDataRetrievedFromServer = [
		    { name: 'Bartek', age: 34 },
		    { name: 'John', age: 27 },
		    { name: 'Elizabeth', age: 30 },
		];
		var styles = {
				header: {
					bold: true,
					color: '#000',
					fontSize: 10
				},
				demoTable: {
					color: '#000',
					fontSize: 7
				}
		    };
		var dd = {
		    content: [
		        { text: 'Dynamic parts', style: 'header' },
		        table(head, columns, externalDataRetrievedFromServer)
		    ],
		    styles: styles
		}

        function getReporteById(reporte, dataSearch, descargar) {
			var arrQuery = {};
			var and = [];
			console.log('-- dataSearch');
			console.log(dataSearch);
			_.each(reporte.filtros, function(value, filtro){
				if(dataSearch[filtro.toString()] != undefined && dataSearch[filtro.toString()] != '' ){
					var whereFiled = {};
					//whereFiled[filtro.toString()] = dataSearch[filtro.toString()]; version old
					console.log('-- filtro');
					console.log(filtro);

					if(filtro == '$gte' || filtro == '$lte'){
						whereFiled[value.toString()] = {};
						whereFiled[value.toString()][filtro.toString()] = dataSearch[filtro.toString()];  
						//{"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)
					} else {
						whereFiled[value.toString()] = dataSearch[filtro.toString()];
					}
						
					and.push(whereFiled);
				}
			});
			if(and.length > 0)
				arrQuery.query = { $and: and };
			else 
				arrQuery.query = {};
			arrQuery.select =  reporte.select;
			name = reporte.nombre;
			head = reporte.head;
			widths = reporte.widths;
			columns =  reporte.columns;

			console.log('-- Arr Query');
			console.log(arrQuery);
			//Vendria siendo esto pero por cada filtro
			//arrQuery.query = {
			//				$and: [
			//					{ 'estado': formTemp.estado },
			//					{ 'programa': formTemp.programa }
			//				]
			//			};
			getDataReporte(reporte.nombre, arrQuery, descargar);
	  	};

	  	function getDataReporte(nombre, query, descargar){
	  		switch(nombre){
				case 'Servicios Pagados':
					Fichas.query(query)
					.success(function(data) { 
						var externalData = [];
						if(data.instanceList){
							_.each(data.instanceList, function(instance){
								/*
								var objectData = {};
								_.each(columns, function(column){
									//objectData[column.toString()] = instance[column.toString()]; //old
									objectData[column.toString()] = ( _.property(column)(instance) != undefined ) ? _.property(column)(instance).toString() : '';
								});
								externalData.push(objectData);
								*/

								_.each(instance.programas, function(programa){
									var objectData = {};
									var ficha = angular.copy(instance);
									//ficha.programas = [];
									var object = angular.extend(ficha, programa);
									_.each(columns, function(column){
										objectData[column.toString()] = ( _.property(column)(object) != undefined ) ? _.property(column)(object).toString() : '';
									});
									externalData.push(objectData);
								})

							});
						}
						externalDataRetrievedFromServer = externalData;
					    openPdf(descargar);
					})
					.error(function(data, status) {
						console.log('Error: ' + status);
	        			console.log(data);	
		            });

		            break;
				case 'Proveedores Pagados':
				case 'Balance General':
				case 'Fichas por Usuario':
				case 'Pago de Servicios':
				case 'Historico':
			}
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
		    	style: 'demoTable',
		        table: {
		            headerRows: 1,
		            widths: widths,
		            body: buildTableBody(head, columns, data)
		        }
		    };
		}

		function openPdf(descargar) {			
			dd = {
			    content: [
			        { text: name, style: 'header' },
			        table(head, columns, externalDataRetrievedFromServer)
			    ],
		    	styles: styles
			}
			if(descargar)
				pdfMake.createPdf(dd).download(name);
		    else
		    	pdfMake.createPdf(dd).open();
	  	};

		return {
			getReporteById : function(reporte, dataSearch, descargar) {
				return getReporteById(reporte, dataSearch, descargar);
			}
		}
	}]);