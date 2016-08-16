angular.module('PrivilegioService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Privilegios', ['$http',function($http) {
		var baseUrl = "http://ades-suciqroo.rhcloud.com";
        //var baseUrl = "http://10.10.35.44:3000";
        //var baseUrl = "http://localhost:3000";

		return {
			get : function() {
				return $http.get(baseUrl + '/api/privilegios');
			},
			findById : function(id) {
				return $http.get(baseUrl + '/api/privilegios/' + id);
			},
			create : function(privilegioData) {
				return $http.post(baseUrl + '/api/privilegios', privilegioData);
			},
			update : function(id,privilegioData) {
				return $http.put(baseUrl + '/api/privilegios/' + id, privilegioData);
			},
			delete : function(id) {
				return $http.delete(baseUrl + '/api/privilegios/' + id);
			},
			search : function(data) {
				return $http.post(baseUrl + '/api/privilegiosSearch/', data);
			}
		}
	}]);