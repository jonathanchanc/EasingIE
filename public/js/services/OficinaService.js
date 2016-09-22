angular.module('OficinaService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Oficinas', ['$http',function($http) {
		var baseUrl = "http://ades-suciqroo.rhcloud.com";
        //var baseUrl = "http://10.10.35.44:3000";
        //var baseUrl = "http://localhost:3000";

		return {
			get : function() {
				return $http.get(baseUrl + '/api/oficinas');
			},
			findById : function(id) {
				return $http.get(baseUrl + '/api/oficinas/' + id);
			},
			create : function(oficinaData) {
				return $http.post(baseUrl + '/api/oficinas', oficinaData);
			},
			update : function(id,oficinaData) {
				return $http.put(baseUrl + '/api/oficinas/' + id, oficinaData);
			},
			delete : function(id) {
				return $http.delete(baseUrl + '/api/oficinas/' + id);
			},
			search : function(data) {
				return $http.post(baseUrl + '/api/oficinasSearch/', data);
			}
		}
	}]);