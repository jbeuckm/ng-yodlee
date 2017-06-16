angular.module('ng-yodlee', [])
	.factory('YodleeService', ($http) => {

		const URL = "https://developer.api.yodlee.com/ysl";

		let cobrandName, cobSession, userSession;

		function encodeParams(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
		}

		function userGetRequest(resource) {
			return () => {
				return $http({
					method: 'GET',
				    url: URL+'/'+cobrandName+'/v1/'+resource,
				    headers: {
				    	'Content-Type': 'application/x-www-form-urlencoded',
				    	'Authorization': '{cobSession='+cobSession+',userSession='+userSession+'}'
					}
				})
					.catch(console.error);
			};
		}

		function userRequest(path, options) {

			options.url = URL+'/'+cobrandName+'/v1/'+path;

			options.headers = {
		    	'Content-Type': 'application/x-www-form-urlencoded',
		    	'Authorization': '{cobSession='+cobSession+',userSession='+userSession+'}'
			};

			return $http(options).catch(console.error);
		}

		return {
			setCobrandName: (name) => {
				cobrandName = name;
			},
			cobrand: {

				login: (cobrandLogin, cobrandPassword) => {

					return $http({
					    method: 'POST',
					    url: URL+'/'+cobrandName+'/v1/cobrand/login',
					    data: {
					    	cobrandLogin: cobrandLogin,
					    	cobrandPassword: cobrandPassword
					    },
					    transformRequest: encodeParams,
					    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					})
						.then((response) => {
							cobSession = response.data.session.cobSession;
						});
				}
			},
			user: {

				login: (loginName, password) => {

					return $http({
					    method: 'POST',
					    url: URL+'/'+cobrandName+'/v1/user/login',
					    data: {
					    	loginName: loginName,
					    	password: password
					    },
					    transformRequest: encodeParams,
					    headers: {
					    	'Content-Type': 'application/x-www-form-urlencoded',
					    	'Authorization': 'cobSession='+cobSession
						}
					})
						.then((response) => {
							console.log(response.data)
							userSession = response.data.user.session.userSession;
						})
						.catch(console.error);
				}

			},
			userRequest: userRequest,
			accounts: {
				accounts: userGetRequest('accounts'),
				historicalBalances: userGetRequest('accounts/historicalBalances')
			},
			holdings: {
				holdings: userGetRequest('holdings')
			},
			transactions: {
				transactions: userGetRequest('transactions')
			},
			derived: {
//				transactionSummary: userGetRequest('derived/transactionSummary'),
				holdingSummary: userGetRequest('derived/holdingSummary'),
				networth: userGetRequest('derived/networth')
				
			}
		};
	});

