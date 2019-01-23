var ResponseBuilder = require("../response/ResponseBuilder.js");

class UserManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleAuthenticationRequest(req, res) {
		var self = this;
		this.AuthenticationRequest(req.query, function(response) {
			response.request = "authenticate";
			res.json(response);
			res.end();
			self.dbm.Close();
		});
	}

	AuthenticationRequest(query, callback) {
		var responseBuilder = new ResponseBuilder();
		var errors = this.errors;

		if (this.CredentialFieldsAreValid(query) == false) {
			responseBuilder.SetError(errors.INVALID_CREDENTIALS);
			callback(responseBuilder.Response());
			return;
		}

		this.GetUserFromCredentials(query.username, query.password, function (userObject) {
			if (userObject == undefined) {
				responseBuilder.SetError(errors.INVALID_CREDENTIALS);
			}

			callback(responseBuilder.Response());
		});
	}

	CredentialFieldsAreValid(query) {
		return query.username != undefined && query.password != undefined;
	}

	GetUserFromCredentials(username, password, callback) {
		var params = [username, password];
		var sql = "select id, username, email from users where username = ? and password_salt = ?";
		this.dbm.ParameterizedQuery(sql, params, function(queryResults, err) {
			if (err || queryResults.length == 0) {
				var user = undefined;
				callback(user);
				return;
			}

			var user = {};
			user.id = queryResults[0].id;
			user.username = queryResults[0].username;
			user.email = queryResults[0].email;

			callback(user);
		});
	}

	GetUserByEmail(username, password) {

	}
};

module.exports = UserManager;