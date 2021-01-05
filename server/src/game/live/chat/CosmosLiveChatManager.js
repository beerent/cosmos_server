var CosmosLiveChatEntry = require("./CosmosLiveChatEntry.js");
var UserManager = require("../../../user/UserManager.js");
var CosmosLiveManager = require("../CosmosLiveManager.js");

class CosmosLiveChatManager {

	constructor (dbm, errors, privileges) {
		this.dbm = dbm;
		this.errors = errors;
		this.privileges = privileges;
	}

	IsValidLivePostChatRequest(query) {
		var message = query.message;
		return message != undefined && message.length > 0;
	}

	HandleLivePostChat(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var cosmos_live_manager = new CosmosLiveManager(this.dbm, this.errors, this.privileges);

		var self = this;

		user_manager.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			if (!self.IsValidLivePostChatRequest(req.query)) {
				responseBuilder.SetError(self.errors.INVALID_LIVE_POST_CHAT_REQUEST);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();
				return;
			}

			cosmos_live_manager.GetCurrentCosmosLiveSession(function(cosmos_live_session) {
				if (!cosmos_live_session) {
					responseBuilder.SetError(self.errors.INVALID_COSMOS_LIVE_SESSION);
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
					return;
				}

				self.StoreLiveChat(cosmos_live_session, user,req.query.message, function(success) {
					if (!success) {
						responseBuilder.SetError(self.errors.LIVE_POST_CHAT_FAILED_SAVE);
					}

					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
				});
			});
		});
	}

	StoreLiveChat(session, user, message, callback) {
		var sql = "insert into cosmos_live_chat (session_id, user_id, message, added) values (?, ?, ?, utc_timestamp())";
		var params = [session.GetId(), user.id, message];
		this.dbm.ParameterizedInsert(sql, params, function(results, err) {
			callback(err == null);
		});
	}
}

module.exports = CosmosLiveChatManager;