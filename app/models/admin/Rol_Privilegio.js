var mongoose = require('mongoose'),
	Schema = mongoose.Schema
	Rol = mongoose.model('Rol');
	Privilegio = mongoose.model('Privilegio');

var Rol_PrivilegioSchema = new Schema({
	rol: 			{ type: Schema.ObjectId, ref: "Rol" },
	privilegio: 	{ type: Schema.ObjectId, ref: "Privilegio" }
});

module.exports = mongoose.model('Rol_Privilegio', Rol_PrivilegioSchema);