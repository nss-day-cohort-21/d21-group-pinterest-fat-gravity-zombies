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
		controller: 'userCtrl'
		// resolve: {isAuth}
	})
	.when('/home', {
		//the first view when the user logs in
		templateUrl: 'partials/pins-view.html',
		controller: 'pinsListCtrl',
		resolve: {isAuth}

	})
	.when('/new-board', {
		templateUrl: 'partials/new-board.html',
		controller: 'BoardsCtrl',
		resolve: {isAuth}
	})
	.when('/new-pin', {
		templateUrl: 'partials/new-pin.html',
		controller: 'myPinsListCtrl',
		resolve: {isAuth}
	})
	.when('/MyBoards', {
		templateUrl: 'partials/boards-view.html',
		controller: 'BoardsCtrl',
		resolve:{isAuth}
	})
	.when('/board/:id', {
		templateUrl: 'partials/single-board-view.html',
		controller: 'SingleBoardCtrl',
		resolve: {isAuth}
	})
	.when('/MyPinsView', {
		templateUrl: 'partials/my-pins-view.html',
		controller: 'myPinsListCtrl',
		resolve:{isAuth}
	})
	.when('/MyProfile', {
		templateUrl: 'partials/profile.html',
		controller: 'myProfileCtrl',
		resolve:{isAuth}
	})
	.when('/pin/:itemId/add', {
		templateUrl: 'partials/save-edit-pin-form.html',
		controller: 'addEditCtrl',
		resolve:{isAuth}
	})
	.otherwise('/');
});

//starts app with firebase credentials from ./app/values/fb-creds.js
app.run(($location, FBCreds) => {
	firebase.initializeApp(FBCreds);
});