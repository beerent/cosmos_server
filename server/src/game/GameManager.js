var ResponseBuilder = require("../response/ResponseBuilder.js");

class GameManager {

	constructor (dbm) {
		this.dbm = dbm;
	}

	CreateNewGame() {

	}

	HandleNewGameRequest(query, callback) {
		var responseBuilderImpl = new ResponseBuilder();
		var newGameData = {}; newGameData["game_id"] = 1;
		responseBuilderImpl.SetPayload(newGameData);
		callback(responseBuilderImpl.Response());
	}


};

module.exports = GameManager;