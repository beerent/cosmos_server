var mysql = require('mysql');

class DBM {
	constructor () {
		this.con = mysql.createConnection({
		  host: "localhost",
		  database: "cosmos",
		  user: "root",
		  password: "Ryczak13!"
		});

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
			if (err) throw err;
			callback(result);
		});
	}

	ParameterizedInsert(sql, parameters, callback) {
		this.con.query(sql, parameters, function (err, result) {
			if (err) throw err;
			callback(result.insertId);
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