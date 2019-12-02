var ResponseBuilder = require("../response/ResponseBuilder.js");

var BASE_USER_QUERY = "select users.id, username, email, privilege as access_level from users join privileges_enum on users.access_level = privileges_enum.id ";

class UserManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleAuthenticationRequest(req, res, responseBuilder) {
		var self = this;
		this.AuthenticationRequest(req.query, responseBuilder, function(response) {
			res.json(response);
			res.end();
			self.dbm.Close();
		});
	}

	AuthenticationRequest(query, responseBuilder, callback) {
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

			else if (userObject.access_level != "ADMIN" && userObject.access_level != "MEMBER") {
				responseBuilder.SetError(self.errors.INSUFFICIENT_PRIVILEGE);
			} 

			callback(responseBuilder.Response());
		});
	}

	HandleGuestAuthenticationRequest(req, res, responseBuilder) {
		var self = this;
		this.GuestAuthenticationRequest(req.query, responseBuilder, function(response) {
			res.json(response);
			res.end();
			self.dbm.Close();
		});
	}

	GuestAuthenticationRequest(query, responseBuilder, callback) {
		var errors = this.errors;

		if (this.CredentialFieldsAreValid(query) == false) {
			responseBuilder.SetError(errors.INVALID_CREDENTIALS);
			callback(responseBuilder.Response());
			return;
		}

		this.GetUserFromCredentials(query.username, query.password, function (userObject) {
			if (userObject == undefined) {
				this.CreateGuestUser(query.username, function(userObject) {
					callback(responseBuilder.Response());
				});
			} else {
				if (userObject.access_level != "GUEST") {
					responseBuilder.SetError(self.errors.INSUFFICIENT_PRIVILEGE);
				} 

				callback(responseBuilder.Response());
			}
		});
	}

	CredentialFieldsAreValid(query) {
		return query.username != undefined && query.password != undefined;
	}

	GetGuestUser(username, callback) {

	}

	GetUserFromCredentials(username, password, callback) {
		var params = [username, password];
		var sql = BASE_USER_QUERY + " where username = ? and password_salt = ?";
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
			user.access_level = queryResults[0].access_level;

			callback(user);
		});
	}

	GetUserByUsername(username, callback) {
		var params = [username];
		var sql = BASE_USER_QUERY + " where username = ?";

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
};

module.exports = UserManager;