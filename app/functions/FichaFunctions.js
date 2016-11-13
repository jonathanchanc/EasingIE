	var Instance = require('../models/Ficha.js');

  	//POST - Return all rows by query
  	queryFicha = function(req, res) {
  		var query = Instance.find(req.body.query); 					//Array

  		if(req.body.select)
			query.select(req.body.select);							//Array || String
  			
		if(req.body.limit)
			query.limit(req.body.limit); 							//Number

    	if(req.body.limit && req.body.page)
			query.skip(req.body.limit * req.body.page);				//Number

    	if(req.body.sort)
			query.sort(req.body.sort);								//Array	|| String
  			
		query.exec(function(err, instanceList) {
				Instance.count(req.body.query).exec(function(err, count) {
					if(!err) {
	        		//console.log('POST - query');
	  				res.json({
	  					instanceList: instanceList,
	  					totalItems: count 
		            });

	  			} else {
	  				console.log('ERROR: ' + err);
	  				res.status(500).send(err);
	  			}
	            
	        });
  			
  		});
  	};
  	

	//GET - Return a instance with specified ID
	findByIdFicha = function(req, res) {
		Instance.findById(req.params.id, function(err, instance) {
			if(!err) {
	    		//console.log('GET /' + req.params.id);
				res.json(instance);
			} else {
				console.log('ERROR: ' + err);
				res.status(500).send(err);
			}
		});
	};

	//POST - Insert a new row in the DB
	addFicha = function(req, res) {
		var instance = {};
		instance.id = req.body.id;
		instance.folio = req.body.folio;
		instance.fecha_alta = req.body.fecha_alta;
		instance.concepto = req.body.concepto;
		instance.comentario = req.body.comentario;
		instance.monto_total = req.body.monto_total;
		instance.monto_apoyo_terceros = req.body.monto_apoyo_terceros;
		instance.monto_suciqroo = req.body.monto_suciqroo;
		instance.afiliado = req.body.afiliado;
		instance.pagado = req.body.pagado;
		instance.estado = req.body.estado;
		instance.usuario = req.body.usuario;
		instance.programa = req.body.programa;
		instance.cliente = req.body.cliente;
		//instance.factura = req.body.factura;

		instance = new Instance(instance);
		instance.save(function(err) {
			if(!err) {
				//console.log('Created');
				res.json(instance);
			} else {
				console.log('ERROR: ' + err);
				res.status(500).send(err);
			}
		});
	};

	//PUT - Update a register already exists
	updateFicha = function(req, res) {
		Instance.findById(req.params.id, function(err, instance) {
			instance.id = req.body.id;
			instance.folio = req.body.folio;
			instance.fecha_alta = req.body.fecha_alta;
			instance.concepto = req.body.concepto;
			instance.comentario = req.body.comentario;
			instance.monto_total = req.body.monto_total;
			instance.monto_apoyo_terceros = req.body.monto_apoyo_terceros;
			instance.monto_suciqroo = req.body.monto_suciqroo;
			instance.afiliado = req.body.afiliado;
			instance.pagado = req.body.pagado;
			instance.estado = req.body.estado;
			instance.usuario = req.body.usuario;
			instance.programa = req.body.programa;
			instance.cliente = req.body.cliente;
			//instance.factura = req.body.factura;

			instance.save(function(err) {
				if(!err) {
					//console.log('Updated');
					res.json(instance);
				} else {
					console.log('ERROR: ' + err);
					res.status(500).send(err);
				}
			});
		});
	}

	//DELETE - Delete a instance with specified ID
	deleteFicha = function(req, res) {
		Instance.findById(req.params.id, function(err, instance) {
			instance.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
					res.status(500).send(err);
				}
			})
		});
	}