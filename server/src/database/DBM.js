var mysql = require('mysql');

class DBM {
	constructor (runMode) {
		switch(runMode) {
			case "test":
				this.con = mysql.createConnection({
				  host: "127.0.0.1",
				  database: "cosmos_test",
				  user: "root",
				  password: "Ryczak13!"
				});
				break;

			default:
				this.con = mysql.createConnection({
				  host: "127.0.0.1",
				  database: "cosmos",
				  user: "root",
				  password: "Ryczak13!"
				});
				break;
		}

		this.con.connect(function(err) {
		  if (err) throw err;
		});
	}

	Query(sql, callback) {
		this.con.query(sql, function (err, result) {
			if (err) throw err;
			callback(result);
		});
	}

	ParameterizedQuery(sql, parameters, callback) {
		this.con.query(sql, parameters, function (err, result) {
			if (err)
				callback(undefined, err);
			else
				callback(result, err);
		});
	}

	ParameterizedInsert(sql, parameters, callback) {
		this.con.query(sql, parameters, function (err, result) {
			if (err)
				callback(undefined, err);
			else
				callback(result.insertId, err);
		});
	}

	Escape(str) {
		return mysql.escape(str);
	}

	Close() {
		this.con.end();
	}
};

module.exports = DBM;