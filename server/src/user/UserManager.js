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
				responseBuilder.SetError(errors.INSUFFICIENT_PRIVILEGE);
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
		var self = this;

		if (this.CredentialFieldsAreValid(query) == false || query.username == "") {
			responseBuilder.SetError(errors.INVALID_CREDENTIALS);
			callback(responseBuilder.Response());
			return;
		}

		this.GetUserFromCredentials(query.username, query.password, function (userObject) {

			if (userObject == undefined) {
				self.CreateGuestUser(query.username, function(userObject) {
					if (userObject == undefined) {
						responseBuilder.SetError(errors.GUEST_ACCOUNT_CREATION_FAILURE);
					}

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

	CreateGuestUser(username, callback) {
		var self = this;

		var params = [username, username + "_guest_email", "guest"];
		var sql = "insert into users (username, email, password_salt, access_level) values (?, ?, ?, (select privileges_enum.id from privileges_enum where privileges_enum.privilege = 'GUEST'));";
		this.dbm.ParameterizedInsert(sql, params, function (insertId, err) {
			if (insertId == undefined) {
				callback(undefined);
			} else {
				self.GetUserFromCredentials(username, "guest", function(user) {
					callback(user);
				});
			}
		});
	}

	CredentialFieldsAreValid(query) {
		return query.admin_auth_key != undefined || (query.username != undefined && query.password != undefined);
	}

	HandleRequestWithAuth(req, res, responseBuilder, callback) {
		var self = this;
		if (this.CredentialFieldsAreValid(req.query) == false) {
			responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
			return;
		}

		if (req.query.admin_auth_key) {
			self.GetUserByAdminAuthKey(req.query.admin_auth_key, function(user) {
				if (undefined == user) {
					responseBuilder.SetError(self.errors.INVALID_ADMIN_AUTH_KEY);
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();				
				} else {
					callback(user);
				}				
			});
		} else {
			self.GetUserFromCredentials(req.query.username, req.query.password, function(user) {
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

	GetUserByAdminAuthKey(admin_auth_key, callback) {
		var sql = BASE_USER_QUERY + "join config where privileges_enum.privilege = 'ADMIN' and `key` = 'admin_auth_key' and value = ?";
		var params = [admin_auth_key];

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