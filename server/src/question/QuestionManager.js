var Question = require("./Question.js");
var Answer = require("./Answer.js");
var QuestionsBuilder = require("./QuestionsBuilder.js");


class QuestionManager {

	constructor (dbm) {
		this.dbm = dbm;
	}

	GetAllQuestions(callback) {
		var sql = "SELECT questions.id as qid, questions.question, answers.id as aid, answers.answer, answers.correct FROM questions join answers on questions.id = answers.question_id where questions.enabled = 1 order by answers.question_id DESC limit 400;";
		var self = this;
		this.dbm.Query(sql, function (results) {
			var questionsBuilder = new QuestionsBuilder();

			results.forEach(function(entry) {
				var questionId = entry.qid;
				var questionText = entry.question;	
				var answerId = entry.aid;
				var answerText = entry.answer;
				var answerCorrect = entry.correct == 1;
				questionsBuilder.AddQueryEntry(questionId, questionText, answerId, answerText, answerCorrect);
			});

			var questions = questionsBuilder.GetQuestions();
			self.ShuffleQuestions(questions);

			callback(questions);
		});
	}

	GetUnaskedQuestionIds(skip_question_id_string, callback) {
		if (skip_question_id_string == "") {
			skip_question_id_string = "-1";
		}

		var sql = "SELECT distinct questions.id as qid FROM questions join answers on questions.id = answers.question_id where questions.enabled = 1 and question_id not in ("+ skip_question_id_string +") order by rand() limit 10;";
		var self = this;

		this.dbm.Query(sql, function (results) {
			var ids = [];
			results.forEach(function(entry) {
				var questionId = entry.qid;
				ids.push(questionId);
			});

			self.ShuffleQuestions(ids);

			callback(ids);
		});
	}

	GetQuestionsByIds(ids_list, callback) {
		var sql = "SELECT questions.id as qid, questions.question, answers.id as aid, answers.answer, answers.correct FROM questions join answers on questions.id = answers.question_id where questions.enabled = 1 and question_id in ("+ ids_list +");";
		var self = this;
		this.dbm.Query(sql, function (results) {
			var questionsBuilder = new QuestionsBuilder();

			results.forEach(function(entry) {
				var questionId = entry.qid;
				var questionText = entry.question;	
				var answerId = entry.aid;
				var answerText = entry.answer;
				var answerCorrect = entry.correct == 1;
				questionsBuilder.AddQueryEntry(questionId, questionText, answerId, answerText, answerCorrect);
			});

			var questions = questionsBuilder.GetQuestions();
			self.ShuffleQuestions(questions);

			callback(questions);
		});
	}
	
	ShuffleQuestions(array) {
		var m = array.length, t, i;
		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}


};

module.exports = QuestionManager;