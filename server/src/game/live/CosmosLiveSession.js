class CosmosLiveSession {
	constructor (id, state, start, seconds_to_start, rounds, added) {
		this.id = id;
		this.state = state;
		this.start = start;
		this.seconds_to_start = seconds_to_start;
		this.rounds = rounds;
		this.added = added;
		this.round_seconds_remaining = 0;
		this.player_count = 0;
	}

	GetId() {
		return this.id;
	}

	GetState() {
		return this.state;
	}

	GetStart() {
		return this.start;
	}

	GetSecondsToStart() {
		return this.seconds_to_start;
	}

	GetAdded() {
		return this.added;
	}

	GetRounds() {
		return this.rounds;
	}

	SetRounds(rounds) {
		this.rounds = rounds;
	}

	GetCurrentRound() {
		if (this.rounds.length > 0) {
			return this.rounds[this.rounds.length - 1];
		}

		return null;
	}

	GetCurrentRoundNumber() {
		var currentRound = this.GetCurrentRound();
		if (currentRound != null) {
			return currentRound.GetRound();
		}

		return 0;
	}

	SetRoundSecondsRemaining(round_seconds_remaining) {
		this.round_seconds_remaining = round_seconds_remaining;
	}

	GetRoundSecondsRemaining() {
		return this.round_seconds_remaining;
	}

	GetAskedQuestionsIds() {
		var questionIds = [];

		for (var i = 0; i < this.rounds.length; i++) {
			var round = this.rounds[i];
			
			var questions = round.GetQuestionIds();
			questionIds.push.apply(questionIds, questions);

		}

		return questionIds;
	}

	SetPlayerCount(player_count) {
		this.player_count = player_count;
	}

	GetPlayerCount() {
		return this.player_count;
	}

	ToPayload() {
		var round = null;
		if (this.GetCurrentRound() != null) {
			round = this.GetCurrentRound().ToPayload();
		}

		var payload = {
			state : this.state,
			start : this.start,
			seconds_to_start : this.seconds_to_start,
			round : round,
			round_seconds_remaining : this.round_seconds_remaining,
			player_count : this.player_count
		};

		return payload;
	}
};

module.exports = CosmosLiveSession;