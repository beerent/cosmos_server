var express = require('express');
var DBM = require("./database/DBM.js");
var QuestionManager = require("./question/QuestionManager.js");
var GameManager = require("./game/GameManager.js");
var Authenticator = require("./authentication/Authenticator.js");
var ResponseBuilder = require("./response/ResponseBuilder.js");
var UserManager = require("./user/UserManager.js");

function LoadErrors() {
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync('./response/errors.json', 'utf8'));
	return obj;
}

function ActiveGameFieldsAreValid(query) {
	return query.gameId != undefined;
}

function HandleRequestWithInvalidActiveGameFields(res) {
	var responseBuilder = new ResponseBuilder();
	responseBuilder.SetError(errors.ACTIVE_GAME_FIELDS_ERROR);
	res.json(responseBuilder.Response());
	res.end();
}

var app = express();
var errors = LoadErrors();

app.get('/newGame', function (req, res) {
	if (CredentialFieldsAreValid(req.query) == false) {
		HandleRequestWithInvalidCredentials(res);
		return;
	}

	var dbm = new DBM();
	var authenticatorInstance = new Authenticator(dbm);
	var gameManagerInstance = new GameManager();

	authenticatorInstance.HandleIfAuthenticated(req.query, function(){
		gameManagerInstance.HandleNewGameRequest(req.query, function(response){
			res.json(response);
			res.end();
			dbm.Close();
		});
	});
});

app.get('/getActiveGameQuestions', function (req, res) {
	if (CredentialFieldsAreValid(req.query) == false) {
		HandleRequestWithInvalidCredentials(res);
		return;
	}

	if (ActiveGameFieldsAreValid(req.query) == false) {
		HandleRequestWithInvalidActiveGameFields(res);
		return;
	}

	var dbm = new DBM();
	var question_manager = new QuestionManager(dbm);
	var questions = question_manager.GetAllQuestions(function (questions) {
		res.json(questions);
		res.end();
		console.log("[SERVER] sent questions.");
		dbm.Close();
	});
});

app.get('/getQuestions', function (req, res) {
	var dbm = new DBM();
	var question_manager = new QuestionManager(dbm);
	var questions = question_manager.GetAllQuestions(function (questions) {
		res.json(questions);
		res.end();
		console.log("[SERVER] sent questions.");
		dbm.Close();
	});
});









/****************************************************************************/

app.get('/authenticate', function (req, res) {
	var dbm = new DBM();
	var user_manager = new UserManager(dbm, errors);
	user_manager.AuthenticationRequest(req.query, function (response) {
		res.json(response);
		res.end();
		dbm.Close();
	});
});
























var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("listening at http://%s:%s", host, port)
});



