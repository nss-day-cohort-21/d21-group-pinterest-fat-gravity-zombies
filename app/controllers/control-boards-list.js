"use strict";

app.controller('BoardsCrtl', function($scope, boardFactory, userFactory, pinFactory) {

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