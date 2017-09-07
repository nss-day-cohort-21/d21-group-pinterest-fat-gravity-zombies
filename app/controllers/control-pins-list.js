"use strict";

app.controller('pinsListCtrl', function ($scope, pinFactory) {

	let pinsData = [];

	const showAllPins = () => {
		pinFactory.getAllPins()
			.then((data) => {
				console.log("data from showAllPins", data);
			});
	};

	showAllPins();

});