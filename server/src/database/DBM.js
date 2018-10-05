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
};

module.exports = DBM;