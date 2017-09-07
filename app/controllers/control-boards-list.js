"use strict";

app.controller('BoardsCrtl', function($scope, boardFactory, userFactory) {

	$scope.myBoards = [];

	let showMyBoards = () => {
		boardFactory.getUserBoards(userFactory.getCurrentUser())
		.then((data) => {
			$scope.myBoards = data;
			console.log("$scope.myBoards", $scope.myBoards);
		});
	};
	showMyBoards();

});