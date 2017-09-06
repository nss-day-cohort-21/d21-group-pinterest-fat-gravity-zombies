"use strict";

app.controller('userCtrl', function($scope, userFactory) {

	//empty object to pull email and password input from ng-model
	$scope.userCreds = {
		email: '',
		password: ''
	};

	//register / logIn w/ Google
	$scope.logInGoogle = () => {
		userFactory.authWithProvider()
		.then((userObj) => {
			// let user = userFactory.getCurrentUser();
			console.log("log in google successful", userObj);
		})
		.catch((error) => {
			console.log("error from $scope.logInGoogle", error.code, error.message);
		});
	};

	//register using email/password input values then proceed to $scope.login
	$scope.register = () => {
		userFactory.register({
			email: $scope.userCreds.email,
			password: $scope.userCreds.password
		})
		.then((userData) => {
			$scope.logIn();
		})
		.catch((error) => {
			console.log("email/password values", $scope.userCreds.email, $scope.userCreds.password);
			console.log("error from $scope.register()", error.code, error.message);
		});

	};

	//log in using email/password input values, for now, prints success message ot the DOM
	$scope.logIn = () => {
		userFactory.logIn($scope.userCreds)
		.then((userObj) => {
			console.log("$scope.logIn successful", userObj);
		})
		.catch((error) => {
			console.log("error from $scope.logIn", error.code, error.message);
		});
	};

	//log out
	$scope.logOut = () => {
		userFactory.logOut()
		.then(() => {
			let user = userFactory.getCurrentUser();
			console.log("logOut successful", user);
		})
		.catch((error) => {
			console.log("logout error", error.message);
		});
	};

});