"use strict";
console.log( "factory-board-data.js" );

app.factory("boardFactory", function($q, $http, FBCreds) {

	const getAllBoards = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/boards.json`)
			.then((allBoards) => {
				resolve(allBoards.data);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const getUserBoards = (user) => {
		let userBoardsArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}"`)
		.then((userBoardsObj) => {
			let userBoards = userBoardsObj.data;
			console.log( "userBoards", userBoards );
			Object.keys(userBoards)
			.forEach((key) => {
				userBoards[key].id = key;
				userBoardsArray.push(userBoards[key]);
			});
			resolve(userBoardsArray);
		})
		.catch((error) => {
			console.log( "error", error );
			reject(error);
		});
	  });
	};

	const getSingleBoard = (boardID) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/boards/${boardID}.json`)
			.then((boardObj) => {
				console.log( "boardObj", boardObj.data );
				resolve(boardObj.data);
			})
			.catch((error) => {
				console.log( "error", error );
				reject(error);
			});

		});
	};

	const addBoard = (obj) => {
		let newObj = JSON.stringify(obj);
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/boards.json`, obj)
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

	const editBoard = (boardID, obj) => {
		return $q((resolve, reject) => {
			let newObj = JSON.stringify(obj);
			$http.patch(`${FBCreds.databaseURL}/boards/${boardID}.json`, newObj)
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

	const deleteBoard = (boardID) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/boards/${boardID}.json`)
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
	return{getAllBoards, getUserBoards, getSingleBoard, addBoard, editBoard, deleteBoard};
});