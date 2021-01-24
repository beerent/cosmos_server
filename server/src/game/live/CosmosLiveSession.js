class CosmosLiveSession {
	constructor (id, state, start, seconds_to_start, asked_questions_ids, added) {
		this.id = id;
		this.state = state;
		this.start = start;
		this.seconds_to_start = seconds_to_start;
		this.asked_questions_ids = asked_questions_ids.toString().split(", ");
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

	GetAskedQuestionsIds() {
		return this.asked_questions_ids;
	}

	GetAdded() {
		return this.added;
	}

	GetRound() {
		return this.asked_questions_ids.length;
	}

	GetLatestQuestionId() {
		if (this.asked_questions_ids.length < 1) {
			return null;
		}

		return this.asked_questions_ids[this.asked_questions_ids.length - 1];
	}

	SetRoundSecondsRemaining(round_seconds_remaining) {
		this.round_seconds_remaining = round_seconds_remaining;
	}

	GetRoundSecondsRemaining() {
		return this.round_seconds_remaining;
	}

	SetPlayerCount(player_count) {
		this.player_count = player_count;
	}

	GetPlayerCount() {
		return this.player_count;
	}

	ToPayload() {
		var payload = {
			state : this.state,
			start : this.start,
			seconds_to_start : this.seconds_to_start,
			round : this.GetRound(),
			round_seconds_remaining : this.round_seconds_remaining,
			player_count : this.player_count
		};

		return payload;
	}
};

module.exports = CosmosLiveSession;