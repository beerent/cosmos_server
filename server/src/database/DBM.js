var mysql = require('mysql');

class DBM {
	constructor (database_connection) {
		this.con = mysql.createConnection(database_connection);

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