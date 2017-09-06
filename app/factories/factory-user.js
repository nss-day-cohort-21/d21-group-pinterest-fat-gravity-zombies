"use strict";

app.factory('userFactory', function($q, $http) {

	let currentUser = null;

	let googleProvider = new firebase.auth.GoogleAuthProvider();

	let getCurrentUser = function () {
		return currentUser;
	};

	//checks to see if user is authenticated, reolves true or false
	let isAuthenticated = function () {
		return $q((resolve, reject) => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					currentUser = user.uid;
					resolve(true);
				} else {
					reject(false);
				}
			});
		});
	};

	//logs user in with email, sent to login function in userCtrl
	let logIn = function(userCreds) {
		return firebase.auth().signInWithEmailAndPassword(userCreds.email, userCreds.password);
	};

	//logs user in with password, sent to login function in userCtrl
	let logOut = function() {
		return firebase.auth().signOut();
	};

	//registers user with email and password, sent to login function in userCtrl
	let register = function(userCreds) {
		return firebase.auth().createUserWithEmailAndPassword(userCreds.email, userCreds.password);
	};

	//sign in with google
	let authWithProvider = function() {
		return firebase.auth().signInWithPopup(googleProvider);
	};

	return {getCurrentUser, isAuthenticated, logIn, logOut, register, authWithProvider};

});


//connect logIn / Logout functions to the DOM