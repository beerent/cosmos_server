var ResponseBuilder = require("../response/ResponseBuilder.js");
var crypto = require('crypto');

var BASE_USER_QUERY = "select users.id, device_id, username, email, privilege as access_level from users join privileges_enum on users.access_level = privileges_enum.id ";

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

		this.GetUserFromCredentials(query.device_uuid, query.username, query.password, function (userObject) {
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

		this.GetUserFromCredentials(query.device_uuid, query.username, query.password, function (userObject) {
			if (userObject == undefined) {
				self.GetOrCreateDevice(query.device_uuid, function(device) {
					if (device == undefined) {
						responseBuilder.SetError(errors.GUEST_ACCOUNT_CREATION_FAILURE);
						callback(responseBuilder.Response());
						return;
					} else {
						self.CreateGuestUser(device.id, query.username, function(userObject) {
							responseBuilder.SetPayload({user : userObject});
							if (userObject == undefined) {
								responseBuilder.SetError(errors.GUEST_ACCOUNT_CREATION_FAILURE);
							}

							callback(responseBuilder.Response());
							return;
						});
					}
				});
			} else {
				if (userObject.access_level != "GUEST") {
					responseBuilder.SetError(self.errors.INSUFFICIENT_PRIVILEGE);
				} 

				callback(responseBuilder.Response());
			}
		});
	}

	GetOrCreateDevice(deviceUuid, callback) {
		var self = this;

		this.GetDeviceFromDeviceUuid(deviceUuid, function(device) {
			if (device == undefined) {
				self.CreateDevice(deviceUuid, function(device) {
					callback(device);
					return;
				});
			} else {
				callback(device);
			}
		});
	}

	GetDeviceFromDeviceUuid(deviceUuid, callback) {
		var self = this;

		this.HashDeviceUuid(deviceUuid, function(deviceUuidHash) {
			var params = [deviceUuidHash];
			var sql = "select id, added from devices where device_uuid_hash = ?";


			self.dbm.ParameterizedQuery(sql, params, function (queryResults, err) {
				if (err || queryResults.length == 0) {
					callback(undefined);
					return;
				}

				var device = {};
				device.id = queryResults[0].id;
				device.uuid_hash = deviceUuidHash;
				device.added = queryResults[0].added;

				callback(device);
			});
		});
	}

	CreateDevice(deviceUuid, callback) {
		var self = this;

		this.HashDeviceUuid(deviceUuid, function(deviceUuidHash) {
			var params = [deviceUuidHash];
			var sql = "insert into devices (device_uuid_hash, added) values (?, now())";

			self.dbm.ParameterizedInsert(sql, params, function (deviceId, err) {
				if (err || deviceId == undefined) {
					callback(undefined);
					return;
				}

				var device = {};
				device.id = deviceId;
				device.device_uuid_hash = deviceUuidHash;
				device.added = "add_me";

				callback(device);
			});
		});
	}

	CreateGuestUser(deviceId, username, callback) {
		var self = this;

		var guestEmail = "" + deviceId + username + "_guest_email";
		var guestPassword = "guest";
		var params = [deviceId, username, guestEmail, guestPassword];
		var sql = "insert into users (device_id, username, email, password_salt, access_level) values (?, ?, ?, ?, (select privileges_enum.id from privileges_enum where privileges_enum.privilege = 'GUEST'));";

		self.dbm.ParameterizedInsert(sql, params, function (insertId, err) {
			if (insertId == undefined) {
				callback(undefined);
			} else {
				self.GetUserFromCredentialsWithDeviceId(deviceId, username, "guest", function(user) {
					callback(user);
				});
			}
		});
	}

	HashDeviceUuid(deviceUuid, callback) {
		var hash = crypto.createHash('md5').update(deviceUuid).digest("hex");
		callback(hash.toUpperCase());
	}

	CredentialFieldsAreValid(query) {
		return query.admin_auth_key != undefined || 
			(query.device_uuid != undefined && query.username != undefined && query.password != undefined);
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
			self.GetUserFromCredentials(req.query.device_uuid, req.query.username, req.query.password, function(user) {
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

	GetUserFromCredentialsWithDeviceId(deviceId, username, password, callback) {
		var self = this;

		var params = [deviceId, username, password];
		var sql = BASE_USER_QUERY + " where device_id = ? and username = ? and password_salt = ?";
		
		self.dbm.ParameterizedQuery(sql, params, function(queryResults, err) {
			if (err || queryResults.length == 0) {
				var user = undefined;
				callback(user);
				return;
			}

			var user = {};
			user.id = queryResults[0].id;
			user.device_id = queryResults[0].device_id; 
			user.username = queryResults[0].username;
			user.email = queryResults[0].email;
			user.access_level = queryResults[0].access_level;

			callback(user);
		});
	}

	GetUserFromCredentials(deviceUuid, username, password, callback) {
		var self = this;

		this.HashDeviceUuid(deviceUuid, function(deviceUuidHash){
			var params = [deviceUuidHash, username, password];
			var sql = BASE_USER_QUERY + " join devices on users.device_id = devices.id where device_uuid_hash = ? and username = ? and password_salt = ?";
			
			self.dbm.ParameterizedQuery(sql, params, function(queryResults, err) {
				if (err || queryResults.length == 0) {
					var user = undefined;
					callback(user);
					return;
				}

				var user = {};
				user.id = queryResults[0].id;
				user.device_id = queryResults[0].device_id; 
				user.username = queryResults[0].username;
				user.email = queryResults[0].email;
				user.access_level = queryResults[0].access_level;

				callback(user);
			});
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