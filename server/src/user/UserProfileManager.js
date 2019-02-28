var ResponseBuilder = require("../response/ResponseBuilder.js");
var UserManager = require("../user/UserManager.js");
var ChallengeManager = require("../game/challenge/ChallengeManager.js");

class UserProfileManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleGetUserProfileRequest(req, res, responseBuilder) {
		var userManager = new UserManager(this.dbm);
		var challengeManager = new ChallengeManager(this.dbm);

		var self = this;
		if (!req.query.username) {
			responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
			return;
		}

		userManager.GetUserByUsername(req.query.username, function (user) {
			challengeManager.GetUserChallengeData(user.id, function(challengeData) {
				var gameData = {};
				gameData.challengeData = challengeData;
				responseBuilder.SetPayload(gameData);

				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();
			});
		});
	}
};


module.exports = UserProfileManager;