var ResponseBuilder = require("../response/ResponseBuilder.js");

class ChallengeManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	CreateNewChallenge(user_id, callback) {
		var responseBuilder = new ResponseBuilder();

		var sql = "insert into challenge_attempts (user_id) values (?)";
		var params = [user_id];
		this.dbm.ParameterizedInsert(sql, params, function(newChallengeId) {
			var newGameData = {}; 
			newGameData["game_id"] = newChallengeId;

			responseBuilder.SetPayload(newGameData);
			callback(responseBuilder.Response());
		});
	}

	HandleNewChallengeRequest(user_id, callback) {
		this.CreateNewChallenge(user_id, callback);	
	}
};

module.exports = ChallengeManager;