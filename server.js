// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan     	   = require("morgan");

// Configuracion Socket io
var socketio = require('socket.io');
var server = require("http").createServer(app);
var io = socketio.listen(server);
app.set('socketio', io);
app.set('server', server);

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 3000; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// morgarn midleware
app.use(morgan("dev"));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//process funtion print - i dont know if works
process.on('uncaughtException', function(err) {
    console.log(err);
});


// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('EASING IE running on port: ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app




// Socket.io connection handler
/*
io.on('connection', function (socket) {  
        console.log(socket.id);

        //Simple example
        socket.on('led:on', function (data) {
           led.on();
           console.log('LED ON RECEIVED');
        });

        
        //Example using data
        socket.on('led:on', function (data) {
            switch(data.pin){
                case 1: led1.on();
                    break;
                case 2: led2.on();
                    break;
                default: console.log('NO PIN RECEIVED');
            }
            
            console.log('LED '+data.pin+' ON RECEIVED');
            var dataS = {pin: data.pin, stat: 'on'};
            io.sockets.emit('led:change', dataS );
            //console.log(io);
            //var clients = io.sockets; //clients is an array
            //console.log(clients);
        });

        //Example refresh after create|update|delete
        socket.on('led:created', function (data) {
            io.sockets.emit('led:refresh');
        });

        socket.on('led:deleted', function (data) {
            io.sockets.emit('led:refresh');
        });

        socket.on('led:updated', function (data) {
            io.sockets.emit('led:refresh');
        });

    });
*/