var mongoose = require('mongoose'),
	Schema = mongoose.Schema
	Expediente = mongoose.model('Expediente');

var RevisionSchema = new Schema({
	fecha_revision:						{ type: Date },
	padecimiento_actual:				{ type: String },
	estado:								{ type: String },
	expediente: 						{ type: Schema.ObjectId, ref: "Expediente" }
});


module.exports = mongoose.model('Revision', RevisionSchema);