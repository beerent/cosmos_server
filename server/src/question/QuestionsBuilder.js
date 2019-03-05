var Question = require("./Question.js");
var Answer = require("./Answer.js");

class QuestionsBuilder {
	constructor () {
		this.questions = {};
	}

	AddQueryEntry(questionId, questionText, answerId, answerText, answerCorrect) {
		if (questionId in this.questions) {
			this.AddAnswer(questionId, answerId, answerText, answerCorrect);
		} else {
			this.AddQuestion(questionId, questionText);
			this.AddAnswer(questionId, answerId, answerText, answerCorrect);
		}
	}

	AddQuestion(questionId, questionText) {
		var question = new Question(questionId, questionText, undefined, []);
		this.questions[questionId] = question;
	}

	AddAnswer(questionId, answerId, answerText, answerCorrect) {
		var answer = new Answer(answerId, answerText, answerCorrect);

		if (answerCorrect) {
			this.questions[questionId].correctAnswer = answer;
		} else {
			this.questions[questionId].incorrectAnswers.push(answer);
		}
	}

	GetQuestions() {
		var questions = Object.values(this.questions);
		var validQuestions = [];
		questions.forEach(function (question){

			var correctAnswer = question.GetCorrectAnswer();
			var incorrectAnswers = question.GetIncorrectAnswers();


			if (correctAnswer != undefined && incorrectAnswers.length == 1 || incorrectAnswers.length > 2) {
				validQuestions.push(question);
			}
		});

		return questions;
	}
};

module.exports = QuestionsBuilder;