"use strict";
app.controller('pinsListCtrl', function ($scope, pinFactory, boardFactory, FilterFactory, userFactory) {
	$scope.searchText = FilterFactory;

	let user = userFactory.getCurrentUser();

	$scope.pinsData = [];
	$scope.boardsData = [];

	$scope.showAllPins = () => {
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

	$scope.showMyPins = () => {
		console.log("showMyPins firing");
		pinFactory.getUserPins(userFactory.getCurrentUser())
			.then((data) => {
				$scope.pinsData = data;
			});
		boardFactory.getAllBoards()
			.then((data) => {
				$scope.boardsData = data;
			});
	};

	$scope.showAllPins();



});