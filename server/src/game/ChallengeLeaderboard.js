var ChallengeLeaderboardEntry = require("./ChallengeLeaderboardEntry.js");

class ChallengeLeaderboard {
	constructor () {
		this.entries = [];
	}

	AddLeaderboardEntry(entry) {
		this.entries.push(entry);
	}

	GetLeaderboard() {
		return this.entries;
	}
};

module.exports = ChallengeLeaderboard;