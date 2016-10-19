
	var Doctor = require('../models/Doctor.js');
	//var Cita = require('./models/Cita.js');

  	//GET - Return all doctores in the DB
  	findAllDoctores = function(req, res) {
  		Doctor.find(function(err, doctores) {
  			if(!err) {
        		console.log('GET /doctores');
  				res.json(doctores); //Atencion AQUI en la forma de enviar los resultlados
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		});
  	};

  	
  	//GET - Return all doctores in the DB with search data
  	searchDoctores = function(req, res) {
  		//console.log(req.body.data);
  		req.body.data = req.body.data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"); //To escape special characters
  		//console.log(req.body.data);
  		Doctor.find(
  			//Tipe of operator and fields with values $regex = like, $options:"i" = insensitive
  			{ $or: [
  				{apPaterno: { $regex : req.body.data, $options:"i" } },
  				{apMaterno: { $regex : req.body.data, $options:"i" } },
  				{nombre: 	{ $regex : req.body.data, $options:"i" } },
  				{telefono: 	{ $regex : req.body.data, $options:"i" } },
  				{email: 	{ $regex : req.body.data, $options:"i" } }
  				]
  			}, 
  			function(err, doctores) {
	  			if(!err) {
	        		//console.log('GET /doctores search');
	  				res.json(doctores); //Atencion AQUI en la forma de enviar los resultlados
	  			} else {
	  				console.log('ERROR: ' + err);
	  			}
  			}
  		);
  	};
  	

	//GET - Return a Doctor with specified ID
	findByIdDoctor = function(req, res) {
		Doctor.findById(req.params.id, function(err, doctor) {
			if(!err) {
	    		console.log('GET /doctor/' + req.params.id);
				res.json(doctor);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Doctor in the DB
	addDoctor = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var doctor = new Doctor({
				apPaterno:							req.body.apPaterno,
				apMaterno:							req.body.apMaterno,
				nombre:								req.body.nombre,
				telefono:							req.body.telefono,
				email:								req.body.email,
				estado: 							req.body.estado
		});

		doctor.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

		res.json(doctor);
	};

	//PUT - Update a register already exists
	updateDoctor = function(req, res) {
		Doctor.findById(req.params.id, function(err, doctor) {
			doctor.apPaterno=							req.body.apPaterno;
			doctor.apMaterno=							req.body.apMaterno;
			doctor.nombre=								req.body.nombre;
			doctor.telefono=							req.body.telefono;
			doctor.email=								req.body.email;
			doctor.estado= 								req.body.estado;

			doctor.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.json(doctor);
			});
		});
	}

	//DELETE - Delete a Doctor with specified ID
	deleteDoctor = function(req, res) {
		Doctor.findById(req.params.id, function(err, doctor) {
			doctor.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}