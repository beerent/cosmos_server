class CosmosLiveSession {
	constructor (id, state, start, asked_questions_ids, added) {
		this.id = id;
		this.state = state;
		this.start = start;
		this.asked_questions_ids = asked_questions_ids.toString().split(",");
		this.added = added;
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

	ToPayload() {
		var payload = {
			state : this.state,
			start : this.start,
			round : this.asked_questions_ids.length - 1
		};

		return payload;
	}
};

module.exports = CosmosLiveSession;