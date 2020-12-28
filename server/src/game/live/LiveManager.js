var ResponseBuilder = require("../../response/ResponseBuilder.js");
var UserManager = require("../../user/UserManager.js");

var LiveRound = require("./LiveRound.js");

class LiveManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleLiveDataRequest(req, res, responseBuilder) {
		var self = this;
		
		this.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			self.GetCurrentLiveRound(function(round) {
				if (round == null) {
					responseBuilder.SetError(self.errors.INVALID_LIVE_ROUND);
				} else {
					responseBuilder.SetPayload(round);
				}

				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();
			});
		});
	}

	GetCurrentLiveRound(callback) {
		var sql = "select id, state, start, added from live_rounds order by id desc limit 1";
		this.dbm.Query(sql, function(results, err){
			var liveRound = null;
			if (results.length > 0) {
				var row = results[0];
				liveRound = new LiveRound(row.id, row.state, row.start, row.added);
			}

			callback(liveRound);
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

module.exports = LiveManager;