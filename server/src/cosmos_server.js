var express = require('express');
var DBM = require("./database/DBM.js");
var QuestionManager = require("./question/QuestionManager.js");
var ChallengeManager = require("./game/ChallengeManager.js");
var Authenticator = require("./authentication/Authenticator.js");
var ResponseBuilder = require("./response/ResponseBuilder.js");
var UserManager = require("./user/UserManager.js");

function LoadErrors() {
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync('./response/errors.json', 'utf8'));
	return obj;
}

var app = express();
var errors = LoadErrors();

app.get('/authenticate', function (req, res) {
	var dbm = new DBM();
	var user_manager = new UserManager(dbm, errors);

	user_manager.HandleAuthenticationRequest(req, res);
});

app.get('/newChallenge', function (req, res) {
	var dbm = new DBM();
	var challengeManagerInstance = new ChallengeManager(dbm, errors);

	challengeManagerInstance.HandleNewChallengeRequest(req, res);
});

app.get('/getChallengeQuestions', function (req, res) {
	var dbm = new DBM();
	var challengeManagerInstance = new ChallengeManager(dbm, errors);

	challengeManagerInstance.HandleGetChallengeQuestionsRequest(req, res);
});

app.get('/registerChallengeAnswer', function (req, res) {
	var dbm = new DBM();
	var challengeManagerInstance = new ChallengeManager(dbm, errors);

	challengeManagerInstance.HandleRegisterChallengeAnswerRequest(req, res);
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("listening at http://%s:%s", host, port)
});



