"use strict";

const app = angular.module('Pinterest', ['ngRoute']);

app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL,
		projectId: creds.projectId,
		storageBucket: creds.storageBucket,
		messagingSenderId: creds.messagingSenderId
	};
	firebase.initializeApp(authConfig);
});

// app.config(($routeProvider) => {
// 	$routeProvider
// 	.when('/', {
// 		templateUrl: 'partials/user-view.html',
// 		controller: 'testControl'
// 	});
// });