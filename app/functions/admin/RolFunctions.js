
	var Rol = require('../models/admin/Rol.js');
	//var Cita = require('./models/Cita.js');

  	//GET - Return all Roles in the DB
  	findAllRoles = function(req, res) {
  		Rol.find(function(err, Roles) {
  			if(!err) {
        		console.log('GET /Roles');
  				res.json(Roles); //Atencion AQUI en la forma de enviar los resultlados
  			} else {
  				console.log('ERROR: ' + err);
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
  				{descripcion: { $regex : req.body.data, $options:"i" } },
  				{homepage: { $regex : req.body.data, $options:"i" } }
  				]
  			}, 
  			function(err, Roles) {
	  			if(!err) {
	        		//console.log('GET /Roles search');
	  				res.json(Roles); //Atencion AQUI en la forma de enviar los resultlados
	  			} else {
	  				console.log('ERROR: ' + err);
	  			}
  			}
  		);
  	};
  	

	//GET - Return a Rol with specified ID
	findByIdRol = function(req, res) {
		Rol.findById(req.params.id, function(err, Rol) {
			if(!err) {
	    		console.log('GET /Rol/' + req.params.id);
				res.json(Rol);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Rol in the DB
	addRol = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var Rol = new Rol({
				descripcion:						req.body.descripcion,
				homepage:							req.body.homepage,
				estado: 							req.body.estado
		});

		Rol.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

		res.json(Rol);
	};

	//PUT - Update a register already exists
	updateRol = function(req, res) {
		Rol.findById(req.params.id, function(err, Rol) {
			Rol.descripcion=						req.body.descripcion;
			Rol.homepage=							req.body.homepage;
			Rol.estado= 							req.body.estado;

			Rol.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.json(Rol);
			});
		});
	}

	//DELETE - Delete a Rol with specified ID
	deleteRol = function(req, res) {
		Rol.findById(req.params.id, function(err, Rol) {
			Rol.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}