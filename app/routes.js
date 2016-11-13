module.exports = function(app) {

	//Call all functions definition for the routes
	require('./functions/ExpedienteFunctions.js');
	
	require('./functions/PrivilegioFunctions.js');
	require('./functions/RolFunctions.js');
	require('./functions/OficinaFunctions.js');
	require('./functions/EspecialidadFunctions.js');
	require('./functions/ProgramaFunctions.js');
	require('./functions/MainFunctions.js');
	require('./functions/UserFunctions.js');
	require('./functions/DoctorFunctions.js');
	require('./functions/ProveedorFunctions.js');
	require('./functions/ClienteFunctions.js');
	require('./functions/FichaFunctions.js');
	


	//Link routes and functions

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	//Expedientes Functions
	app.get('/api/expedientes', ensureAuthorized, findAllExpedientes);
	app.post('/api/expedientesSearch/', ensureAuthorized, searchExpedientes);
	app.get('/api/expedientes/:id', ensureAuthorized, findByIdExpediente);
	app.post('/api/expedientes', ensureAuthorized, addExpediente);
	app.put('/api/expedientes/:id', ensureAuthorized, updateExpediente);
	app.delete('/api/expedientes/:id', ensureAuthorized, deleteExpediente);

	//User Functions
	app.post('/api/authenticate', authenticate);
	//app.post('/api/signin', signin);
	app.get('/api/me', ensureAuthorized, me);	

	// --------------------------------------------------------------------------

	//CONTABILIDAD

	//Fichas Functions
	app.post('/api/fichas/query/', ensureAuthorized, queryFicha);
	app.get('/api/fichas/:id', ensureAuthorized, findByIdFicha);
	app.post('/api/fichas', ensureAuthorized, addFicha);
	app.put('/api/fichas/:id', ensureAuthorized, updateFicha);
	app.delete('/api/fichas/:id', ensureAuthorized, deleteFicha);

	//ADMINISTRACION

	//Oficinas Functions
	app.post('/api/oficinas/query/', ensureAuthorized, queryOficina);
	app.get('/api/oficinas/:id', ensureAuthorized, findByIdOficina);
	app.post('/api/oficinas', ensureAuthorized, addOficina);
	app.put('/api/oficinas/:id', ensureAuthorized, updateOficina);
	app.delete('/api/oficinas/:id', ensureAuthorized, deleteOficina);

	//Especialidades Functions
	app.post('/api/especialidades/query/', ensureAuthorized, queryEspecialidad);
	app.get('/api/especialidades/:id', ensureAuthorized, findByIdEspecialidad);
	app.post('/api/especialidades', ensureAuthorized, addEspecialidad);
	app.put('/api/especialidades/:id', ensureAuthorized, updateEspecialidad);
	app.delete('/api/especialidades/:id', ensureAuthorized, deleteEspecialidad);

	//Programas Functions
	app.post('/api/programas/query/', ensureAuthorized, queryPrograma);
	app.get('/api/programas/:id', ensureAuthorized, findByIdPrograma);
	app.post('/api/programas', ensureAuthorized, addPrograma);
	app.put('/api/programas/:id', ensureAuthorized, updatePrograma);
	app.delete('/api/programas/:id', ensureAuthorized, deletePrograma);

	//Doctores Functions
	app.post('/api/doctores/query/', ensureAuthorized, queryDoctor);
	app.get('/api/doctores/:id', ensureAuthorized, findByIdDoctor);
	app.post('/api/doctores', ensureAuthorized, addDoctor);
	app.put('/api/doctores/:id', ensureAuthorized, updateDoctor);
	app.delete('/api/doctores/:id', ensureAuthorized, deleteDoctor);

	//Proveedores Functions
	app.post('/api/proveedores/query/', ensureAuthorized, queryProveedor);
	app.get('/api/proveedores/:id', ensureAuthorized, findByIdProveedor);
	app.post('/api/proveedores', ensureAuthorized, addProveedor);
	app.put('/api/proveedores/:id', ensureAuthorized, updateProveedor);
	app.delete('/api/proveedores/:id', ensureAuthorized, deleteProveedor);

	//Clientes Functions
	app.post('/api/clientes/query/', ensureAuthorized, queryCliente);
	app.get('/api/clientes/:id', ensureAuthorized, findByIdCliente);
	app.post('/api/clientes', ensureAuthorized, addCliente);
	app.put('/api/clientes/:id', ensureAuthorized, updateCliente);
	app.delete('/api/clientes/:id', ensureAuthorized, deleteCliente);

	//SEGURIDAD

	//Privilegios Functions
	app.post('/api/privilegios/query/', ensureAuthorized, queryPrivilegio);
	app.get('/api/privilegios/:id', ensureAuthorized, findByIdPrivilegio);
	app.post('/api/privilegios', ensureAuthorized, addPrivilegio);
	app.put('/api/privilegios/:id', ensureAuthorized, updatePrivilegio);
	app.delete('/api/privilegios/:id', ensureAuthorized, deletePrivilegio);

	//Roles Functions
	app.post('/api/roles/query/', ensureAuthorized, queryRol);
	app.get('/api/roles/:id', ensureAuthorized, findByIdRol);
	app.post('/api/roles', ensureAuthorized, addRol);
	app.put('/api/roles/:id', ensureAuthorized, updateRol);
	app.delete('/api/roles/:id', ensureAuthorized, deleteRol);

	//Users Functions
	app.post('/api/users/query/', ensureAuthorized, queryUser);
	app.get('/api/users/:id', ensureAuthorized, findByIdUser);
	app.post('/api/users', ensureAuthorized, addUser);
	app.put('/api/users/:id', ensureAuthorized, updateUser);
	app.delete('/api/users/:id', ensureAuthorized, deleteUser);


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});





};