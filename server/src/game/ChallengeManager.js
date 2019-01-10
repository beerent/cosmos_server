var ResponseBuilder = require("../response/ResponseBuilder.js");
var QuestionManager = require("../question/QuestionManager.js");
var UserManager = require("../user/UserManager.js");

var ChallengeLeaderboard = require("./ChallengeLeaderboard.js");
var ChallengeLeaderboardEntry = require("./ChallengeLeaderboardEntry.js");

class ChallengeManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	GetChallengeQuestionsFieldsAreValid(query) {
		return query.attempt_id != undefined;
	}

	RegisterChallengeAnswerFieldsAreValid(query) {
		console.log("inhere");
		return query.answer_id != undefined && query.attempt_id != undefined;
	}

	DoChallengeRequest(req, res, callback) {
		var userManager = new UserManager(this.dbm);
		var responseBuilder = new ResponseBuilder();

		var self = this;
		if (userManager.CredentialFieldsAreValid(req.query) == false) {
			responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
			return;
		}

		userManager.GetUserFromCredentials(req.query.username, req.query.password, function(user) {
			if (undefined == user) {
				responseBuilder.SetError(self.errors.INVALID_CREDENTIALS);
				res.json(responseBuilder.Response());
				res.end();
			} else {
				callback(user);
			}
		});
	}

	HandleNewChallengeRequest(req, res) {
		var self = this;

		this.DoChallengeRequest(req, res, function(user){
			self.CreateNewChallenge(user.id, function(response){
				res.json(response);
				res.end();
			});
		});
	}

	HandleGetChallengeQuestionsRequest(req, res) {
		var self = this;

		this.DoChallengeRequest(req, res, function(user){
			var responseBuilder = new ResponseBuilder();

			if (self.GetChallengeQuestionsFieldsAreValid(req.query) == false) {
				responseBuilder.SetError(self.errors.GET_CHALLENGE_QUESTIONS_ERROR);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();
				return;
			}

			/*** VALIDATE CHALLENGE ATTEMPT ID ***/
			self.ValidateChallengeAttemptId(user.id, req.query.attempt_id, function (attemptIdIsValid) {
				if (false == attemptIdIsValid) {
					responseBuilder.SetError(self.errors.GET_CHALLENGE_INVALID_ID);
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
					return;
				}

				/*** GET QUESTIONS! ***/
				self.GetChallengeQuestions(user.id, req.query.attempt_id, function (questions) {
					responseBuilder.SetPayload(questions);
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
				});
			});
		});
	}

	HandleRegisterChallengeAnswerRequest(req, res) {
		var self = this;

		this.DoChallengeRequest(req, res, function(user){
			if (self.RegisterChallengeAnswerFieldsAreValid(req.query) == false) {
				console.log("fail!");
				var responseBuilder = new ResponseBuilder();
				responseBuilder.SetError(self.errors.REGISTER_CHALLENGE_ANSWER_MISSING_ERROR);
				res.json(responseBuilder.Response());
				res.end();
				self.dbm.Close();
				return;
			}

			self.RegisterChallengeAnswer(req.query.attempt_id, req.query.answer_id, function(response){
				res.json(response);
				res.end();
				self.dbm.Close();
			});
		});
	}

	HandleGetChallengeLeaderboardRequest(req, res) {
		var self = this;

		self.GetChallengeLeaderboard(function (response) {
			res.json(response);
			res.end();
			self.dbm.Close();
		});

	}

	CreateNewChallenge(user_id, callback) {
		var responseBuilder = new ResponseBuilder();

		var sql = "insert into challenge_attempts (user_id) values (?)";
		var params = [user_id];
		this.dbm.ParameterizedInsert(sql, params, function(newChallengeId, err) {
			var newGameData = {}; 
			newGameData["attempt_id"] = newChallengeId;

			responseBuilder.SetPayload(newGameData);
			callback(responseBuilder.Response());
		});
	}

	ValidateChallengeAttemptId(user_id, attempt_id, callback) {
		var responseBuilder = new ResponseBuilder();
		
		var sql = "select id from challenge_attempts where user_id = ? and id = ?";
		var params = [user_id, attempt_id];

		this.dbm.ParameterizedQuery(sql, params, function(results, err){
			var idIsValid = true;
			if (err) {
				idIsValid = false;
			} else if (results.length == 0) {
				idIsValid = false;
			} else {
				var found_attempt_id = results[0].id;
				idIsValid = found_attempt_id == attempt_id;
			}

			callback(idIsValid);
		});
	}

	GetChallengeQuestions(user_id, attempt_id, callback) {
		var question_manager = new QuestionManager(this.dbm);
		question_manager.GetAllQuestions(callback);
	}

	GetChallengeLeaderboard(callback) {
		var sql = "select users.username, challenge_answers.attempt_id, count(challenge_answers.id) as points from challenge_answers";
		sql += " join answers on challenge_answers.answer_id = answers.id";
		sql += " join challenge_attempts on challenge_answers.attempt_id = challenge_attempts.id";
		sql += " join users on challenge_attempts.user_id = users.id";
		sql += " group by challenge_attempts.id order by points desc limit 10;";
		console.log(sql);

		this.dbm.Query(sql, function(results) {
			var username = undefined;
			var attempt_id = undefined;
			var points = undefined;

			var challengeLeaderboard = new ChallengeLeaderboard();
			results.forEach(function(entry) {
				username = entry.username;
				attempt_id = entry.attempt_id;
				points = entry.points;
				var challengeLeaderboardEntry = new ChallengeLeaderboardEntry(username, attempt_id, points);
				challengeLeaderboard.AddLeaderboardEntry(challengeLeaderboardEntry);
			});

			var responseBuilder = new ResponseBuilder();
			responseBuilder.SetPayload(challengeLeaderboard);
			
			callback(responseBuilder.Response());
		});
	}

	RegisterChallengeAnswer(attempt_id, answer_id, callback) {
		console.log("reging");
		var responseBuilder = new ResponseBuilder();

		var sql = "insert into challenge_answers (attempt_id, answer_id) values (?, ?)";
		var params = [attempt_id, answer_id];

		var errors = this.errors;
		this.dbm.ParameterizedInsert(sql, params, function(newChallengeAnswerId, err) {
			if (err) {
				console.log(err);
				responseBuilder.SetError(errors.REGISTER_CHALLENGE_ANSWER_INVALID_ERROR);
			} 

			callback(responseBuilder.Response());
		});
	}
};

module.exports = ChallengeManager;