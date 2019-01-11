var ChallengeLeaderboardEntry = require("./ChallengeLeaderboardEntry.js");

class ChallengeLeaderboard {
	constructor () {
		this.leaderboardEntries = [];
	}

	AddLeaderboardEntry(entry) {
		this.leaderboardEntries.push(entry);
	}

	GetLeaderboard() {
		return this.leaderboardEntries;
	}
};

module.exports = ChallengeLeaderboard;