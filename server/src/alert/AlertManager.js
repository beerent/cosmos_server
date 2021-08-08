var ResponseBuilder = require("../response/ResponseBuilder.js");
var Alert = require("./Alert.js");

class AlertManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleGetAlertRequest(req, res, responseBuilder) {
		var self = this;

		self.GetLatestAlert(responseBuilder, function (response) {
			if (response == null) {
				responseBuilder.SetError(self.errors.ALERT_ERROR);
			} else {
				responseBuilder.SetPayload(response);
			}
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
		});
	}

	GetLatestAlert(responseBuilder, callback) {
		var self = this;

		var sql = "select `id`, `key`, `title`, `alert` from alerts order by id desc limit 1;";

		this.dbm.Query(sql, function(results) {
			var id = undefined;
			var key = undefined;
			var title = undefined;
			var alert = undefined;

			if (results == null || results.length == 0) {
				callback(null);
				return;
			}

			var result = results[0];
			
			id = result.id;
			key = result.key;
			title = result.title;
			alert = result.alert.split("\\n");

			callback(new Alert(id, key, title, alert));
		});
	}
}

module.exports = AlertManager;