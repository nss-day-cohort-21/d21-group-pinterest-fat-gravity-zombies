"use strict";

app.controller('userCtrl', function($scope, userFactory) {

	//empty object to pull email and password input from ng-model
	$scope.userCreds = {
		email: '',
		password: ''
	};

	//returns an object with user information to post to the FB user collection
	let createUserObj = (loginObj) => {
		return {
			email: loginObj.user.email,
			name: loginObj.user.displayName,
			uid: loginObj.user.uid,
			photoURL: loginObj.user.photoURL
		};
	};


	let storage = [];
	//register / logIn w/ Google
	$scope.logInGoogle = () => {
		storage.length = 0;
		userFactory.authWithProvider()
		.then((userObj) => {
			let newUserObj = createUserObj(userObj);
			storage.push(newUserObj);
			console.log("newUSerObj", newUserObj);
			// console.log("storage", storage);

			return newUserObj;
		})
		.then((newUserObj) => {
			console.log("newUserObj email", newUserObj.email);
			let fbEmail = userFactory.getUserObj(newUserObj.email);
			// console.log("fbEmail", fbEmail);
			return fbEmail;

		})
		.then((fbEmail) => {
			let fromFB = Object.keys(fbEmail.data);
			console.log("fbEmail--WORK?", fromFB);	
			if(fromFB.length === 0) {
				console.log("fromFB.length is 0");
				userFactory.postUserObj(storage[0]);

			}  else  {
				console.log("NO" );
			}
		})
			// userFactory.getUserObj(newUserObj.email)
			// .then((data) => {
			// 	if (data === {}) {
			// 		userFactory.postUserObj(newUserObj);
			// 	}
			// });

		.catch((error) => {
			console.log("error from $scope.logInGoogle", error.message);
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