angular.module('DoctorService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Doctores', ['$http',function($http) {
		//var baseUrl = "http://ades-suciqroo.rhcloud.com";
        //var baseUrl = "http://10.10.35.44:3000";
        var baseUrl = "http://localhost:3000";

		return {
			get : function() {
				return $http.get(baseUrl + '/api/doctores');
			},
			findById : function(id) {
				return $http.get(baseUrl + '/api/doctores/' + id);
			},
			create : function(doctorData) {
				return $http.post(baseUrl + '/api/doctores', doctorData);
			},
			update : function(id,doctorData) {
				return $http.put(baseUrl + '/api/doctores/' + id, doctorData);
			},
			delete : function(id) {
				return $http.delete(baseUrl + '/api/doctores/' + id);
			},
			search : function(data) {
				return $http.post(baseUrl + '/api/doctoresSearch/', data);
			}
		}
	}]);