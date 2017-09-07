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

	let loginObjStorage = [];

	//register / logIn w/ Google  // checks if user email is already in the collection
	$scope.logInGoogle = () => {
		loginObjStorage.length = 0;
		userFactory.authWithProvider()
		.then((userObj) => {
			let newUserObj = createUserObj(userObj);
			addPhotoAfterLogin(userObj);
			loginObjStorage.push(newUserObj);  //store newUserObj so it's available below
			return newUserObj;
		})
		.then((newUserObj) => {
			let fbEmail = userFactory.getUserObj(newUserObj.email);
			return fbEmail;

		})
		.then((fbEmail) => {
			let fromFB = Object.keys(fbEmail.data);
			if(fromFB.length === 0) {
				userFactory.postUserObj(loginObjStorage[0]);

			}
		})
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
			clearUserPhoto();
			let user = userFactory.getCurrentUser();
			console.log("logOut successful", user);
		})
		.catch((error) => {
			console.log("logout error", error.message);
		});
	};

});

function addPhotoAfterLogin (userObj) {
  console.log("userObj photo", userObj.photoURL);
  $("#profile-image-anchor").append(
    `<img src="${userObj.user.photoURL}" id="profile-img" class="flex-sm-fill">`
  );
}
function clearUserPhoto (){
  $("#profile-image-anchor").empty();
}