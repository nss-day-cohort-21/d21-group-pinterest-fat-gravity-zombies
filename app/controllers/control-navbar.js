"use strict";

app.controller('NavCtrl', function ($scope, pinFactory, FilterFactory) {
	$scope.searchText = FilterFactory;
	console.log("the search", $scope.searchText.search);
});