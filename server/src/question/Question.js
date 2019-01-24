class Question {
	constructor (id, question, correctAnswer, incorrectAnswers) {
		this.id = id;
		this.question = question;
		this.correctAnswer = correctAnswer;
		this.incorrectAnswers = incorrectAnswers;
	}

	GetId() {
		return this.id;
	}

	GetQuestion() {
		return this.question;
	}

	GetCorrectAnswer() {
		return this.correctAnswer;
	}

	GetIncorrectAnswers() {
		return this.incorrectAnswers;
	}
};

module.exports = Question;