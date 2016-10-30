module.exports = function(app) {

	//Call all functions definition for the routes
	require('./functions/ExpedienteFunctions.js');
	
	require('./functions/PrivilegioFunctions.js');
	require('./functions/RolFunctions.js');
	require('./functions/OficinaFunctions.js');
	require('./functions/MainFunctions.js');
	require('./functions/UserFunctions.js');
	require('./functions/DoctorFunctions.js');
	


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

	//Doctores Functions
	app.get('/api/doctores', ensureAuthorized, findAllDoctores);
	app.post('/api/doctoresSearch/', ensureAuthorized, searchDoctores);
	app.post('/api/doctoresQuery/', ensureAuthorized, queryDoctores);
	app.get('/api/doctores/:id', ensureAuthorized, findByIdDoctor);
	app.post('/api/doctores', ensureAuthorized, addDoctor);
	app.put('/api/doctores/:id', ensureAuthorized, updateDoctor);
	app.delete('/api/doctores/:id', ensureAuthorized, deleteDoctor);

	//Oficinas Functions
	app.get('/api/oficinas', ensureAuthorized, findAllOficinas);
	app.post('/api/oficinasSearch/', ensureAuthorized, searchOficinas);
	app.post('/api/oficinasQuery/', ensureAuthorized, queryOficinas);
	app.get('/api/oficinas/:id', ensureAuthorized, findByIdOficina);
	app.post('/api/oficinas', ensureAuthorized, addOficina);
	app.put('/api/oficinas/:id', ensureAuthorized, updateOficina);
	app.delete('/api/oficinas/:id', ensureAuthorized, deleteOficina);

	//Privilegio Functions
	app.post('/api/privilegios/query/', ensureAuthorized, queryPrivilegio);
	app.get('/api/privilegios/:id', ensureAuthorized, findByIdPrivilegio);
	app.post('/api/privilegios', ensureAuthorized, addPrivilegio);
	app.put('/api/privilegios/:id', ensureAuthorized, updatePrivilegio);
	app.delete('/api/privilegios/:id', ensureAuthorized, deletePrivilegio);

	//Roles Functions
	app.get('/api/roles', ensureAuthorized, findAllRoles);
	app.post('/api/rolesSearch/', ensureAuthorized, searchRoles);
	app.post('/api/rolesQuery/', ensureAuthorized, queryRoles);
	app.get('/api/roles/:id', ensureAuthorized, findByIdRol);
	app.post('/api/roles', ensureAuthorized, addRol);
	app.put('/api/roles/:id', ensureAuthorized, updateRol);
	app.delete('/api/roles/:id', ensureAuthorized, deleteRol);

	//Users Functions
	app.get('/api/users', ensureAuthorized, findAllUsers);
	app.post('/api/usersSearch/', ensureAuthorized, searchUsers);
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