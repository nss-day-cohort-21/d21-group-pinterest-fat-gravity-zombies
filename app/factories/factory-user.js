"use strict";

app.factory('userFactory', function($q, $http) {

	let currentUser = null;

	let googleProvider = new firebase.auth.GoogleAuthProvider();

	let getCurrentUser = function () {
		return currentUser;
	};

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

	let logIn = function(user) {
		return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
	};

	let logOut = function() {
		return firebase.auth().signOut();
	};

	let register = function(userCreds) {
		return firebase.auth().createUserWithEmailAndPassword(userCreds.email, userCreds.password);
	};

	let authWithProvider = function() {
		return firebase.auth().signInWithPopup(googleProvider);
	};

	return {getCurrentUser, isAuthenticated, logIn, logOut, register, authWithProvider};

});


//connect logIn / Logout functions to the DOM