"use strict";
app.controller('myPinsListCtrl', function ($scope, pinFactory, boardFactory, userFactory, FilterFactory) {
	$scope.searchText = FilterFactory;
	let user = userFactory.getCurrentUser();

	$scope.pinsData = [];
	$scope.boardsData = [];

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

	$scope.showMyPins();

});