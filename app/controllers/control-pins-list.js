"use strict";
app.controller('pinsListCtrl', function ($scope, pinFactory, boardFactory, userFactory) {

	let user = userFactory.getCurrentUser();

	$scope.pinsData = [];
	$scope.boardsData = [];

	const showAllPins = () => {
		pinFactory.getAllPins()
			.then((data) => {
				$scope.pinsData = data;
				console.log("data from pinsData", $scope.pinsData);
			});
		boardFactory.getAllBoards()
			.then((data) => {
				$scope.boardsData = data;
				console.log("boards data from showAllPins", data);
			});
	};

	const showMyPins = () => {
		pinFactory.getUserPins(userFactory.getCurrentUser())
			.then((data) => {
				$scope.pinsData = data;
			});
		boardFactory.getAllBoards()
			.then((data) => {
				$scope.boardsData = data;
			});
	};

	showMyPins();
});