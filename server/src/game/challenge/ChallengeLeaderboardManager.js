var ResponseBuilder = require("../../response/ResponseBuilder.js");

var ChallengeLeaderboard = require("./ChallengeLeaderboard.js");
var ChallengeLeaderboardEntry = require("./ChallengeLeaderboardEntry.js");

class ChallengeLeaderboardManager {

	constructor (dbm, errors) {
		this.POINTS_MULTIPLIER = 10;
		this.dbm = dbm;
		this.errors = errors;
	}

	GetLeaderboard(responseBuilder, callback) {
		var self = this;

		var sql = "select users.username, challenge_answers.attempt_id, count(challenge_answers.id) as points from challenge_answers";
		sql += " join answers on challenge_answers.answer_id = answers.id";
		sql += " join challenge_attempts on challenge_answers.attempt_id = challenge_attempts.id";
		sql += " join users on challenge_attempts.user_id = users.id";
		sql += " where answers.correct = 1";
		sql += " group by challenge_attempts.id order by points desc limit 10;";

		this.dbm.Query(sql, function(results) {
			var username = undefined;
			var attempt_id = undefined;
			var points = undefined;

			var challengeLeaderboard = new ChallengeLeaderboard();
			results.forEach(function(entry) {
				username = entry.username;
				attempt_id = entry.attempt_id;
				points = entry.points * self.POINTS_MULTIPLIER;
				var challengeLeaderboardEntry = new ChallengeLeaderboardEntry(username, attempt_id, points);
				challengeLeaderboard.AddLeaderboardEntry(challengeLeaderboardEntry);
			});

			responseBuilder.SetPayload(challengeLeaderboard);
			
			callback(responseBuilder.Response());
		});
	}
}

module.exports = ChallengeLeaderboardManager;