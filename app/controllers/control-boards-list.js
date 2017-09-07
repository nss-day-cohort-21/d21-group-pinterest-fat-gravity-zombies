"use strict";

app.controller('BoardsCtrl', function($scope, boardFactory, userFactory, pinFactory, $location, $routeParams) {

	$scope.myBoards = [];

	let showMyBoards = () => {
		boardFactory.getUserBoards(userFactory.getCurrentUser())
		.then((data) => {
			$scope.myBoards = data;
			console.log("$scope.myBoards", $scope.myBoards);
		});
	};

	let showSingleBoards = () => {
		boardFactory.getSingleBoard($routeParams.id)
		.then(board => {
			$scope.boardTitle = board.title;
		});
	};

	$scope.deleteBtn = (pinId) => {
		pinFactory.deletePin(pinId);
		$location.path('/MyPinsView');
		$scope.$apply();

	};

	showMyBoards();

});