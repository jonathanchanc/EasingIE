module.exports = function(app) {

	//Call all functions definition for the routes
	require('./functions/ExpedienteFunctions.js');
	require('./functions/UserFunctions.js');
	require('./functions/DoctorFunctions.js');
	require('./functions/admin/PrivilegioFunctions.js');

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
	app.post('/api/signin', signin);
	app.get('/api/me', ensureAuthorized, me);	

	// --------------------------------------------------------------------------

	//Doctores Functions
	app.get('/api/doctores', ensureAuthorized, findAllDoctores);
	app.post('/api/doctoresSearch/', ensureAuthorized, searchDoctores);
	app.get('/api/doctores/:id', ensureAuthorized, findByIdDoctor);
	app.post('/api/doctores', ensureAuthorized, addDoctor);
	app.put('/api/doctores/:id', ensureAuthorized, updateDoctor);
	app.delete('/api/doctores/:id', ensureAuthorized, deleteDoctor);

	//Privilegios Functions
	app.get('/api/privilegios', ensureAuthorized, findAllPrivilegios);
	app.post('/api/privilegiosSearch/', ensureAuthorized, searchPrivilegios);
	app.get('/api/privilegios/:id', ensureAuthorized, findByIdPrivilegio);
	app.post('/api/privilegios', ensureAuthorized, addPrivilegio);
	app.put('/api/privilegios/:id', ensureAuthorized, updatePrivilegio);
	app.delete('/api/privilegios/:id', ensureAuthorized, deletePrivilegio);


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});





};