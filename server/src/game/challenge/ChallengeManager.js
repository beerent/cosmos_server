var QuestionManager = require("../../question/QuestionManager.js");
var UserManager = require("../../user/UserManager.js");
var ConfigManager = require("../../config/ConfigManager.js");
var UserManager = require("../../user/UserManager.js");

var ChallengeLeaderboardManager = require("./ChallengeLeaderboardManager.js");

var CHALLENGE_MODE_TIMER_LENGTH = "challenge_mode_timer_length";
var LEADERBOARD_CHANGE_TIMER_MS = "leaderboard_change_timer_ms";

class ChallengeManager {

	constructor (dbm, errors, privileges) {
		this.dbm = dbm;
		this.errors = errors;
		this.privileges = privileges;
	}

	GetChallengeQuestionsFieldsAreValid(query) {
		return query.attempt_id != undefined;
	}

	RegisterChallengeAnswerFieldsAreValid(query) {
		return query.answer_id != undefined && query.attempt_id != undefined;
	}

	HandleNewChallengeRequest(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var self = this;

		user_manager.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			self.CreateNewChallenge(user.id, responseBuilder, function(response) {
				res.json(response);
				res.end();
				self.dbm.Close();
			});
		});
	}

	HandleGetChallengeQuestionsRequest(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var self = this;

		user_manager.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			if (self.GetChallengeQuestionsFieldsAreValid(req.query) == false) {
				responseBuilder.SetError(self.errors.GET_CHALLENGE_QUESTIONS_ERROR);
				var response = responseBuilder.Response();
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
					res.json(response);
					res.end();
					self.dbm.Close();
					return;
				}

				/*** GET QUESTIONS ***/
				self.GetChallengeQuestions(user.id, req.query.attempt_id, function (questions) {
					responseBuilder.SetPayload(questions);
					var response = responseBuilder.Response();
					res.json(response);
					res.end();
					self.dbm.Close();
				});
			});
		});
	}

	HandleRegisterChallengeAnswerRequest(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var self = this;

		user_manager.HandleRequestWithAuth(req, res, responseBuilder, function(user){
			if (self.RegisterChallengeAnswerFieldsAreValid(req.query) == false) {
				responseBuilder.SetError(self.errors.REGISTER_CHALLENGE_ANSWER_MISSING_ERROR);
				var response = responseBuilder.Response();
				res.json(response);
				res.end();
				self.dbm.Close();
				return;
			}

			self.RegisterChallengeAnswer(req.query.attempt_id, req.query.answer_id, responseBuilder, function(response){
				res.json(response);
				res.end();
				self.dbm.Close();
			});
		});
	}

	HandleGetChallengeLeaderboardRequest(req, res, responseBuilder) {
		var self = this;

		self.GetChallengeLeaderboard(10, function (challengeLeaderboard) {
			responseBuilder.SetPayload(challengeLeaderboard);
			res.json(responseBuilder.Response());
			res.end();
			self.dbm.Close();
		});
	}

	HandleGetLeaderboardsRequest(req, res, responseBuilder) {
		var self = this;
		var configManager = new ConfigManager(this.dbm);
		configManager.GetConfigValue(LEADERBOARD_CHANGE_TIMER_MS, function(timerValue) {
			self.GetChallengeLeaderboard(10, function (challengeLeaderboardAllTime) {
				self.GetChallengeLeaderboardSpecific(10, 30, "30 Day Leaderboard", function (challengeLeaderboard30Day) {
					self.GetChallengeLeaderboardSpecific(10, 7, "7 Day Leaderboard", function (challengeLeaderboard7Day) {
						self.GetTopPlayersLeaderboard(10, function(topPlayerLeaderboard) {
							var leaderboards = [challengeLeaderboardAllTime, challengeLeaderboard30Day, challengeLeaderboard7Day, topPlayerLeaderboard];
							var payload = {};
							payload.leaderboard_change_timer_ms = timerValue;
							payload.leaderboards = leaderboards;
							responseBuilder.SetPayload(payload);
							res.json(responseBuilder.Response());
							res.end();
							self.dbm.Close();
						});
					});
				});
			});
	    });
	}

	HandleGetFullChallengeLeaderboardRequest(req, res, responseBuilder) {
		var self = this;

		self.GetChallengeLeaderboard(50000, function (response) {
			responseBuilder.SetPayload(response);
			res.json(response.Response());
			res.end();
			self.dbm.Close();
		});
	}

	CreateNewChallenge(user_id, responseBuilder, callback) {
		var configManager = new ConfigManager(this.dbm);

		var sql = "insert into challenge_attempts (user_id) values (?)";
		var params = [user_id];
		this.dbm.ParameterizedInsert(sql, params, function(newChallengeId, err) {
			var newGameData = {}; 
			newGameData["attempt_id"] = newChallengeId;
			configManager.GetConfigValue(CHALLENGE_MODE_TIMER_LENGTH, function(value) {
				newGameData["challenge_mode_timer_length"] = parseInt(value);
				responseBuilder.SetPayload(newGameData);
				callback(responseBuilder.Response());
			});
		});
	}

	ValidateChallengeAttemptId(user_id, attempt_id, callback) {
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
		var question_manager = new QuestionManager(this.dbm, this.errors, this.privileges);

		this.GetAskedQuestions(attempt_id, function (question_skip_list){			

			var question_skip_list_str = "";
			if (question_skip_list.length > 0) {
				question_skip_list_str += question_skip_list[0];
			}

			for (var i = 1; i < question_skip_list.length; i++) {
				question_skip_list_str += ", " + question_skip_list[i];
			}

			question_manager.GetUnaskedQuestionIds(question_skip_list_str, 10, function (ids_list){
				var ids_list_str = "" + ids_list[0];
				for (var i = 1; i < ids_list.length; i++) {
					ids_list_str += ", " + ids_list[i];
				}

				question_manager.GetQuestionsByIds(ids_list, callback);
			});
		});
	}

	GetAskedQuestions(attempt_id, callback) {
		var sql = "select questions.id from questions join answers on questions.id = answers.question_id join challenge_answers on answers.id = challenge_answers.answer_id where challenge_answers.attempt_id = ?";
		var params = [attempt_id];

		var asked_answer_ids = "";
		var questionIds = [];
		this.dbm.ParameterizedQuery(sql, params, function(queryResults, err) {
			queryResults.forEach(function (entry){
				questionIds.push(entry.id);
			});
	
			callback(questionIds);
		});
	}

	GetChallengeLeaderboard(limit, callback) {
		var challenge_leaderboard_manager = new ChallengeLeaderboardManager(this.dbm, this.errors);
		challenge_leaderboard_manager.GetLeaderboard(limit, callback);
	}

	GetChallengeLeaderboardSpecific(limit, lookback_days, title, callback) {
		var challenge_leaderboard_manager = new ChallengeLeaderboardManager(this.dbm, this.errors);
		challenge_leaderboard_manager.GetLeaderboardSpecific(limit, lookback_days, title, callback);
	}

	GetTopPlayersLeaderboard(limit, callback) {
		var challenge_leaderboard_manager = new ChallengeLeaderboardManager(this.dbm, this.errors);
		challenge_leaderboard_manager.GetTopPlayersLeaderboard(limit, callback);
	}

	RegisterChallengeAnswer(attempt_id, answer_id, responseBuilder, callback) {
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

	GetUserChallengeData(user_id, callback) {
		var challengeData = {};
		var challenge_leaderboard_manager = new ChallengeLeaderboardManager(this.dbm, this.errors);

		this.GetUserChallengeAttemptCount(user_id, function(challengeCount) {
			challengeData.challengeCount = challengeCount;

			challenge_leaderboard_manager.GetUserChallengeLeaderboardData(user_id, function(points, position) {
				challengeData.challengeHighScore = points;
				challengeData.challengeLeaderboardPosition = position;
				callback(challengeData);
			});
		});
	}

	GetUserChallengeAttemptCount(user_id, callback) {
		var sql = "SELECT count(*) as count from challenge_attempts where user_id = ?";
		var params = [user_id];

		this.dbm.ParameterizedQuery(sql, params, function(queryResults, err) {
			callback(queryResults[0].count);
		});
	}
};

module.exports = ChallengeManager;