"use strict";

const app = angular.module('Pinterest', ['ngRoute']);

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/register-login.html',
		controller: 'userCtrl'
	})
	.otherwise('/');
});

//starts app with firebase credentials from ./app/values/fb-creds.js
app.run(($location, FBCreds) => {
	firebase.initializeApp(FBCreds);
});

//create userCtrl
//create dummy text on register-login.html
//create isAuthenticated
//
