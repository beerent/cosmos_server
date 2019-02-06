var express = require('express');
var DBM = require("./database/DBM.js");
var QuestionManager = require("./question/QuestionManager.js");
var ChallengeManager = require("./game/challenge/ChallengeManager.js");
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

	var responseBuilder = new ResponseBuilder("authenticate");
	user_manager.HandleAuthenticationRequest(req, res, responseBuilder);
});

app.get('/newChallenge', function (req, res) {
	var dbm = new DBM();
	var challengeManagerInstance = new ChallengeManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("newChallenge");
	challengeManagerInstance.HandleNewChallengeRequest(req, res, responseBuilder);
});

app.get('/getChallengeQuestions', function (req, res) {
	var dbm = new DBM();
	var challengeManagerInstance = new ChallengeManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("getChallengeQuestions");
	challengeManagerInstance.HandleGetChallengeQuestionsRequest(req, res, responseBuilder);
});

app.get('/registerChallengeAnswer', function (req, res) {
	var dbm = new DBM();
	var challengeManagerInstance = new ChallengeManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("registerChallengeAnswer");
	challengeManagerInstance.HandleRegisterChallengeAnswerRequest(req, res, responseBuilder);
});

app.get('/getChallengeLeaderboard', function (req, res) {
	var dbm = new DBM();
	var challengeManagerInstance = new ChallengeManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("getChallengeLeaderboard");
	challengeManagerInstance.HandleGetChallengeLeaderboardRequest(req, res, responseBuilder);
});

var server = app.listen(13213, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("listening at http://%s:%s", host, port)
});



