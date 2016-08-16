var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RolSchema = new Schema({
	descripcion:						{ type: String },
	homepage:							{ type: String },
	estado: 							{ type: String }
});

module.exports = mongoose.model('Rol', RolSchema);