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

	StoreLiveChat(session, user, message, callback) {
		var sql = "insert into cosmos_live_chat (session_id, user_id, message, added) values (?, ?, ?, utc_timestamp())";
		var params = [session.GetId(), user.id, message];
		this.dbm.ParameterizedInsert(sql, params, function(results, err) {
			callback(err == null);
		});
	}
}

module.exports = CosmosLiveChatManager;