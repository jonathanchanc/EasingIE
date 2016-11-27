angular.module('sampleApp', [
	'ngRoute', 
	'ngStorage',
	'ngMessages', 
	'appRoutes', 
	'appDirectives', 
	'angular-loading-bar',
	'localytics.directives',
	'ui.bootstrap',
	'MainCtrl', 
	'MainService', 
	'ExpedienteCtrl', 
	'ExpedienteService',
	//CONTABILIDAD
	'FichaCtrl', 
	'FichaService', 
	'FacturaCtrl', 
	'FacturaService', 
	//REPORTES
	'ReporteCtrl', 
	'ReporteService', 
	//ADMINISTRACION
	'OficinaCtrl', 
	'OficinaService', 
	'EspecialidadCtrl', 
	'EspecialidadService',
	'ProgramaCtrl', 
	'ProgramaService', 
	//'DoctorCtrl', 
	//'DoctorService', 
	'ProveedorCtrl', 
	'ProveedorService', 
	'ClienteCtrl', 
	'ClienteService',
	//SEGURIDAD
	'PrivilegioCtrl', 
	'PrivilegioService', 
	'RolCtrl', 
	'RolService', 
	'UserCtrl', 
	'UserService'
])

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.latencyThreshold = 100;
	}])
;