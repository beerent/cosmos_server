class CosmosLiveSession {
	constructor (id, state, start, asked_questions_ids, added) {
		this.id = id;
		this.state = state;
		this.start = start;
		this.asked_questions_ids = asked_questions_ids.toString().split(",");
		this.added = added;
		this.round_seconds_remaining = 0;
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

	ToPayload() {
		var payload = {
			state : this.state,
			start : this.start,
			round : this.GetRound(),
			round_seconds_remaining : this.round_seconds_remaining
		};

		return payload;
	}
};

module.exports = CosmosLiveSession;