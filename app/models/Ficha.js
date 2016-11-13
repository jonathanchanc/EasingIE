var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = mongoose.model('User'),
	Oficina = mongoose.model('Oficina'),
	Cliente = mongoose.model('Cliente'),
	Programa = mongoose.model('Programa'),
	Proveedor = mongoose.model('Proveedor'),
	Proveedor = mongoose.model('Especialidad')
	;
	

var FichaSchema = new Schema({
	id:									{ type: Number, unique: true },
	folio:								{ type: Number, unique: true },
	fecha_alta:							{ type: Date, default: Date.now },
	concepto:							{ type: String },
	comentario:							{ type: String },
	monto_total:						{ type: Number },
	monto_apoyo_terceros:				{ type: Number },
	monto_suciqroo:						{ type: Number },
	afiliado:							{ type: String },
	pagado:								{ type: String },
	estado: 							{ type: String },

	usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	programa: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa' },
	cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }
});


/* NUEVO SCHEMA TENTATIVO PARA FICHAS
var FichaSchema = new Schema({
	id:									{ type: Number, unique: true },
	folio:								{ type: Number, unique: true },
	fecha_alta:							{ type: Date, default: Date.now },
	
	cliente: {
		_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
		nombre: { type: String }, //DEFINIR SI SERÄ NOMBRE COMPLETA O CAMPO POR CAMPO
		afiliado: { type: String },
		credencial: { type: Number },
	},

	usuario: {
		_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		nombre: { type: String }, //DEFINIR SI SERÄ NOMBRE COMPLETA O CAMPO POR CAMPO
		oficina: {
			_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Oficina' },
			nombre: { type: String }, //DEFINIR SI SERÄ NOMBRE COMPLETA O CAMPO POR CAMPO
		},
	},
	programas: [
		{
			_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa' },
			nombre: { type: String },
			precio: { type: Number },
			monto_apoyo_terceros: { type: Number },
			monto_suciqroo: { type: Number },
			pagado: { type: String },
			fecha_pago: { type: Date },
			proveedor {
				_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },
				nombre: { type: String }, //DEFINIR SI SERÄ NOMBRE COMPLETA O CAMPO POR CAMPO
			},
			especialidad {
				_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad' },
				nombre: { type: String },
			},
		}
	],

	monto_total:						{ type: Number },
	comentario:							{ type: String },
	pagado:								{ type: String },
	fecha_pago: 						{ type: Date },
	fecha_ultima_modificacion: 						{ type: Date },
	estado: 							{ type: String },
});
*/

module.exports = mongoose.model('Ficha', FichaSchema);