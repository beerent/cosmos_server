var ResponseBuilder = require("../../response/ResponseBuilder.js");
var UserManager = require("../../user/UserManager.js");
var QuestionManager = require("../../question/QuestionManager");
var CosmosLiveSession = require("./CosmosLiveSession.js");

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
		var self = this;

		var payload = {
			cosmos_live_session : null,
			player : null,
			question : null
		};
		
		this.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
			self.GetCurrentCosmosLiveSession(function(cosmosLiveSession) {
				if (cosmosLiveSession == null) {
					responseBuilder.SetError(self.errors.INVALID_COSMOS_LIVE_SESSION);
				} else {
					payload.cosmos_live_session = cosmosLiveSession.ToPayload();

					if (cosmosLiveSession.GetState() != IN_GAME) {
						responseBuilder.SetPayload(payload);
						res.json(responseBuilder.Response());
						res.end();
						self.dbm.Close();
						return;
					}

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
				}
			});
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
			var sql = "select count(*) as count from cosmos_live_answers cla join answers a on cla.answer_id = a.id join users u on cla.user_id = u.id where user_id = ? and correct = 1";
			var params = [user.id];

			this.dbm.ParameterizedQuery(sql, params, function(results, err) {
				var playerCorrectAnswers = parseInt(results[0].count);
				var playerIsActive = playerCorrectAnswers >= (cosmosLiveSession.GetRound() - 1);

				callback(playerIsActive);
			});
	}

	HandleLiveSubmitAnswer(req, res, responseBuilder) {
		var self = this;

		this.HandleRequestWithAuth(req, res, responseBuilder, function(user) {
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

	SubmissionIsForCurrentRound(answer_id, currentQuestion) {
		var wrongAnswers = currentQuestion.incorrectAnswers;
		for (var i = 0; i < wrongAnswers.length; i++) {
			if (answer_id == wrongAnswers[i].id) {
				return true;
			}
		}

		return answer_id == currentQuestion.correcAnswer.id;
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

	HandleRequestWithAuth(req, res, responseBuilder, callback) {
		var userManager = new UserManager(this.dbm);

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
				self.dbm.Close();				
			} else {
				callback(user);
			}
		});
	}
}

module.exports = CosmosLiveManager;