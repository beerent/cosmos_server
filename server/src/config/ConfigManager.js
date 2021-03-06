var ResponseBuilder = require("../response/ResponseBuilder.js");

class ConfigManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	GetConfigValue(key, callback) {
		var sql = "select config.value from config where `key` = ?";
		var params = [key];

		this.dbm.ParameterizedQuery(sql, params, function (results, err) {
			callback(results[0].value);
		});
	}
}

module.exports = ConfigManager;