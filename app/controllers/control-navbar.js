"use strict";

app.controller('NavCtrl', function ($scope, $location, pinFactory, FilterFactory) {
	$scope.searchText = FilterFactory;

	$scope.addPin = () => {
		console.log("addPin firing");
		$location.path('/new-pin');
	};

});