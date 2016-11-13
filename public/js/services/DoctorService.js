angular.module('DoctorService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Doctores', ['$rootScope', '$http',function($rootScope, $http) {
        var baseUrl = $rootScope.baseUrl;
        var nameUrl = '/api/doctores'

		return {
			query : function(data) {
				return $http.post(baseUrl + nameUrl + '/query/', data);
			},
			findById : function(id) {
				return $http.get(baseUrl + nameUrl + '/' + id);
			},
			create : function(data) {
				return $http.post(baseUrl + nameUrl, data);
			},
			update : function(id,data) {
				return $http.put(baseUrl + nameUrl + '/' + id, data);
			},
			delete : function(id) {
				return $http.delete(baseUrl + nameUrl + '/' + id);
			}
		}
	}]);