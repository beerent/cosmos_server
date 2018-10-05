var Question = require("./Answer.js");

class Answers {
	constructor (correctAnswer, incorrectAnswers) {
		this.correctAnswer = correctAnswer;
		this.incorrectAnswers = incorrectAnswers;
	}

	GetCorrectAnswer() {
		return this.correctAnswer;
	}

	GetIncorrectAnswer() {
		return this.incorrectAnswer;
	}
};

module.exports = Answers;