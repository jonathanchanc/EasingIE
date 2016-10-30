
	var Rol = require('../models/Rol.js');
	//var Cita = require('./models/Cita.js');

  	//GET - Return all Roles in the DB
  	findAllRoles = function(req, res) {
  		Rol.find(function(err, roles) {
  			if(!err) {
        		console.log('GET /roles');
  				res.json(roles); //Atencion AQUI en la forma de enviar los resultlados
  			} else {
  				console.log('ERROR: ' + err);
  				res.status(500).send(err);
  			}
  		});
  	};

  	
  	//GET - Return all Roles in the DB with search data
  	searchRoles = function(req, res) {
  		//console.log(req.body.data);
  		req.body.data = req.body.data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"); //To escape special characters
  		//console.log(req.body.data);
  		Rol.find(
  			//Tipe of operator and fields with values $regex = like, $options:"i" = insensitive
  			{ $or: [
  				{nombre: { $regex : req.body.data, $options:"i" } },
  				{descripcion: { $regex : req.body.data, $options:"i" } },
  				{homepage: { $regex : req.body.data, $options:"i" } }
  				]
  			}, 
  			function(err, roles) {
	  			if(!err) {
	  				res.json(roles);
	  			} else {
	  				console.log('ERROR: ' + err);
	  				res.status(500).send(err);
	  			}
  			}
  		);
  	};


  	//GET - Return all rows by query
  	queryRoles = function(req, res) {
  		Rol.find(
  			req.body,
  			function(err, roles) {
  			if(!err) {
        		console.log('GET /queryRoles');
  				res.json(roles);
  			} else {
  				console.log('ERROR: ' + err);
  				res.status(500).send(err);
  			}
  		});
  	};
  	

	//GET - Return a Rol with specified ID
	findByIdRol = function(req, res) {
		Rol.findById(req.params.id, function(err, rol) {
			if(!err) {
	    		console.log('GET /rol/' + req.params.id);
				res.json(rol);
			} else {
				console.log('ERROR: ' + err);
				res.status(500).send(err);
			}
		});
	};

	//POST - Insert a new Rol in the DB
	addRol = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var rol = new Rol({
				nombre:								req.body.nombre,
				descripcion:						req.body.descripcion,
				homepage:							req.body.homepage,
				estado: 							req.body.estado,
				privilegios: 						req.body.privilegios
		});

		rol.save(function(err) {
			if(!err) {
				console.log('Created');
				res.json(rol);
			} else {
				console.log('ERROR: ' + err);
				res.status(500).send(err);
			}
		});
	};

	//PUT - Update a register already exists
	updateRol = function(req, res) {
		Rol.findById(req.params.id, function(err, rol) {
			//CHhecar  salvado de privilegios
			//rol.privilegios.remove();
			//rol.save();
			rol.nombre=								req.body.nombre;
			rol.descripcion=						req.body.descripcion;
			rol.homepage=							req.body.homepage;
			rol.estado= 							req.body.estado;
			rol.privilegios= 						req.body.privilegios;

			rol.save(function(err) {
				if(!err) {
					console.log('Updated');
					res.json(rol);
				} else {
					console.log('ERROR: '+err);
					res.status(500).send(err);
				}
			});
		});
	}

	//DELETE - Delete a Rol with specified ID
	deleteRol = function(req, res) {
		Rol.findById(req.params.id, function(err, rol) {
			rol.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
					res.status(500).send(err);
				}
			})
		});
	}