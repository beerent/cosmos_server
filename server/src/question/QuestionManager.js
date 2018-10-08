var Question = require("./Question.js");
var Answer = require("./Answer.js");


class QuestionManager {

	constructor (dbm) {
		this.dbm = dbm;
	}

	GetAllQuestions(callback) {
		var results = this.dbm.Query("SELECT questions.id as qid, questions.question, questions.citation, questions.enabled, questions.added, answers.id as aid, answers.answer, answers.correct FROM questions join answers on questions.id = answers.question_id order by answers.question_id ASC;", function (results) {
			var questions = [];

			var questionId = undefined;
			var questionText = undefined;
			var questionCitation = undefined;
			var questionAdded = undefined;
			var correctAnswer = undefined;
			var incorrectAnswers = [];

			results.forEach(function(entry) {
				if (entry.qid != questionId) {
					if (questionId != undefined) {
						var newQuestion = new Question(questionId, questionText, questionCitation, questionAdded, correctAnswer, incorrectAnswers); 
						questions.push(newQuestion);
					}

					questionId = entry.qid;
					questionText = entry.question;
					questionCitation = entry.citation;
					questionAdded = entry.added;	
					correctAnswer = undefined;
					incorrectAnswers = [];
				}

				var answer = new Answer(entry.aid, entry.answer, (entry.correct == 1));
				if (answer.IsCorrect()) {
					correctAnswer = answer;
				} else {
					incorrectAnswers.push(answer);
				}

			});

			if (questionId != undefined) {
				var newQuestion = new Question(questionId, questionText, questionCitation, questionAdded, correctAnswer, incorrectAnswers); 
				questions.push(newQuestion);
			}

			callback(questions);
		});
	}


};

module.exports = QuestionManager;