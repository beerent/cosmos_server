var ResponseBuilder = require("../../response/ResponseBuilder.js");
var QuestionManager = require("../../question/QuestionManager.js");
var UserManager = require("../../user/UserManager.js");

var ChallengeLeaderboardManager = require("./ChallengeLeaderboardManager.js");

class ChallengeManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	GetChallengeQuestionsFieldsAreValid(query) {
		return query.attempt_id != undefined;
	}

	RegisterChallengeAnswerFieldsAreValid(query) {
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
				response.request = "newChallenge";
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
				var response = responseBuilder.Response();
				response.request = "getChallengeQuestions";
				res.json(response);
				res.end();
				self.dbm.Close();
				return;
			}

			/*** VALIDATE CHALLENGE ATTEMPT ID ***/
			self.ValidateChallengeAttemptId(user.id, req.query.attempt_id, function (attemptIdIsValid) {
				if (false == attemptIdIsValid) {
					responseBuilder.SetError(self.errors.GET_CHALLENGE_INVALID_ID);
					var response = responseBuilder.Response();
					response.request = "getChallengeQuestions";
					res.json(response);
					res.end();
					self.dbm.Close();
					return;
				}

				/*** GET QUESTIONS! ***/
				self.GetChallengeQuestions(user.id, req.query.attempt_id, function (questions) {
					responseBuilder.SetPayload(questions);
					var response = responseBuilder.Response();
					response.request = "getChallengeQuestions";
					res.json(response);
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
				var responseBuilder = new ResponseBuilder();
				responseBuilder.SetError(self.errors.REGISTER_CHALLENGE_ANSWER_MISSING_ERROR);
				var response = responseBuilder.Response();
				response.request = "registerChallengeAnswer";
				res.json(response);
				res.end();
				self.dbm.Close();
				return;
			}

			self.RegisterChallengeAnswer(req.query.attempt_id, req.query.answer_id, function(response){
				response.request = "registerChallengeAnswer";
				res.json(response);
				res.end();
				self.dbm.Close();
			});
		});
	}

	HandleGetChallengeLeaderboardRequest(req, res) {
		var self = this;

		self.GetChallengeLeaderboard(function (response) {
			response.request = "getChallengeLeaderboard";
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
		var challenge_leaderboard_manager = new ChallengeLeaderboardManager(this.dbm, this.errors);
		challenge_leaderboard_manager.GetLeaderboard(callback);
	}

	RegisterChallengeAnswer(attempt_id, answer_id, callback) {
		var responseBuilder = new ResponseBuilder();

		var sql = "insert into challenge_answers (attempt_id, answer_id) values (?, ?)";
		var params = [attempt_id, answer_id];

		var errors = this.errors;
		this.dbm.ParameterizedInsert(sql, params, function(newChallengeAnswerId, err) {
			if (err) {
				responseBuilder.SetError(errors.REGISTER_CHALLENGE_ANSWER_INVALID_ERROR);
			} 

			callback(responseBuilder.Response());
		});
	}
};

module.exports = ChallengeManager;