"use strict";
console.log( "factory-data.js" );

app.factory("pinFactory", function($q, $http, FBCreds) {

	const getAllPins = () => {
		let allPinsArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json`)
			.then((allPinObject) => {
				let allPins = allPinObject.data;
				console.log( "allPins", allPins );
				Object.keys(allPins)
				.forEach((key) => {
					allPins[key].id = key;
					allPinsArray.push(allPins[key]);
				});
				resolve(allPinsArray);
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};

	const getUserPins = (user) => {
		let userPinsArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${user}"`)
			.then((userPinsObj) => {
				console.log( "user", user );
				console.log( "userPinsObj", userPinsObj );
				let userPins = userPinsObj.data;
				Object.keys(userPins)
				.forEach((key) => {
					userPins[key].id = key;
					userPinsArray.push(userPins[key]);
				});
				console.log( "userPinsArray", userPinsArray );
				resolve(userPinsArray);
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};
 	
 	const getSinglePin = (pinID) => {
 		return $q((resolve,reject) => {
 			$http.get(`${FBCreds.databaseURL}/pins/${pinID}.json`)
 			.then((pinObj) => {
 				console.log( "pinObj.data", pinObj.data );
 				resolve(pinObj.data);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};

 	const addPin = (obj) => {
		let newObj = JSON.stringify(obj);
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/pins.json`)
			.then((data) => {
				console.log( "data", data );
				resolve(data);
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});
		});
	};

 	const editPin = (pinID, obj) => {
 		return $q((resolve, reject) => {
 			let newObj = JSON.stringify(obj);
 			$http.patch(`${FBCreds.databaseURL}/pins/${pinID}.json`, newObj)
 			.then((data) => {
 				console.log( "data", data );
 				resolve(data);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};
 
 	const deletePin = (pinID) => {
 		return $q((resolve, reject) => {
 			$http.delete(`${FBCreds.databaseURL}/pins/${pinID}.json`)
 			.then((response) => {
 				console.log( "response", response );
 				resolve(response);
 			})
 			.catch((error) => {
 				console.log( "error", error );
 				reject(error);
 			});
 		});
 	};
 	return{getAllPins, getSinglePin, addPin, editPin, deletePin, getUserPins};
});