"use strict";
app.controller('pinsListCtrl', function ($scope, pinFactory, boardFactory) {

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

	showAllPins();
});