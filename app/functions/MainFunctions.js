	var jwt	 = require('jsonwebtoken');
	var User = require('../models/User.js');

  	//GET - Return all expedientes in the DB
  	authenticate = function(req, res) {
  		User.findOne({usuario: req.body.usuario, password: req.body.password}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (user) {
	               res.json({
	                    type: true,
	                    data: user,
	                    token: user.token
	                }); 
	            } else {
	                res.json({
	                    type: false,
	                    data: "Incorrect usuario/password"
	                });    
	            }
	        }
	    });
  	};

	// //GET - Return a Expediente with specified ID
	// signin = function(req, res) {
	//     User.findOne({usuario: req.body.usuario /*, password: req.body.password */}, function(err, user) {
	//         if (err) {
	//             res.json({
	//                 type: false,
	//                 data: "Error occured: " + err
	//             });
	//         } else {
	//             if (user) {
	//                 res.json({
	//                     type: false,
	//                     data: "User already exists!"
	//                 });
	//                 console.log("Usuario existe");
	//             } else {
	//                 var userModel = new User();
	//                 userModel.usuario = req.body.usuario;
	//                 userModel.password = req.body.password;
	//                 userModel.save(function(err, user) {
	//                     user.token = jwt.sign(user, /*process.env.JWT_SECRET ||*/ 'randomkey');
	//                     user.save(function(err, user1) {
	//                         res.json({
	//                             type: true,
	//                             data: user1,
	//                             token: user1.token
	//                         });
	//                     });
	//                 });
	// 				console.log("Usuario guardado");
	//             }
	//         }
	//     });
	// };

	//POST - Insert a new Expediente in the DB
	me = function(req, res) {
		User.findOne({token: req.token}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            res.json({
	                type: true,
	                data: user
	            });
	        }
	    });
		
	};

	ensureAuthorized = function(req, res, next) {
	    var bearerToken;
	    var bearerHeader = req.headers["authorization"];
	    if (typeof bearerHeader !== 'undefined') {
	        var bearer = bearerHeader.split(" ");
	        bearerToken = bearer[1];
	        req.token = bearerToken;
	        next();
	    } else {
	        res.send(403);
	    }
	}