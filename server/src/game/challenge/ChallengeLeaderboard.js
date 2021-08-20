var ChallengeLeaderboardEntry = require("./ChallengeLeaderboardEntry.js");

class ChallengeLeaderboard {
	constructor (title) {
		this.title = title;
		this.leaderboardEntries = [];
	}

	AddLeaderboardEntry(entry) {
		this.leaderboardEntries.push(entry);
	}

	GetLeaderboard() {
		return this.leaderboardEntries;
	}

	GetTitle() {
		return this.title;
	}

	ContainsUsername(username) {
		for (var i = 0; i < this.leaderboardEntries.length; i++) {
			if (this.leaderboardEntries[i].GetUsername() == username) {
				return true;
			}
		}

		return false;
	}
};

module.exports = ChallengeLeaderboard;