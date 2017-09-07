"use strict";

app.controller('BoardsCrtl', function($scope, boardFactory, $location, pinFactory) {

	$scope.deleteBtn = (pinId) => {
		pinFactory.deletePin(pinId);
		$location.path('/MyPinsView');
		$scope.$apply();

	};

});