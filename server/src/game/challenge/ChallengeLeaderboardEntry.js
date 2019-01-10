class ChallengeLeaderboardEntry {
	constructor (username, attempt_id, points) {
		this.username = username;
		this.attempt_id = attempt_id;
		this.points = points;
	}

	GetUsername() {
		return this.username;
	}

	GetAttemptId() {
		return this.attempt_id;
	}

	GetPoints() {
		return this.points;
	}
};

module.exports = ChallengeLeaderboardEntry;