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
		.then(() => {
			console.log("log in with google successful");
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
			$scope.login();
		})
		.catch((error) => {
			console.log("error from $scope.register()", error.code, error.message);
		});

	};

	//log in using email/password input values, for now, prints success message ot the DOM
	$scope.logIn = () => {
		userFactory.logIn($scope.userCreds)
		.then(() => {
			console.log("$scope.logIn successful");
		})
		.catch((error) => {
			console.log("error from $scope.logIn", error.code, error.message);
		});
	};

});