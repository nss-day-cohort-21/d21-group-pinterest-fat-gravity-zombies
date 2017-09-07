"use strict";

app.controller('addEditCtrl', function($scope, userFactory, $location, pinFactory, $routeParams) {

	$scope.title = "Add Pin";

	let currrentUser = userFactory.getCurrentUser();

	$scope.pin = {
		url: "",
		title: "",
		board: "",
		description: "",
		uid: currrentUser
	};

	const showEditPin = () => {
		pinFactory.getSinglePin($routeParams.itemId)
		.then((data) => {
			$scope.pin = data;
			$scope.pin.id = $routeParams.itemId;
		});
	};

	$scope.submitPin = () => {
		let obj = $scope.pin;
		console.log( $scope.pin, currrentUser );
		pinFactory.addPin(obj)
		.then((data) => {
			$location.path('/home');
			// $scope.$apply();
		});
	};

	showEditPin();

});
