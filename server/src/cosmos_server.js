const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

var DBM = require("./database/DBM.js");
var QuestionManager = require("./question/QuestionManager.js");
var QuestionManager = require("./question/QuestionManager.js");
var ChallengeManager = require("./game/challenge/ChallengeManager.js");
var ResponseBuilder = require("./response/ResponseBuilder.js");
var UserManager = require("./user/UserManager.js");
var UserProfileManager = require("./user/UserProfileManager.js");
var HealthCheckManager = require("./health/HealthCheckManager.js");
var ConfigManager = require("./config/ConfigManager.js");
var MessagesManager = require("./messages/MessagesManager.js");

//var cosmosRoot = "/Users/beerent/Documents/cosmos_server/server/src"; //macbook
var cosmosRoot = "/home/ubuntu/server/cosmos_server/server/src"; //server

var runMode = GetRunMode();

function GetRunMode() {
	var runMode = "development";

	if (process.argv.length > 2) {
		runMode = process.argv[2];
	}

	return runMode;
}

function RunServer() {
	if (runMode == "production") {
		RunProductionServer();
	} else {
		RunDevelopmentServer();
	}
}

function RunDevelopmentServer() {
	const httpServer = http.createServer(app);
	httpServer.listen(8081, () => {
		console.log('HTTP Server running on port 8081');
	});
}

function RunProductionServer() {
	const privateKey = fs.readFileSync('/etc/ssl/private/knowyourcosmos.key', 'utf8');
	const certificate = fs.readFileSync('/etc/ssl/knowyourcosmos_com.crt', 'utf8');
	const ca = fs.readFileSync('/etc/ssl/knowyourcosmos_com.ca-bundle', 'utf8');

	const credentials = {
		key: privateKey,
		passphrase: process.env.SSL_PASSWORD,
		cert: certificate,
		ca: ca
	};

	const httpsServer = https.createServer(credentials, app);
	httpsServer.listen(13213, () => {
		console.log('HTTPS Server running on port 13213');
	});
}

function LoadErrors() {
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync(cosmosRoot + '/response/errors.json', 'utf8'));

	return obj;
}

function LoadPrivileges() {
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync(cosmosRoot + '/user/privileges.json', 'utf8'));

	return obj;	
}

function LoadDatabaseConnections() {
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync(cosmosRoot + '/conf/database_connections.json', 'utf8'));

	return obj;	
}

function GetDatabaseConnection(runMode, db_connections) {
	return db_connections[runMode];
}






var app = express();
var errors = LoadErrors();
var privileges = LoadPrivileges();
var db_connections = LoadDatabaseConnections();
var db_connection = GetDatabaseConnection(runMode, db_connections);

//USER MANAGER
app.get('/authenticate', function (req, res) {
	var dbm = new DBM(db_connection);
	var user_manager = new UserManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("authenticate");
	user_manager.HandleAuthenticationRequest(req, res, responseBuilder);
});

app.get('/guestAuthenticate', function (req, res) {
	var dbm = new DBM(db_connection);
	var user_manager = new UserManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("guestAuthenticate");
	user_manager.HandleGuestAuthenticationRequest(req, res, responseBuilder);
});

app.get('/getUserProfile', function (req, res) {
	var dbm = new DBM(db_connection);
	var user_profile_manager = new UserProfileManager(dbm, errors, privileges);

	var responseBuilder = new ResponseBuilder("getUserProfile");
	user_profile_manager.HandleGetUserProfileRequest(req, res, responseBuilder);
});



// CHALLENGE
app.get('/newChallenge', function (req, res) {
	var dbm = new DBM(db_connection);
	var challengeManagerInstance = new ChallengeManager(dbm, errors, privileges);

	var responseBuilder = new ResponseBuilder("newChallenge");
	challengeManagerInstance.HandleNewChallengeRequest(req, res, responseBuilder);
});

app.get('/getChallengeQuestions', function (req, res) {
	var dbm = new DBM(db_connection);
	var challengeManagerInstance = new ChallengeManager(dbm, errors, privileges);

	var responseBuilder = new ResponseBuilder("getChallengeQuestions");
	challengeManagerInstance.HandleGetChallengeQuestionsRequest(req, res, responseBuilder);
});

app.get('/registerChallengeAnswer', function (req, res) {
	var dbm = new DBM(db_connection);
	var challengeManagerInstance = new ChallengeManager(dbm, errors, privileges);

	var responseBuilder = new ResponseBuilder("registerChallengeAnswer");
	challengeManagerInstance.HandleRegisterChallengeAnswerRequest(req, res, responseBuilder);
});

app.get('/getChallengeLeaderboard', function (req, res) {
	var dbm = new DBM(db_connection);
	var challengeManagerInstance = new ChallengeManager(dbm, errors, privileges);

	var responseBuilder = new ResponseBuilder("getChallengeLeaderboard");
	challengeManagerInstance.HandleGetChallengeLeaderboardRequest(req, res, responseBuilder);
});

app.get('/getMessages', function (req, res) {
	var dbm = new DBM(db_connection);
	var messagesManagerInstance = new MessagesManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("getMessages");
	messagesManagerInstance.HandleGetMessagesRequest(req, res, responseBuilder);
});

app.get('/flagQuestion', function (req, res) {
	var dbm = new DBM(db_connection);
	var questionManagerInstance = new QuestionManager(dbm, errors, privileges);

	var responseBuilder = new ResponseBuilder("flagQuestion");
	questionManagerInstance.HandleFlagQuestionRequest(req, res, responseBuilder);
});

app.get('/reviewQuestion', function (req, res) {
	var dbm = new DBM(db_connection);
	var questionManagerInstance = new QuestionManager(dbm, errors, privileges);

	var responseBuilder = new ResponseBuilder("reviewQuestion");
	questionManagerInstance.HandleReviewQuestionRequest(req, res, responseBuilder);
});

app.get('/health', function (req, res) {
	var dbm = new DBM(db_connection);
	var healthCheckManagerInstance = new HealthCheckManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("health");
	healthCheckManagerInstance.checkHealth(req, res, responseBuilder);
});

app.get('*', function(req, res){
  res.status(404).send('cosmic fail!');
});

RunServer();
