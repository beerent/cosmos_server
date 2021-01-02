const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

var ConfigLoader = require("./config/ConfigLoader.js");

var DBM = require("./database/DBM.js");
var QuestionManager = require("./question/QuestionManager.js");
var QuestionManager = require("./question/QuestionManager.js");
var ChallengeManager = require("./game/challenge/ChallengeManager.js");
var CosmosLiveManager = require("./game/live/CosmosLiveManager.js");
var ResponseBuilder = require("./response/ResponseBuilder.js");
var UserManager = require("./user/UserManager.js");
var UserProfileManager = require("./user/UserProfileManager.js");
var HealthCheckManager = require("./health/HealthCheckManager.js");
var ConfigManager = require("./config/ConfigManager.js");
var MessagesManager = require("./messages/MessagesManager.js");

var environment = GetEnvironment();
var config_loader = new ConfigLoader(environment);

function GetEnvironment() {
	var environment = "development";

	if (process.argv.length > 2) {
		environment = process.argv[2];
	}

	return environment;
}

function RunServer() {
	if (environment == "production") {
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
	var source_root = config_loader.GetSourceRoot();

	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync(source_root + '/response/errors.json', 'utf8'));

	return obj;
}

function LoadPrivileges() {
	var source_root = config_loader.GetSourceRoot();

	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync(source_root + '/user/privileges.json', 'utf8'));

	return obj;	
}

var app = express();
var errors = LoadErrors();
var privileges = LoadPrivileges();
var db_connection = config_loader.GetDatabaseConnectionInfo();

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



// COSMOS LIVE
app.get('/live', function (req, res) {
	var dbm = new DBM(db_connection);
	var cosmosLiveManagerInstance = new CosmosLiveManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("live");
	cosmosLiveManagerInstance.HandleLiveDataRequest(req, res, responseBuilder);
});

app.get('/liveRegisterAdmin', function (req, res) {
	var dbm = new DBM(db_connection);
	var cosmosLiveManagerInstance = new CosmosLiveManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("liveRegisterAdmin");
	cosmosLiveManagerInstance.HandleLiveSubmitAnswer(req, res, responseBuilder);
});

app.get('/liveAdmin', function (req, res) {
	var dbm = new DBM(db_connection);
	var cosmosLiveManagerInstance = new CosmosLiveManager(dbm, errors);

	var responseBuilder = new ResponseBuilder("liveAdmin");
	cosmosLiveManagerInstance.HandleLiveAdminRequest(req, res, responseBuilder);
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
