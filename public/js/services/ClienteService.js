angular.module('ClienteService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Clientes', ['$http',function($http) {
		var baseUrl = "http://ades-suciqroo.rhcloud.com";
        //var baseUrl = "http://10.10.35.44:3000";
        //var baseUrl = "http://localhost:3000";

		return {
			get : function() {
				return $http.get(baseUrl + '/api/clientes');
			},
			findById : function(id) {
				return $http.get(baseUrl + '/api/clientes/' + id);
			},
			create : function(clienteData) {
				return $http.post(baseUrl + '/api/clientes', clienteData);
			},
			update : function(id,clienteData) {
				return $http.put(baseUrl + '/api/clientes/' + id, clienteData);
			},
			delete : function(id) {
				return $http.delete(baseUrl + '/api/clientes/' + id);
			},
			search : function(data) {
				return $http.post(baseUrl + '/api/clientesSearch/', data);
			}
		}
	}]);