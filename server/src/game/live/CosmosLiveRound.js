class CosmosLiveRound {
	constructor (id, round, questions, added) {
		this.id = id;
		this.round = round;
		this.questions = questions;
		this.added = added;
	}

	GetId() {
		return this.id;
	}

	GetRound() {
		return this.round;
	}

	GetQuestions() {
		return this.questions;
	}

	GetAdded() {
		return this.added;
	}

	ToPayload() {
		var payload = {
			id : this.GetId(),
			round : this.GetRound(),
			questions : this.GetQuestions()
		};

		return payload;
	}
}

module.exports = CosmosLiveRound;