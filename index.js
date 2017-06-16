angular.module('ng-yodlee', [])
	.factory('YodleeService', function($http){

		const URL = "https://developer.api.yodlee.com/ysl";

		function encodeParams(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
		}

		return {
			cobrand: {
				login: function(options) {
					console.log(options);

					$http({
					    method: 'POST',
					    url: URL+'/restserver/v1/cobrand/login',
					    data: options,
					    transformRequest: encodeParams,
					    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					})
						.then(console.log)
						.catch(console.error);
				}
			}
		};
	});

