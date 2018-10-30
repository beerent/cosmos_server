var ResponseBuilder = require("../response/ResponseBuilder.js");

class UserManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	AuthenticationRequest(query, callback) {
		var responseBuilder = new ResponseBuilder();
		var errors = this.errors;

		if (this.CredentialFieldsAreValid(query) == false) {
			responseBuilder.SetError(errors.INVALID_CREDENTIALS);
			callback(responseBuilder.Response());
			return;
		}

		this.GetUserByUsername(query.username, query.password, function (results) {
			if (results.length == 0) {
				responseBuilder.SetError(errors.INVALID_CREDENTIALS);
			}

			callback(responseBuilder.Response());
		});
	}

	CredentialFieldsAreValid(query) {
		return query.username != undefined && query.password != undefined;
	}

	GetUserByUsername(username, password, callback) {
		var params = [username, password];
		var sql = "select id, username, email from users where username = ? and password_salt = ?";
		this.dbm.ParameterizedQuery(sql, params, callback);
	}

	GetUserByEmail(username, password) {

	}
};

module.exports = UserManager;