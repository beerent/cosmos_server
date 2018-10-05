class Question {
	constructor (id, question, citation, date_added) {
		this.id = id;
		this.question = question;
		this.citation = citation;
		this.date_added = date_added;
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
};

module.exports = Question;