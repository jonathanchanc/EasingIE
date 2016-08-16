var mongoose = require('mongoose'),
	Schema = mongoose.Schema
	User = mongoose.model('User');
	Rol = mongoose.model('Rol');

var User_RolSchema = new Schema({
	user: 	{ type: Schema.ObjectId, ref: "User" },
	rol: 	{ type: Schema.ObjectId, ref: "Rol" }
});

module.exports = mongoose.model('User_Rol', User_RolSchema);