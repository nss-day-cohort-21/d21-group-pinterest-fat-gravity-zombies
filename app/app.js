'use strict';

const app = angular.module('Pinterest', ['ngRoute']);

let isAuth = (userFactory) => new Promise((resolve, reject) => {
	console.log( "userFactory is", userFactory );
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			console.log( "YOU GOOD" );
			resolve();
		}  else  {
			console.log( "YOU ARE NOT AUTHORIZED" );
			reject();
		}
	});
});

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		//the initial view will be a login screen
		templateUrl: 'partials/register-login.html',
		controller: 'userCtrl',
		// resolve: {isAuth}  
	})
	.when('/home', {
		templateUrl: 'partials/pins-view.html',
		controller: 'pinsListCrtl',
		resolve:{isAuth}
	})
	.otherwise('/');
});

//starts app with firebase credentials from ./app/values/fb-creds.js
app.run(($location, FBCreds) => {
	firebase.initializeApp(FBCreds);
});