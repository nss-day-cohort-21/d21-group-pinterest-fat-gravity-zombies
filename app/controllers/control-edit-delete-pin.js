"use strict";

app.controller('addEditCtrl', function($scope, userFactory, $location, pinFactory, $routeParams) {

	$scope.title = "Add Pin";

	let currrentUser = userFactory.getCurrentUser();

	$scope.pin = {
		url: "",
		title: "",
		board: "",
		description: ""
	};

	const showEditPin = () => {
		pinFactory.getSinglePin($routeParams.itemId)
		.then((data) => {
			$scope.pin = data;
			$scope.pin.id = $routeParams.itemId;
			$scope.pin.uid = currrentUser;
		});
	};

	$scope.submitPin = () => {
		let obj = $scope.pin;
		console.log( "HELLO", obj, currrentUser );
		pinFactory.addPin(obj)
		.then((data) => {
			$location.path('/home');
			// $scope.$apply();
		});
	};

	showEditPin();

});
