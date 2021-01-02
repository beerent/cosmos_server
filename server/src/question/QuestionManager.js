var Question = require("./Question.js");
var Answer = require("./Answer.js");
var QuestionsBuilder = require("./QuestionsBuilder.js");
var UserManager = require("../user/UserManager.js");


class QuestionManager {

	constructor (dbm, errors, privileges) {
		this.dbm = dbm;
		this.errors = errors;
		this.privileges = privileges;
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

	GetUnaskedQuestionIds(skip_question_id_string, limit, callback) {
		if (skip_question_id_string == "") {
			skip_question_id_string = "-1";
		}

		var sql = "SELECT distinct questions.id as qid FROM questions where questions.enabled = 1 and questions.id not in ("+ skip_question_id_string +") order by rand() limit " + limit;
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

	GetQuestionById(id, callback) {
		var self = this;

		var sql = "SELECT questions.id as qid, questions.question, answers.id as aid, answers.answer, answers.correct FROM questions join answers on questions.id = answers.question_id where questions.enabled = 1 and questions.id = " + id;
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

	GetQuestionsByIds(ids_list, callback) {
		var self = this;

		var sql = "SELECT questions.id as qid, questions.question, answers.id as aid, answers.answer, answers.correct FROM questions join answers on questions.id = answers.question_id where questions.enabled = 1 and question_id in ("+ ids_list +");";
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

	HandleFlagQuestionRequest(req, res, responseBuilder) {
		var self = this;
		var userManager = new UserManager(this.dbm);

		var self = this;
		if (userManager.CredentialFieldsAreValid(req.query) == false) {
			responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
			return;
		}

		if (self.FlagQuestionFieldsAreValid(req.query) == false) {
			responseBuilder.SetError(self.errors.FLAG_QUESTION_MISSING_SPECIFIER);
			var response = responseBuilder.Response();
			res.json(response);
			res.end();
			self.dbm.Close();
			return;
		}

		userManager.GetUserFromCredentials(req.query.username, req.query.password, function(user) {
			if (undefined == user) {
				responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();				
			} else {
				var params = [req.query.question_id, user.id];
				var sql = "insert into flagged_questions (question_id, user_id) values (?, ?)";
				self.dbm.ParameterizedQuery	(sql, params, function (results) {
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
				});
			}
		});
	}

	HandleReviewQuestionRequest(req, res, responseBuilder) {
		var self = this;
		var userManager = new UserManager(this.dbm);

		var self = this;
		if (userManager.CredentialFieldsAreValid(req.query) == false) {
			responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
			return;
		}

		if (self.ReviewQuestionFieldsAreValid(req.query) == false) {
			responseBuilder.SetError(self.errors.REVIEW_QUESTION_MISSING_SPECIFIER);
			var response = responseBuilder.Response();
			res.json(response);
			res.end();
			self.dbm.Close();
			return;
		}

		userManager.GetUserFromCredentials(req.query.username, req.query.password, function(user) {
			if (undefined == user) {
				responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();				
			} else {
				if (user.access_level == "ADMIN") {
					var params = [req.query.question_id, user.id];
					var sql = "insert into question_reviews (question_id, user_id) values (?, ?)";
					self.dbm.ParameterizedQuery	(sql, params, function (results) {
						res.json(responseBuilder.Response());
						res.end();
						self.dbm.Close();
					});
				} else {
					responseBuilder.SetError(self.errors.INSUFFICIENT_PRIVILEGE);
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
				}
			}
		});
	}

	FlagQuestionFieldsAreValid(query) {
		return query.question_id != undefined;
	}

	ReviewQuestionFieldsAreValid(query) {
		return query.question_id != undefined;
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