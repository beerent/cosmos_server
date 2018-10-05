class Answer {
	constructor (id, answer, correct) {
		this.id = id;
		this.answer = answer;
		this.correct = correct;
	}

	GetId() {
		return this.id;
	}

	GetAnswer() {
		return this.answer;
	}

	IsCorrect() {
		return this.correct;
	}
};

module.exports = Answer;