angular.module('MainService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Main', ['$rootScope', '$http', '$localStorage', function($rootScope, $http, $localStorage){
        //$rootScope.baseUrl = "http://ades-suciqroo.rhcloud.com";
        $rootScope.baseUrl = "http://10.10.35.44:3000";
        //$rootScope.baseUrl = "http://192.168.1.132:3000";
        //$rootScope.baseUrl = "http://localhost:3000";
        var baseUrl = $rootScope.baseUrl;

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            // save: function(data, success, error) {
            //     $http.post(baseUrl + '/api/signin', data).success(success).error(error)
            // },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/api/authenticate', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/api/me').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                //delete $localStorage.privilegios;
                success();
            }
        };
    }

]);