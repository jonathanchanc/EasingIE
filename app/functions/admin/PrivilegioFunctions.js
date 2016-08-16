
	var Privilegio = require('./../../models/admin/Privilegio.js');
	//var Cita = require('./models/Cita.js');

  	//GET - Return all Privilegios in the DB
  	findAllPrivilegios = function(req, res) {
  		Privilegio.find(function(err, privilegios) {
  			if(!err) {
        		console.log('GET /Privilegios');
  				res.json(privilegios); //Atencion AQUI en la forma de enviar los resultlados
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		});
  	};

  	
  	//GET - Return all Privilegios in the DB with search data
  	searchPrivilegios = function(req, res) {
  		//console.log(req.body.data);
  		req.body.data = req.body.data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"); //To escape special characters
  		//console.log(req.body.data);
  		Privilegio.find(
  			//Tipe of operator and fields with values $regex = like, $options:"i" = insensitive
  			{ $or: [
  				{descripcion: { $regex : req.body.data, $options:"i" } }
  				]
  			}, 
  			function(err, privilegios) {
	  			if(!err) {
	        		//console.log('GET /Privilegios search');
	  				res.json(privilegios); //Atencion AQUI en la forma de enviar los resultlados
	  			} else {
	  				console.log('ERROR: ' + err);
	  			}
  			}
  		);
  	};
  	

	//GET - Return a Privilegio with specified ID
	findByIdPrivilegio = function(req, res) {
		Privilegio.findById(req.params.id, function(err, privilegio) {
			if(!err) {
	    		console.log('GET /Privilegio/' + req.params.id);
				res.json(privilegio);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Privilegio in the DB
	addPrivilegio = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var privilegio = new Privilegio({
				descripcion:						req.body.descripcion,
				estado: 							req.body.estado
		});

		privilegio.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

		res.json(privilegio);
	};

	//PUT - Update a register already exists
	updatePrivilegio = function(req, res) {
		Privilegio.findById(req.params.id, function(err, privilegio) {
			privilegio.descripcion=						req.body.descripcion;
			privilegio.estado= 							req.body.estado;

			privilegio.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.json(privilegio);
			});
		});
	}

	//DELETE - Delete a Privilegio with specified ID
	deletePrivilegio = function(req, res) {
		Privilegio.findById(req.params.id, function(err, privilegio) {
			privilegio.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}