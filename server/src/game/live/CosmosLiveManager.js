var ResponseBuilder = require("../../response/ResponseBuilder.js");
var UserManager = require("../../user/UserManager.js");
var QuestionManager = require("../../question/QuestionManager");
var CosmosLiveSession = require("./CosmosLiveSession.js");
var ConfigManager = require("../../config/ConfigManager.js");

const SPECTATOR = "SPECTATOR";
const PLAYER = "PLAYER";

const IN_GAME = "IN_GAME";

class CosmosLiveManager {

	constructor (dbm, errors, privileges) {
		this.dbm = dbm;
		this.errors = errors;
		this.privileges = privileges;
	}

	HandleLiveDataRequest(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var self = this;

		var payload = {
			cosmos_live_session : null,
			player : null,
			question : null
		};
		
		user_manager.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			self.GetCurrentCosmosLiveSession(function(cosmosLiveSession) {
				if (cosmosLiveSession == null) {
					responseBuilder.SetError(self.errors.INVALID_COSMOS_LIVE_SESSION);
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
					return;
				}

				if (cosmosLiveSession.GetState() != IN_GAME) {
					payload.cosmos_live_session = cosmosLiveSession.ToPayload();
					responseBuilder.SetPayload(payload);
					res.json(responseBuilder.Response());
					res.end();
					self.dbm.Close();
					return;
				}

				self.GetRoundSecondsRemainingInRound(cosmosLiveSession, function(secondsRemaining) {
					cosmosLiveSession.SetRoundSecondsRemaining(secondsRemaining);
					payload.cosmos_live_session = cosmosLiveSession.ToPayload();
					self.GetPlayerType(cosmosLiveSession, user, function(playerType) {
						var player = {
							user : user,
							type : playerType
						};

						payload.player = player;

						var currentQuestionId = cosmosLiveSession.GetLatestQuestionId();
						if (currentQuestionId == null) {
							responseBuilder.SetError(self.errors.INVALID_COSMOS_LIVE_SESSION);
							res.json(responseBuilder.Response());
							res.end();
							self.dbm.Close();
							return;
						}

						var question_manager = new QuestionManager(self.dbm, self.errors, self.privileges);
						question_manager.GetQuestionById(currentQuestionId, function(questions) {
							payload.question = questions[0];

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

	GetRoundSecondsRemainingInRound(cosmosLiveSession, callback) {
		var self = this;

		var configManager = new ConfigManager(this.dbm);

		var start_time = cosmosLiveSession.GetStart();
		var current_round = cosmosLiveSession.GetRound();

		configManager.GetConfigValue("live_mode_question_timer_length", function(question_timer_length) {
			configManager.GetConfigValue("live_mode_round_timer_length", function(round_timer_length) {
				self.GetCurrentDateTime(function(now_time) {
					self.GetSecondsDifference(now_time, start_time, function(seconds_difference) {
						var total_seconds = current_round * round_timer_length - seconds_difference;

						var seconds_remaining = question_timer_length;
						if (total_seconds <  seconds_remaining) {
							seconds_remaining = total_seconds;
						}
						if (seconds_remaining < 0) {
							seconds_remaining = 0;
						}

						callback(seconds_remaining);
					});
				});
			});
		});
	}

	GetSecondsDifference(time_a, time_b, callback) {
		var sql = "select time_to_sec(timediff(?, ?)) as difference";
		var params = [time_a, time_b];

		this.dbm.ParameterizedQuery(sql, params, function(results, err) {
			var difference = null;
			if (results.length > 0) {
				var row = results[0];
				difference = row.difference;
			}

			callback(difference);
		});			
	}

	GetCurrentDateTime(callback) {
		var sql = "select utc_timestamp() as now";

		this.dbm.Query(sql, function(results, err) {
			var date_time = null;
			if (results.length > 0) {
				var row = results[0];
				date_time = row.now;
			}

			callback(date_time);
		});		
	}

	GetCurrentCosmosLiveSession(callback) {
		var sql = "select id, state, start, asked_questions_ids, added from cosmos_live_sessions order by id desc limit 1";

		this.dbm.Query(sql, function(results, err) {
			var cosmosLiveSession = null;
			if (results.length > 0) {
				var row = results[0];
				cosmosLiveSession = new CosmosLiveSession(row.id, row.state, row.start, row.asked_questions_ids, row.added);
			}

			callback(cosmosLiveSession);
		});
	}

	GetPlayerType(cosmosLiveSession, user, callback) {
		this.IsPlayerActive(cosmosLiveSession, user, function(isActive) {
			var playerType = SPECTATOR;
			if (isActive) {
				playerType = PLAYER;
			}

			callback(playerType);
		});
	}

	IsPlayerActive(cosmosLiveSession, user, callback) {
		var sql = "select correct, count(*) as count from cosmos_live_answers cla join answers a on cla.answer_id = a.id join users u on cla.user_id = u.id where user_id = ? group by correct";
		var params = [user.id];

		this.dbm.ParameterizedQuery(sql, params, function(results, err) {
			var correctAnswers = 0;
			var incorrectAnswers = 0;
			for (var i = 0; i < results.length; i++) {
				var entry = results[i];

				if (entry.correct == 0) {
					incorrectAnswers = entry.count;
				} else {
					correctAnswers = entry.count;
				}
			}

			var isPlayerActive = false;

			if (incorrectAnswers > 0) {
				isPlayerActive = false;
			} else {
				isPlayerActive = correctAnswers >= (cosmosLiveSession.GetRound() - 1);
			}

			callback(isPlayerActive);
		});
	}

	HandleLiveSubmitAnswer(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var self = this;

		user_manager.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			if (self.RegisterLiveAnswerFieldsAreValid(req.query) == false) {
				responseBuilder.SetError(self.errors.REGISTER_LIVE_ANSWER_MISSING_ERROR);
				var response = responseBuilder.Response();
				res.json(response);
				res.end();
				self.dbm.Close();
				return;
			}

			self.GetCurrentCosmosLiveSession(function(cosmosLiveSession) {
				if (cosmosLiveSession == null || cosmosLiveSession.GetLatestQuestionId() == null) {
					responseBuilder.SetError(self.errors.INVALID_COSMOS_LIVE_SESSION);
					var response = responseBuilder.Response();
					res.json(response);
					res.end();
					self.dbm.Close();
					return;
				}

				var currentQuestionId = cosmosLiveSession.GetLatestQuestionId();
				var question_manager = new QuestionManager(self.dbm, self.errors, self.privileges);
				question_manager.GetQuestionById(currentQuestionId, function(questions) {
					var currentSessionQuestion = questions[0];

					if (!self.SubmissionIsForCurrentRound(req.query.answer_id, currentSessionQuestion)) {
						var response = responseBuilder.Response();
						res.json(response);
						res.end();
						self.dbm.Close();
						return;
					}

					self.RegisterLiveAnswer(cosmosLiveSession.GetId(), user.id, req.query.answer_id, responseBuilder, function(response) {
						res.json(response);
						res.end();
						self.dbm.Close();
					});
				});
			});
		});
	}

	IsValidLiveAdminRequest(query) {
		if (query.request == "transition_state") {
			if (query.state == "closed" || query.state == "pre_game_lobby" || query.state == "in_game" || query.state == "post_game_lobby") {
				return true;
			}
		}

		if (query.request == "advance_round") {
			return true;
		}

		return false;
	}

	TransitionSessionState(cosmosLiveSession, state, callback) {
		var state_str = null;
		switch (state) {
			case "closed":
				state_str = "CLOSED";
				break;

			case "pre_game_lobby":
				state_str = "PRE_GAME_LOBBY";
				break;

			case "in_game":
				state_str = "IN_GAME";
				break;

			case "post_game_lobby":
				state_str = "POST_GAME_LOBBY";
				break;
		}

		if (!state_str) {
			callback();
		} else {
			var sql = "update cosmos_live_sessions set state = ? where id = ?";
			var params = [state_str, cosmosLiveSession.GetId()];

			this.dbm.ParameterizedInsert(sql, params, function(results, err) {
				callback();
			});
		}
	}

	AdvanceSessionRound(cosmosLiveSession, callback) {
		var self = this;

		var question_manager = new QuestionManager(this.dbm, this.errors, this.privileges);

		var asked_questions_ids = cosmosLiveSession.GetAskedQuestionsIds();
		question_manager.GetUnaskedQuestionIds(asked_questions_ids, 1, function(question_id) {
			var sql = "update cosmos_live_sessions set asked_questions_ids = concat(asked_questions_ids, concat(', ', ?)) WHERE id = ?";
			var params = [question_id, cosmosLiveSession.GetId()];
			self.dbm.ParameterizedInsert(sql, params, function(results, err) {
				callback();
			});
		});
	}

	HandleLiveAdminRequest(req, res, responseBuilder) {
		var user_manager = new UserManager(this.dbm, this.errors);
		var self = this;

		user_manager.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			if (!self.IsValidLiveAdminRequest(req.query)) {
				responseBuilder.SetError(self.errors.INVALID_LIVE_ADMIN_REQUEST);
				var response = responseBuilder.Response();
				res.json(response);
				res.end();
				self.dbm.Close();
				return;
			}

			self.GetCurrentCosmosLiveSession(function(cosmosLiveSession) {
				if (cosmosLiveSession == null || cosmosLiveSession.GetLatestQuestionId() == null) {
					responseBuilder.SetError(self.errors.INVALID_COSMOS_LIVE_SESSION);
					var response = responseBuilder.Response();
					res.json(response);
					res.end();
					self.dbm.Close();
					return;
				}

				var callback = function() {
					var response = responseBuilder.Response();
					res.json(response);
					res.end();
					self.dbm.Close();
				}

				switch(req.query.request) {
					case "transition_state":
						self.TransitionSessionState(cosmosLiveSession, req.query.state, callback);
						break;

					case ("advance_round"):
						self.AdvanceSessionRound(cosmosLiveSession, callback);
						break;
				}
			});	
		});
	}

	SubmissionIsForCurrentRound(answer_id, currentQuestion) {
		var wrongAnswers = currentQuestion.incorrectAnswers;
		for (var i = 0; i < wrongAnswers.length; i++) {
			if (answer_id == wrongAnswers[i].id) {
				return true;
			}
		}

		return answer_id == currentQuestion.correctAnswer.id;
	}

	RegisterLiveAnswerFieldsAreValid(query) {
		return query.session_id != undefined && query.answer_id != undefined;
	}

	RegisterLiveAnswer(session_id, user_id, answer_id, responseBuilder, callback) {
		var sql = "insert into cosmos_live_answers (session_id, user_id, answer_id, added) values (?, ?, ?, now())";
		var params = [session_id, user_id, answer_id];

		var errors = this.errors;
		this.dbm.ParameterizedInsert(sql, params, function(newChallengeAnswerId, err) {
			if (err) {
				responseBuilder.SetError(errors.REGISTER_LIVE_ANSWER_INVALID_ERROR);
			} 

			callback(responseBuilder.Response());
		});
	}
}

module.exports = CosmosLiveManager;