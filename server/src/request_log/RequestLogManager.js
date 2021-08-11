var ResponseBuilder = require("../response/ResponseBuilder.js");
var UserManager = require("../user/UserManager.js");

class RequestLogManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleLogRequest(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var self = this;
		
		if (user_manager.CredentialFieldsAreValid(req.query)) {
			user_manager.GetUserFromCredentials(req.query.uid, req.query.username, req.query.password, function(user) {
				var user_id = null;
				if (user != null && user != undefined) {
					user_id = user.id;
				}
				self.LogRequest(user_id, req._parsedUrl.pathname, req._parsedUrl.search);
			});
		} else {
			self.LogRequest(null, req._parsedUrl.pathname, req._parsedUrl.search);
		}
	}

	LogRequest(user_id, endpoint, parameters) {
		var sql = "insert into request_log (user_id, request_endpoint, request_parameters) values (?, ?, ?)";
		var params = [user_id, endpoint, parameters];
		this.dbm.ParameterizedInsert(sql, params, function(insert_id, err) {});
	}
}

module.exports = RequestLogManager;