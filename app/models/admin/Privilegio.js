var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PrivilegioSchema = new Schema({
	descripcion:						{ type: String },
	estado: 							{ type: String }
});

module.exports = mongoose.model('Privilegio', PrivilegioSchema);