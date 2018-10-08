var express = require('express');
var DBM = require("./database/DBM.js");
var QuestionManager = require("./question/QuestionManager.js");
var GameManager = require("./game/GameManager.js");
var Authenticator = require("./authentication/Authenticator.js");
var ResponseBuilder = require("./response/ResponseBuilder.js");

function LoadErrors() {
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync('./response/errors.json', 'utf8'));
	return obj;
}

function CredentialFieldsAreValid(query) {
	return query.username != undefined && query.password != undefined;
}

function HandleRequestWithInvalidCredentials(res) {
	var responseBuilder = new ResponseBuilder();
	responseBuilder.SetError(errors.INVALID_CREDENTIALS);
	res.json(responseBuilder.Response());	
}

function ActiveGameFieldsAreValid(query) {
	return query.gameId != undefined;
}

function HandleRequestWithInvalidActiveGameFields(res) {
	var responseBuilder = new ResponseBuilder();
	responseBuilder.SetError(errors.ACTIVE_GAME_FIELDS_ERROR);
	res.json(responseBuilder.Response());	
}

var app = express();
var dbm = new DBM();
var errors = LoadErrors();

app.get('/newGame', function (req, res) {
	if (CredentialFieldsAreValid(req.query) == false) {
		HandleRequestWithInvalidCredentials(res);
		return;
	}

	var authenticatorInstance = new Authenticator(dbm);
	var gameManagerInstance = new GameManager();

	authenticatorInstance.HandleIfAuthenticated(req.query, function(){
		gameManagerInstance.HandleNewGameRequest(req.query, function(response){
			res.json(response);
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

	var question_manager = new QuestionManager(dbm);
	var questions = question_manager.GetAllQuestions(function (questions) {
		res.json(questions);
		console.log("[SERVER] sent questions.");
	});
});

app.get('/getQuestions', function (req, res) {
	var question_manager = new QuestionManager(dbm);
	var questions = question_manager.GetAllQuestions(function (questions) {
		res.json(questions);
		console.log("[SERVER] sent questions.");
	});
});

app.put('/submitAnswer', function (req, res) {
	//username, password, gameID, questionID, answerID
});





var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("istening at http://%s:%s", host, port)
});



