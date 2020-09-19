var ResponseBuilder = require("../response/ResponseBuilder.js");

class HealthCheckManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	checkHealth(req, res, responseBuilder) {
		var self = this;

		self.GetHealthString(function(healthString){
			var healthy = {};

			if (healthString == null) {
				healthy.healthy = "unhealthy";
				responseBuilder.SetError(self.errors.UNHEALTHY_SERVER);

			} else {
				healthy.healthy = healthString;
				responseBuilder.SetPayload(healthy);
			}
		
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
		});
	}

	GetHealthString(callback) {
		var sql = "select health_string from health";

		this.dbm.Query(sql, function(results, err){
			var healthString = null;
			if (results.length > 0) {
				healthString = results[0].health_string;
			}

			callback(healthString);
		});
	}
}

module.exports = HealthCheckManager;