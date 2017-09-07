"use strict";

app.controller('BoardsCtrl', function($scope, boardFactory, userFactory, pinFactory, $location) {

	$scope.myBoards = [];

	let showMyBoards = () => {
		boardFactory.getUserBoards(userFactory.getCurrentUser())
		.then((data) => {
			$scope.myBoards = data;
			console.log("$scope.myBoards", $scope.myBoards);
		});
	};

	$scope.deleteBtn = (pinId) => {
		pinFactory.deletePin(pinId);
		$location.path('/MyPinsView');
		$scope.$apply();

	};

	showMyBoards();

});

app.controller('SingleBoardCtrl', function($scope, pinFactory, boardFactory, $routeParams) {

	$scope.myPins = [];

	let showSingleBoard = () => {
		boardFactory.getSingleBoard($routeParams.id)
		.then(board => {
			$scope.boardTitle = board.title;
			console.log("$scope.boardTitle", $scope.boardTitle);
		});
	};

	let showPinsOnBoard = () => {
		console.log("route params id", $routeParams.id);
		pinFactory.getPinsFromBoard($routeParams.id)
		.then(pins => {
			$scope.myPins = pins;
			console.log("scope my pins", $scope.myPins);
		});
	};

	showSingleBoard();
	showPinsOnBoard();

});