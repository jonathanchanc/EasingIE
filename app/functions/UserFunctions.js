	var jwt	 = require('jsonwebtoken');
	var User = require('../models/User.js');
	//var Cita = require('./models/Cita.js');

  	//GET - Return all users in the DB
  	findAllUsers = function(req, res) {
  		User.find(function(err, users) {
  			if(!err) {
        		console.log('GET /users');
  				res.json(users); //Atencion AQUI en la forma de enviar los resultlados
  			} else {
  				console.log('ERROR: ' + err);
  				res.status(500).send(err);
  			}
  		});
  	};

  	
  	//GET - Return all users in the DB with search data
  	searchUsers = function(req, res) {
  		//console.log(req.body.data);
  		req.body.data = req.body.data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"); //To escape special characters
  		//console.log(req.body.data);
  		User.find(
  			//Tipe of operator and fields with values $regex = like, $options:"i" = insensitive
  			{ $or: [
  				{apPaterno: { $regex : req.body.data, $options:"i" } },
  				{apMaterno: { $regex : req.body.data, $options:"i" } },
  				{nombre: 	{ $regex : req.body.data, $options:"i" } },
  				{telefono: 	{ $regex : req.body.data, $options:"i" } },
  				{email: 	{ $regex : req.body.data, $options:"i" } }
  				]
  			}, 
  			function(err, users) {
	  			if(!err) {
	  				res.json(users);
	  			} else {
	  				console.log('ERROR: ' + err);
	  				res.status(500).send(err);
	  			}
  			}
  		);
  	};


  	//GET - Return all rows by query
  	queryUsers = function(req, res) {
  		User.find(
  			req.body,
  			function(err, users) {
  			if(!err) {
        		console.log('GET /queryUsers');
  				res.json(users);
  			} else {
  				console.log('ERROR: ' + err);
  				res.status(500).send(err);
  			}
  		});
  	};
  	

	//GET - Return a User with specified ID
	findByIdUser = function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if(!err) {
	    		console.log('GET /user/' + req.params.id);
				res.json(user);
			} else {
				console.log('ERROR: ' + err);
				res.status(500).send(err);
			}
		});
	};

	//POST - Insert a new User in the DB
	addUser = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var user = new User({
				usuario: 							req.body.usuario,
				password: 							req.body.password,
				//token: 							req.body.token,
				titulo: 							req.body.titulo,
				siglas: 							req.body.siglas,
				apPaterno:							req.body.apPaterno,
				apMaterno:							req.body.apMaterno,
				nombre:								req.body.nombre,
				telefono:							req.body.telefono,
				email:								req.body.email,
			    fecha_alta: 						req.body.fecha_alta,
			    estado: 							req.body.estado,
			    
			    oficina: 							req.body.oficina,
			    rol: 								req.body.rol
		});

		user.save(function(err, user) {
            user.token = jwt.sign(user, /*process.env.JWT_SECRET ||*/ 'randomkey');
            user.save(function(err, user1) {
            	if(!err) {
					console.log('Created');
					res.json(user1);
				} else {
					console.log('ERROR: ' + err);
					res.status(500).send(err);
				}
            });
        });
	};

	//PUT - Update a register already exists
	updateUser = function(req, res) {
		User.findById(req.params.id, function(err, user) {
			user.usuario=							req.body.usuario;
			user.password=							req.body.password;
			user.token=								req.body.token;
			user.titulo=							req.body.titulo;
			user.siglas=							req.body.siglas;
			user.apPaterno=							req.body.apPaterno;
			user.apMaterno=							req.body.apMaterno;
			user.nombre=							req.body.nombre;
			user.telefono=							req.body.telefono;
			user.email=								req.body.email;
			user.fecha_alta=						req.body.fecha_alta;
			user.estado= 							req.body.estado;

			user.oficina= 							req.body.oficina;
			user.rol= 								req.body.rol;

			user.save(function(err, user) {
	            user.token = jwt.sign(user, /*process.env.JWT_SECRET ||*/ 'randomkey');
	            user.save(function(err, user1) {
	            	if(!err) {
						console.log('Created');
						res.json(user1);
					} else {
						console.log('ERROR: ' + err);
						res.status(500).send(err);
					}
	            });
	        });
			
		});
	}

	//DELETE - Delete a User with specified ID
	deleteUser = function(req, res) {
		User.findById(req.params.id, function(err, user) {
			user.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
					res.status(500).send(err);
				}
			})
		});
	}