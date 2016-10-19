var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DoctorSchema = new Schema({
	apPaterno:							{ type: String },
	apMaterno:							{ type: String },
	nombre:								{ type: String },
	telefono:							{ type: String },
	email:								{ type: String },
	estado: 							{ type: String }

});

DoctorSchema.index({ nombre: 1, apPaterno: 1, apMaterno: 1}, { unique: true });

module.exports = mongoose.model('Doctor', DoctorSchema);