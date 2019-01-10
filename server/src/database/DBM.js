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

select users.username, challenge_answers.attempt_id, count(challenge_answers.id) as points from challenge_answers join answers on challenge_answers.answer_id = answers.id join challenge_attempts on challenge_answers.attempt_id = challenge_attempts.id join users on challenge_attempts.user_id = users.id group by challenge_attempts.id order by points desc limit 10;