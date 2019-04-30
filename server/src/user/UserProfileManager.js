var ResponseBuilder = require("../response/ResponseBuilder.js");
var UserManager = require("../user/UserManager.js");
var ChallengeManager = require("../game/challenge/ChallengeManager.js");

class UserProfileManager {

	constructor (dbm, errors, privileges) {
		this.dbm = dbm;
		this.errors = errors;
		this.privileges = privileges;
	}

	HandleGetUserProfileRequest(req, res, responseBuilder) {
		var userManager = new UserManager(this.dbm);
		var challengeManager = new ChallengeManager(this.dbm, this.errors, this.privileges);

		var self = this;
		if (!req.query.username) {
			responseBuilder.SetError(self.errors.GET_USER_PROFILE_MISSING_SPECIFIER);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
			return;
		}

		userManager.GetUserByUsername(req.query.username, function (user) {
			if (user == undefined) {
				responseBuilder.SetError(self.errors.GET_USER_PROFILE_INVALID_SPECIFIER);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();
				return;
			}
		
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