
	var Oficina = require('../models/Oficina.js');
	//var Cita = require('./models/Cita.js');

  	//GET - Return all oficinas in the DB
  	findAllOficinas = function(req, res) {
  		Oficina.find(function(err, oficinas) {
  			if(!err) {
        		console.log('GET /oficinas');
  				res.json(oficinas); //Atencion AQUI en la forma de enviar los resultlados
  			} else {
  				console.log('ERROR: ' + err);
  				res.status(500).send(err);
  			}
  		});
  	};

  	
  	//GET - Return all oficinas in the DB with search data
  	searchOficinas = function(req, res) {
  		//console.log(req.body.data);
  		req.body.data = req.body.data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"); //To escape special characters
  		//console.log(req.body.data);
  		Oficina.find(
  			//Tipe of operator and fields with values $regex = like, $options:"i" = insensitive
  			{ $or: [
  				{nombre: 	{ $regex : req.body.data, $options:"i" } },
  				{direccion: 	{ $regex : req.body.data, $options:"i" } },
  				{telefono: 	{ $regex : req.body.data, $options:"i" } },
  				{email: 	{ $regex : req.body.data, $options:"i" } }
  				]
  			}, 
  			function(err, oficinas) {
	  			if(!err) {
	        		//console.log('GET /oficinas search');
	  				res.json(oficinas); //Atencion AQUI en la forma de enviar los resultlados
	  			} else {
	  				console.log('ERROR: ' + err);
	  				res.status(500).send(err);
	  			}
  			}
  		);
  	};


  	//GET - Return all rows by query
  	queryOficinas = function(req, res) {
  		Oficina.find(
  			req.body,
  			function(err, oficinas) {
  			if(!err) {
        		console.log('GET /queryOficinas');
  				res.json(oficinas);
  			} else {
  				console.log('ERROR: ' + err);
  				res.status(500).send(err);
  			}
  		});
  	};
  	

	//GET - Return a Oficina with specified ID
	findByIdOficina = function(req, res) {
		Oficina.findById(req.params.id, function(err, oficina) {
			if(!err) {
	    		console.log('GET /oficina/' + req.params.id);
				res.json(oficina);
			} else {
				console.log('ERROR: ' + err);
				res.status(500).send(err);
			}
		});
	};

	//POST - Insert a new Oficina in the DB
	addOficina = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var oficina = new Oficina({
				nombre:								req.body.nombre,
				direccion:							req.body.direccion,
				telefono:							req.body.telefono,
				email:								req.body.email,
				estado: 							req.body.estado
		});

		oficina.save(function(err) {
			if(!err) {
				console.log('Created');
				res.json(oficina);
			} else {
				console.log('ERROR: ' + err);
				res.status(500).send(err);
			}
		});
	};

	//PUT - Update a register already exists
	updateOficina = function(req, res) {
		Oficina.findById(req.params.id, function(err, oficina) {
			oficina.nombre=								req.body.nombre;
			oficina.direccion=							req.body.direccion;
			oficina.telefono=							req.body.telefono;
			oficina.email=								req.body.email;
			oficina.estado= 								req.body.estado;

			oficina.save(function(err) {
				if(!err) {
					console.log('Updated');
					res.json(oficina);
				} else {
					console.log('ERROR: ' + err);
					res.status(500).send(err);
				}
			});
		});
	}

	//DELETE - Delete a Oficina with specified ID
	deleteOficina = function(req, res) {
		Oficina.findById(req.params.id, function(err, oficina) {
			oficina.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
					res.status(500).send(err);
				}
			})
		});
	}