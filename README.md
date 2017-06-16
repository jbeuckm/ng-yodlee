# ng-yodlee

An angular service to consume the Yodlee API.

### Installation

`npm i https://github.com/jbeuckm/ng-yodlee.git --save`

`<script src="./node_modules/ng-yodlee/index.js"></script>`

```javascript
angular.module('myApp', ['ng-yodlee'])
  .controller('MyController', (YodleeService) => {
    ...
```

### Usage

These are essential steps to connect your "Cobrand" account and access a user's data.

```javascript
YodleeService.setCobrandName(cobrand_name);

YodleeService.cobrand.login(cobrand_login, cobrand_password)
  .then(() => {
    YodleeService.user.login(user_name, user_password);
  });
```

At this point, the service is able to make requests for that user's data.

```javascript
YodleeService.accounts.accounts();
YodleeService.accounts.historicalBalances();
					
YodleeService.transactions.transactions();
YodleeService.holdings.holdings();

YodleeService.derived.networth();
YodleeService.derived.holdingSummary();
```

These requests all return promises that resolve with the associated responses.

