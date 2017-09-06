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

	return {getCurrentUser, isAuthenticated, logIn, logOut};

});


//connect logIn / Logout functions to the DOM