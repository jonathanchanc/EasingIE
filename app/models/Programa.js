var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Especialidad = mongoose.model('Especialidad');

var ProgramaSchema = new Schema({
	nombre:								{ type: String, unique: true },
	descripcion:						{ type: String },
	precio_publico:						{ type: Number },
	precio_suciqroo:					{ type: Number },
	monto_apoyo_terceros:				{ type: Number },
	//monto_suciqroo:						{ type: Number }, //NUEVO SCHEMA - ESTE CAMPO DESAPARECE
	estado: 							{ type: String },

	especialidad: 						{ type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad' }
});

module.exports = mongoose.model('Programa', ProgramaSchema);