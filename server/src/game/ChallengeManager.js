var ResponseBuilder = require("../response/ResponseBuilder.js");

class ChallengeManager {

	constructor (dbm) {
		this.dbm = dbm;
	}

	CreateNewGame() {

	}

	HandleNewChallengeRequest(query, callback) {
		var responseBuilderImpl = new ResponseBuilder();
		var newGameData = {}; newGameData["game_id"] = 1;
		responseBuilderImpl.SetPayload(newGameData);
		callback(responseBuilderImpl.Response());
	}


};

module.exports = ChallengeManager;