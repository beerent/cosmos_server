class Question {
	constructor (id, question, citation, date_added, correctAnswer, incorrectAnswers) {
		this.id = id;
		this.question = question;
		this.citation = citation;
		this.date_added = date_added;
		this.correctAnswer = correctAnswer;
		this.incorrectAnswers = incorrectAnswers;
	}

	GetId() {
		return this.id;
	}

	GetQuestion() {
		return this.question;
	}

	GetCitation() {
		return this.citation;
	}

	GetDateAdded() {
		return this.date_added;
	}

	GetCorrectAnswer() {
		return this.correctAnswer;
	}

	GetIncorrectAnswers() {
		return this.incorrectAnswers;
	}
};

module.exports = Question;