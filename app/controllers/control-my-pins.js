"use strict";
app.controller('myPinsListCtrl', function ($scope, pinFactory, boardFactory, userFactory, FilterFactory, $location) {
	$scope.searchText = FilterFactory;
	let user = userFactory.getCurrentUser();

	$scope.pinsData = [];
	$scope.boardsData = [];

	$scope.pin = {
		title: '',
		description: '',
		board: '',
		url: '',
		uid: user
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

	$scope.showMyPins();

	$scope.createPin = () => {
		pinFactory.addPin($scope.pin)
			.then(() => {
				$location.url('/MyPinsView');
				$scope.showMyPins();
			});
	};

	$scope.deleteBtnPin = (pinId) => {
		pinFactory.deletePin(pinId)
			.then(() => {
	            $scope.showMyPins();
	        });
		};

});