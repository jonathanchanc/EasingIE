angular.module('sampleApp', [
	'ngRoute', 
	'ngStorage',
	'ngMessages', 
	'appRoutes', 
	'appDirectives', 
	'angular-loading-bar',
	'ui.bootstrap',
	'MainCtrl', 
	'MainService', 
	'ClienteCtrl', 
	'ClienteService', 
	'DoctorCtrl', 
	'DoctorService', 
	'ExpedienteCtrl', 
	'ExpedienteService',
	'OficinaCtrl', 
	'OficinaService', 
	'PrivilegioCtrl', 
	'PrivilegioService', 
	'RolCtrl', 
	'RolService', 
	'UserCtrl', 
	'UserService', 
	'GeekCtrl', 
	'GeekService'])

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.latencyThreshold = 100;
	}])
;