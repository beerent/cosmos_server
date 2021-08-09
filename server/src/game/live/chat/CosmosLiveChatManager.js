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

	GetLiveChats(session, callback) {
		var sql = "select u.id, u.username, u.email, u.access_level, message, TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP, clc.added)) seconds_ago from cosmos_live_chat clc join cosmos_live_sessions cls on clc.session_id = cls.id join users u on clc.user_id = u.id join privileges_enum pe on u.access_level = pe.id where cls.id = ? order by clc.added desc";
		var params = [session.GetId()];

		var chats = [];
		this.dbm.ParameterizedQuery(sql, params, function(queryResults, err) {
			queryResults.forEach(function (entry) {
				var user = {};
				user.id = entry.id;
				user.username = entry.username;
				user.email = entry.email;
				user.access_level = entry.access_level;

				var message = entry.message;
				var seconds_ago = entry.seconds_ago;

				var cosmos_live_chat_entry = new CosmosLiveChatEntry(session, user, message, seconds_ago);

				chats.push(cosmos_live_chat_entry.ToPayload());
			});
	
			callback(chats);
		});
	}
}

module.exports = CosmosLiveChatManager;