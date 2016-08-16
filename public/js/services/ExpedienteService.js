angular.module('ExpedienteService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Expedientes', ['$http',function($http) {
		var baseUrl = "http://ades-suciqroo.rhcloud.com";
        //var baseUrl = "http://10.10.35.44:3000";
        //var baseUrl = "http://localhost:3000";

		return {
			get : function() {
				return $http.get(baseUrl + '/api/expedientes');
			},
			findById : function(id) {
				return $http.get(baseUrl + '/api/expedientes/' + id);
			},
			create : function(expedienteData) {
				return $http.post(baseUrl + '/api/expedientes', expedienteData);
			},
			update : function(id,expedienteData) {
				return $http.put(baseUrl + '/api/expedientes/' + id, expedienteData);
			},
			delete : function(id) {
				return $http.delete(baseUrl + '/api/expedientes/' + id);
			},
			search : function(data) {
				return $http.post(baseUrl + '/api/expedientesSearch/', data);
			}
		}
	}]);