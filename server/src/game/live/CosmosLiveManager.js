var ResponseBuilder = require("../../response/ResponseBuilder.js");
var UserManager = require("../../user/UserManager.js");

var LiveRound = require("./CosmosLiveSession.js");

class CosmosLiveManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleLiveDataRequest(req, res, responseBuilder) {
		var self = this;

		var payload = {
			cosmos_live_session : null,
			player : null,
			question : null
		};
		
		this.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			self.GetCurrentLiveRound(function(cosmosLiveSession) {
				if (cosmosLiveSession == null) {
					responseBuilder.SetError(self.errors.INVALID_COSMOS_LIVE_SESSION);
				} else {
					payload.cosmos_live_session = cosmosLiveSession.ToPayload();

					//self.GetPlayerType(round, user, function(playerType)) {
					//	player.user = user;
					//	player.type = playerType;
					//}
				}

				responseBuilder.SetPayload(payload);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();
			});
		});
	}

	GetCurrentLiveRound(callback) {
		var sql = "select id, state, start, asked_questions_ids, added from cosmos_live_sessions order by id desc limit 1";
		this.dbm.Query(sql, function(results, err){
			var liveRound = null;
			if (results.length > 0) {
				var row = results[0];
				liveRound = new LiveRound(row.id, row.state, row.start, row.asked_questions_ids, row.added);
			}

			callback(liveRound);
		});
	}

	GetPlayerType(round, user, callback) {
		IsPlayerActive(round, user, function(isActive) {
			// select all correct answers for this user in this round.
			// if the number of correct answers == round # - 1, then they're active.
		});
	}

	HandleRequestWithAuth(req, res, responseBuilder, callback) {
		var userManager = new UserManager(this.dbm);

		var self = this;
		if (userManager.CredentialFieldsAreValid(req.query) == false) {
			responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
			return;
		}

		userManager.GetUserFromCredentials(req.query.username, req.query.password, function(user) {
			if (undefined == user) {
				responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();				
			} else {
				callback(user);
			}
		});
	}
}

module.exports = CosmosLiveManager;