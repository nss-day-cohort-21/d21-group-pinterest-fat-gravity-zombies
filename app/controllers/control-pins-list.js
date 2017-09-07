"use strict";
app.controller('pinsListCtrl', function ($scope, pinFactory) {

	$scope.pinsData = [];

	const showAllPins = () => {
		pinFactory.getAllPins()
			.then((data) => {
				$scope.pinsData = data;
				console.log("data from pinsData", $scope.pinsData);
			});
	};

	showAllPins();
});