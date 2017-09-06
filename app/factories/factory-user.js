"use strict";

app.factory('userFactory', function($q, $http, FBCreds) {

	let currentUser = null;

	let googleProvider = new firebase.auth.GoogleAuthProvider();

	let userEmailFromFB = {};

	let getCurrentUser = function () {
		return currentUser;
	};

	let getUserEmailFromFB = function () {
		return userEmailFromFB;
	};

	//checks to see if user is authenticated, resolves true or false
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

	//checks to see if userEmail already exists in the user collection, called in userCtrl-> logInGoogle
	let getUserObj = (userEmail) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users.json?orderBy="email"&equalTo="${userEmail}"`)
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				console.log("error", error);
				reject(error);
			});
		});

	};

	//if userEmail is not already in user collection, posts userObj, called as condition in userCtrl -> logInGoogle
	let postUserObj = function(userObj) {
		let newUserObj = JSON.stringify(userObj);
		$http.post(`${FBCreds.databaseURL}/users.json`, userObj)
		.then((data) => {
            console.log( "data", data );
            return (data);
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log( "error", errorCode, errorMessage );
        });
	};

	//logs user in with email, sent to login function in userCtrl
	let logIn = function(userCreds) {
		return firebase.auth().signInWithEmailAndPassword(userCreds.email, userCreds.password);
	};

	//logs user in with password, sent to login function in userCtrl
	let logOut = function() {
		console.log("factoryLogOut firing");
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

	return {getCurrentUser, isAuthenticated, getUserObj, postUserObj, logIn, logOut, register, authWithProvider};

});


//connect logIn / Logout functions to the DOM