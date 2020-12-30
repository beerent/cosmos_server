var DBM = require("../database/DBM.js");

const https = require('http');

const PLAYER = "PLAYER";
const SPECTATOR = "SPECTATOR";

var server = "http://127.0.0.1:8081";

var cosmosRoot = "/Users/beerent/Documents/cosmos_server/server/src"; //macbook
//var cosmosRoot = "/home/ubuntu/server/cosmos_server/server/src"; //server

var failedTests = "";
var testsRanCount = 0;
var testsFailedCount = 0;

function GetHTTPResponse(url) {
	var request = require('sync-request');

	try {
	    res = request('GET', url);
	    return JSON.parse(res.getBody().toString());
	} catch (e) {}
}

function PrintResults() {
	if (testsFailedCount == 0) {
		console.log("All "+ testsRanCount +" Tests Passed!");
	} else {
		console.log("(" + testsFailedCount + "/" + testsRanCount + ") Tests Failed:");
		console.log(failedTests);
	}
}

function LoadDatabaseConnections() {
	var fs = require('fs');
	var obj = JSON.parse(fs.readFileSync(cosmosRoot + '/conf/database_connections.json', 'utf8'));

	return obj;	
}

function GetDatabaseConnection(runMode, db_connections) {
	return db_connections[runMode];
}





/***********************************************/
/**************** AUTHENTICATE *****************/
/***********************************************/
function TestAuthenticateReturnsRequest() {
	var functionName = "TestAuthenticateReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "authenticate";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateNoParameters() {
	var functionName = "TestAuthenticateNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateMissingUsername() {
	var functionName = "TestAuthenticateMissingUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateMissingPassword() {
	var functionName = "TestAuthenticateMissingPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?username=testadmin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateEmptyUsername() {
	var functionName = "TestAuthenticateEmptyUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?username=&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateEmptyPassword() {
	var functionName = "TestAuthenticateEmptyPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?username=testadmin&password=";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateIncorrectUsername() {
	var functionName = "TestAuthenticateIncorrectUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?username=testadmin1&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateIncorrectPassword() {
	var functionName = "TestAuthenticateIncorrectPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?username=testadmin&password=admin3";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateValidUser() {
	var functionName = "TestAuthenticateValidUser\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?username=testadmin&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestAuthenticateValidGuestUser() {
	var functionName = "TestAuthenticateValidGuestUser\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/authenticate";
	url += "?username=testguest&password=guest";
	var response = GetHTTPResponse(url);

	var success = true;
	if (true == response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 111) {
		failures += "  - op was " + response.op + ", expected 111\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}	
}

/***********************************************/
/************* GUEST AUTHENTICATE **************/
/***********************************************/
function TestGuestAuthenticateReturnsRequest() {
	var functionName = "TestGuestAuthenticateReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "guestAuthenticate";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGuestAuthenticateNoParameters() {
	var functionName = "TestGuestAuthenticateNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/guestAuthenticate";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGuestAuthenticateMissingUsername() {
	var functionName = "TestGuestAuthenticateMissingUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/guestAuthenticate";
	url += "?password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGuestAuthenticateEmptyUsername() {
	var functionName = "TestGuestAuthenticateEmptyUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/guestAuthenticate";
	url += "?username=&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGuestAuthenticateValidCreatesUser() {
	var functionName = "TestGuestAuthenticateValidCreatesUser\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/guestAuthenticate";
	url += "?username=testadmin&password=guest";
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGuestAuthenticateValidGuestUser() {
	var functionName = "TestAuthenticateValidGuestUser\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/guestAuthenticate";
	url += "?username=testadmin&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (true == response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 111) {
		failures += "  - op was " + response.op + ", expected 111\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}


/***********************************************/
/**************** NEW CHALLENGE ****************/
/***********************************************/

function TestNewChallengeReturnsRequest() {
	var functionName = "TestNewChallengeReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "newChallenge";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeNoParameters() {
	var functionName = "TestNewChallengeNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (response.challenge_id != undefined) {
		failures += "  - challenge_id was " + response.challenge_id + ", expected undefined\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeMissingUsername() {
	var functionName = "TestNewChallengeMissingUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	url += "?password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (response.challenge_id != undefined) {
		failures += "  - challenge_id was " + response.challenge_id + ", expected undefined\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeMissingPassword() {
	var functionName = "TestNewChallengeMissingPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	url += "?username=testadmin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (response.challenge_id != undefined) {
		failures += "  - challenge_id was " + response.challenge_id + ", expected undefined\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeEmptyUsername() {
	var functionName = "TestNewChallengeEmptyUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	url += "?username=&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (response.challenge_id != undefined) {
		failures += "  - challenge_id was " + response.challenge_id + ", expected undefined\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeEmptyPassword() {
	var functionName = "TestNewChallengeEmptyPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	url += "?username=testadmin&password=";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (response.challenge_id != undefined) {
		failures += "  - challenge_id was " + response.challenge_id + ", expected undefined\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeIncorrectUsername() {
	var functionName = "TestNewChallengeIncorrectUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	url += "?username=testadmin1&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (response.challenge_id != undefined) {
		failures += "  - challenge_id was " + response.challenge_id + ", expected undefined\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeIncorrectPassword() {
	var functionName = "TestNewChallengeIncorrectPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	url += "?username=testadmin&password=admin3";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (response.challenge_id != undefined) {
		failures += "  - challenge_id was " + response.challenge_id + ", expected undefined\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestNewChallengeValidUser() {
	var functionName = "TestNewChallengeValidUser\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/newChallenge";
	url += "?username=testadmin&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (response.payload == undefined) {
		failures += "  - response is missing payload\n";
		success = false;
	} else {
		if (response.payload.attempt_id == undefined) {
			failures += "  - response is missing attempt_id in payload\n";
			success = false;
		}

		if (response.payload.challenge_mode_timer_length == undefined) {
			failures += "  - response is missing challenge_timer_length in payload\n";
			success = false;
		}
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/***********************************************/
/********** GET CHALLENGE QUESTIONS ************/
/***********************************************/

function TestGetChallengeQuestionsReturnsRequest() {
	var functionName = "TestGetChallengeQuestionsReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "getChallengeQuestions";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsNoParameters() {
	var functionName = "TestGetChallengeQuestionsNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsMissingUsername() {
	var functionName = "TestGetChallengeQuestionsMissingUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsMissingPassword() {
	var functionName = "TestGetChallengeQuestionsMissingPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=testadmin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsEmptyUsername() {
	var functionName = "TestGetChallengeQuestionsEmptyUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsEmptyPassword() {
	var functionName = "TestGetChallengeQuestionsEmptyPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=testadmin&password=";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsIncorrectUsername() {
	var functionName = "TestGetChallengeQuestionsIncorrectUsername\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=testadmin1&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsIncorrectPassword() {
	var functionName = "TestGetChallengeQuestionsIncorrectPassword\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=testadmin&password=admin3";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsValidUserMissingAttemptId() {
	var functionName = "TestGetChallengeQuestionsValidUserMissingAttemptId\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=testadmin&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 105) {
		failures += "  - op was " + response.op + ", expected 105\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsValidUserInvalidAttemptId() {
	var functionName = "TestGetChallengeQuestionsValidUserInvalidAttemptId\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=testadmin&password=admin&attempt_id=0";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 106) {
		failures += "  - op was " + response.op + ", expected 106\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeQuestionsValidUserValidAttemptId() {
	var functionName = "TestGetChallengeQuestionsValidUserValidAttemptId\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=testguest&password=guest&attempt_id=" + test_attempt_id.toString();
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/***********************************************/
/********* REGISTER CHALLENGE ANSWER ***********/
/***********************************************/

function TestRegisterChallengeAnswerReturnsRequest() {
	var functionName = "TestRegisterChallengeAnswerReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "registerChallengeAnswer";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerNoParameters() {
	var functionName = "TestRegisterChallengeAnswerNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/registerChallengeAnswer";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerMissingUsername() {
	var functionName = "TestRegisterChallengeAnswerMissingUsername\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerMissingPassword() {
	var functionName = "TestRegisterChallengeAnswerMissingPassword\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerEmptyUsername() {
	var functionName = "TestRegisterChallengeAnswerEmptyUsername\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerEmptyPassword() {
	var functionName = "TestRegisterChallengeAnswerEmptyPassword\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin&password=";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerIncorrectUsername() {
	var functionName = "TestRegisterChallengeAnswerIncorrectUsername\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin1&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerIncorrectPassword() {
	var functionName = "TestRegisterChallengeAnswerIncorrectPassword\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin&password=admin3";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerValidUserMissingAttemptId() {
	var functionName = "TestRegisterChallengeAnswerValidUserMissingAttemptId\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin&password=admin&answer_id=100";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 103) {
		failures += "  - op was " + response.op + ", expected 103\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerValidUserMissingAnswerId() {
	var functionName = "TestRegisterChallengeAnswerValidUserMissingAnswerId\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin&password=admin&attempt_id=1";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 103) {
		failures += "  - op was " + response.op + ", expected 103\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerValidUserInvalidAttemptId() {
	var functionName = "TestRegisterChallengeAnswerValidUserInvalidAttemptId\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin&password=admin&attempt_id=0&answer_id=100";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 104) {
		failures += "  - op was " + response.op + ", expected 104\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerValidUserInvalidAnswerId() {
	var functionName = "TestRegisterChallengeAnswerValidUserInvalidAnswerId\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testadmin&password=admin&attempt_id=1&answer_id=0";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 104) {
		failures += "  - op was " + response.op + ", expected 104\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestRegisterChallengeAnswerValidUserValid() {
	var functionName = "TestRegisterChallengeAnswerValidUserValid\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/registerChallengeAnswer";
	url += "?username=testguest&password=guest&attempt_id=" + test_attempt_id.toString() + "&answer_id=" + test_questions[0].incorrect_answer_id.toString();
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/***********************************************/
/********* GET CHALLENGE LEADERBOARD ***********/
/***********************************************/

function TestGetChallengeLearderboardReturnsRequest() {
	var functionName = "TestGetChallengeLearderboardReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "getChallengeLeaderboard";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetChallengeLearderboardNoParameters() {
	var functionName = "TestGetChallengeLearderboardNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeLeaderboard";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success == false) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (response.payload.leaderboardEntries == undefined) {
		failures += "  - leaderboardEntries was " + response.payload.leaderboardEntries + ", expected data\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/***********************************************/
/*********     GET USER PROFILE      ***********/
/***********************************************/
function TestGetUserProfileReturnsRequest() {
	var functionName = "TestGetUserProfileReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "getUserProfile";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetUserProfileNoParameters() {
	var functionName = "TestGetUserProfileNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getUserProfile";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 107) {
		failures += "  - op was " + response.op + ", expected 107\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetUserProfileInvalidSpecifier() {
	var functionName = "TestGetUserProfileInvalidSpecifier\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getUserProfile";
	url += "?username=testadminStinks";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 108) {
		failures += "  - op was " + response.op + ", expected 108\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetUserProfileValidUserContainsChallengeStats() {
	var functionName = "TestGetUserProfileValidUserContainsChallengeStats\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getUserProfile";
	url += "?username=testadmin";

	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success == false) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	//challengeCount":17,"challengeHighScore":1,"challengeLeaderboardPosition
	if (!response.payload.challengeData) {
		failures += "  - missing challenge data field";
		success = false;
	} else {
		if (!response.payload.challengeData.challengeCount) {
			failures += "  - missing challenge data challenge count field";
			success = false;
		}

		if (!response.payload.challengeData.challengeHighScore) {
			failures += "  - missing challenge data challenge high score field";
			success = false;
		}

		if (!response.payload.challengeData.challengeLeaderboardPosition) {
			failures += "  - missing challenge data challenge leaderboard position field";
			success = false;
		}
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/***********************************************/
/*********       FLAG QUESTION       ***********/
/***********************************************/
function TestFlagQuestionReturnsRequest() {
	var functionName = "TestFlagQuestionReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "flagQuestion";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestFlagQuestionNoParameters() {
	var functionName = "TestFlagQuestionNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/flagQuestion";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestFlagQuestionValidUser() {
	var functionName = "TestFlagQuestionValidUser\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/flagQuestion";
	url += "?username=testadmin&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 109) {
		failures += "  - op was " + response.op + ", expected 109\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestFlagQuestionValidUserAndValidQuestion() {
	var functionName = "TestFlagQuestionValidUserAndValidQuestion\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/flagQuestion";
	url += "?username=testadmin&password=admin&question_id=28";
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/***********************************************/
/*********      REVIEW QUESTION      ***********/
/***********************************************/
function TestReviewQuestionReturnsRequest() {
	var functionName = "TestReviewQuestionReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "reviewQuestion";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestReviewQuestionNoParameters() {
	var functionName = "TestReviewQuestionNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/reviewQuestion";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestReviewQuestionValidUser() {
	var functionName = "TestReviewQuestionValidUser\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/reviewQuestion";
	url += "?username=testadmin&password=admin";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 110) {
		failures += "  - op was " + response.op + ", expected 109\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestReviewQuestionValidUserAndValidQuestionInvalidPrivileges() {
	var functionName = "TestReviewQuestionValidUserAndValidQuestionInvalidPrivileges\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/reviewQuestion";
	url += "?username=testguest&password=guest&question_id=" + test_questions[0].id.toString();
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 111) {
		failures += "  - op was " + response.op + ", expected 111\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestReviewQuestionValidUserAndValidQuestionValidPrivileges() {
	var functionName = "TestReviewQuestionValidUserAndValidQuestionValidPrivileges\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/reviewQuestion";
	url += "?username=testadmin&password=admin&question_id=28";
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/* HEALTH */
function TestHealthCheck() {
	var functionName = "TestHealthCheck\n";
	var failures = "";
	testsRanCount++;

	var url = server + "/health";
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (response.payload != null && response.payload.healthy != null && response.payload.healthy != "gaga X ari") {
		failures += "  - health check response was '" + response.payload.healthy + "', expected 'gaga X ari - rain on me <3'\n";
		success = false;	
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/* MESSAGES */
function TestGetMessagesReturnsRequest() {
	var functionName = "TestGetMessagesReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "getMessages";


	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestGetMessagesNoParameters() {
	var functionName = "TestGetMessagesNoParameters\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getMessages";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success == false) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (response.payload.messages == undefined) {
		failures += "  - messages was " + response.payload.messages + ", expected data\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

/* COSMOS LIVE */
function TestCosmosLiveReturnsRequest() {
	var functionName = "TestCosmosLiveReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveInvalidUser() {
	var functionName = "TestCosmosLiveInvalidUser\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/live";
	url += "?username=testadmin&password=admin3";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveSubmitAnswerReturnsRequest() {
	var functionName = "TestCosmosLiveSubmitReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "registerLiveAnswer";

	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveSubmitAnswerInvalidUser() {
	var functionName = "TestCosmosLiveSubmitAnswerInvalidUser\n";
	var failures = "";
	testsRanCount++;

	var requestString = "registerLiveAnswer";

	var url = server + "/" + requestString;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 101) {
		failures += "  - op was " + response.op + ", expected 101\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
	}
}

function TestCosmosLiveClosedReturnsCorrectData() {
	var functionName = "TestCosmosLiveClosedReturnsCorrectData\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (response.payload == undefined) {
		failures += "  - response had no payload\n";
		success = false;		
	} else if (response.payload.cosmos_live_session == undefined) {
		failures += "  - response had no 'cosmos_live_session' in the payload\n";
		success = false;		
	} else {
		if (response.payload.cosmos_live_session.state != "CLOSED") {
			failures += "  - payload's cosmos_live_session's 'state' was " + response.payload.cosmos_live_session.state + ", expected 'CLOSED'\n";
			success = false;
		}

		if (response.payload.cosmos_live_session.start == undefined) {
			failures += "  - CLOSED state requires 'start' in the payload's cosmos_live_session\n";
			success = false;
		}
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLivePreGameLobbyReturnsCorrectData() {
	var functionName = "TestCosmosLivePreGameLobbyReturnsCorrectData\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (response.payload == undefined) {
		failures += "  - response had no payload\n";
		success = false;		
	} else if (response.payload.cosmos_live_session == undefined) {
		failures += "  - response had no 'round' in the payload\n";
		success = false;		
	} else { 
		if (response.payload.cosmos_live_session.state != "PRE_GAME_LOBBY") {
			failures += "  - payload's 'state' was " + response.payload.cosmos_live_session.state + ", expected 'PRE_GAME_LOBBY'\n";
			success = false;
		}

		if (response.payload.cosmos_live_session.start == undefined) {
			failures += "  - PRE_GAME_LOBBY state requires start in the payload's round\n";
			success = false;
		}

		//if (response.payload.chat == undefined) {
		//	failures += "  - PRE_GAME_LOBBY state requires chat in the payload\n";
		//	success = false;
		//}
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveInGameReturnsCorrectData() {
	var functionName = "TestCosmosLiveInGameReturnsCorrectData\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	//PAYLOAD
	if (response.payload == undefined) {
		failures += "  - response had no payload\n";
		success = false;		
	} else {

		//ROUND
		if (response.payload.cosmos_live_session == undefined) {
			failures += "  - response had no 'round' in the payload\n";
			success = false;
		} else {
			if (response.payload.cosmos_live_session.state != "IN_GAME") {
				failures += "  - payload's 'state' was " + response.payload.state + ", expected 'IN_GAME'\n";
				success = false;
			}

			if (response.payload.cosmos_live_session.round == undefined || response.payload.cosmos_live_session.round < 0) {
				failures += "  - IN_GAME state requires round's round in the payload\n";
				success = false;
			}
		}

		//PLAYER
		if (response.payload.player == undefined) {
			failures += "  - response had no 'player' in the payload\n";
			success = false;
		} else {
			if (response.payload.player.user == undefined) {
				failures += "  - IN_GAME state requires players's user in the payload\n";
				success = false;
			}	

			if (response.payload.player.type == undefined) {
				failures += "  - IN_GAME state requires players's type in the payload\n";
				success = false;
			}	
		}

		//QUESTION
		if (response.payload.question == undefined) {
			failures += "  - response had no 'question' in the payload\n";
			success = false;
		}
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestSubmitIncorrectCosmosLiveAnswer(session_id, question) {
	var functionName = "TestSubmitIncorrectCosmosLiveAnswer\n";
	var failures = "";
	testsRanCount++;

	var requestString = "registerLiveAnswer";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest&session_id=" + session_id + "&answer_id=" + question.incorrect_answer_id;
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestSubmitCorrectCosmosLiveAnswer(session_id, question) {
	var functionName = "TestSubmitCorrectCosmosLiveAnswer\n";
	var failures = "";
	testsRanCount++;

	var requestString = "registerLiveAnswer";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest&session_id=" + session_id + "&answer_id=" + question.correct_answer_id;
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveInGameReturnsPlayerTypePlayer() {
	var functionName = "TestCosmosLiveInGameReturnsPlayerTypePlayer\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	var playerType = response.payload.player.type;
	if (PLAYER != playerType) {
		failures += "  - player type was '"+ playerType +"', expected '"+ PLAYER +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveInGameReturnsPlayerTypeSpectator() {
	var functionName = "TestCosmosLiveInGameReturnsPlayerTypeSpectator\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest";
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.request != requestString) {
		failures += "  - request was '"+ response.request +"', expected '"+ requestString +"'\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	var playerType = response.payload.player.type;
	if (SPECTATOR != playerType) {
		failures += "  - player type was '"+ playerType +"', expected '"+ SPECTATOR +"'\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestSubmitCorrectAnswerValidPlayerValidRound(session_id, question) {
	var functionName = "TestSubmitCorrectAnswerValidPlayerValidRound\n";
	var failures = "";
	testsRanCount++;

	var requestString = "registerLiveAnswer";

	var url = server + "/" + requestString;
	url += "?username=testguest&password=guest&session_id=" + session_id + "&answer_id=" + question.correct_answer_id;
	var response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function CreateAdminPrivilege(dbm, callback) {
	var sql = "insert into privileges_enum (privilege) values (?)";
	var params = ["ADMIN"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function CreateGuestPrivilege(dbm, callback) {
	var sql = "insert into privileges_enum (privilege) values (?)";
	var params = ["GUEST"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function CreateAdminUser(dbm, callback) {
	var sql = "insert into users (username, email, password_salt, access_level, added) values (?, ?, ?, ?, now())";
	var params = ["testadmin", "testadmin@email.com", "admin", 4];
	dbm.ParameterizedInsert(sql, params, function (user_id, err) {
		callback();
	});
}

function CreateGuestUser(dbm, callback) {
	var sql = "insert into users (username, email, password_salt, access_level, added) values (?, ?, ?, ?, now())";
	var params = ["testguest", "testguest@email.com", "guest", 5];
	dbm.ParameterizedInsert(sql, params, function (user_id, err) {
		test_guest_user_id = user_id;
		callback();
	});
}

function CreateQuestions(dbm, callback) {
	var question = "How many moons does planet Earth have?";
	CreateQuestion(dbm, question, function() {
		var question = "How many moons does planet Mars have?";
		CreateQuestion(dbm, question, function() {
			var question = "How many moons does planet Venus have?";
			CreateQuestion(dbm, question, function() {
				callback();
			});
		});
	});
}

function CreateQuestion(dbm, questionStr, callback) {
	var question = {};

	var sql = "insert into questions (question, citation, enabled, added) values (?, ?, ?, now())";
	var params = [questionStr, "citation", 1];
	dbm.ParameterizedInsert(sql, params, function (question_id, err) {
		question.id = question_id;

		var sql = "insert into answers (answer, correct, question_id, added) values (?, ?, ?, now())";
		var params = ["answer 1", 0, question_id];
		dbm.ParameterizedInsert(sql, params, function (answer_id, err) {
			question.incorrect_answer_id = answer_id;

			var sql = "insert into answers (answer, correct, question_id, added) values (?, ?, ?, now())";
			var params = ["answer 2", 1, question_id];
			dbm.ParameterizedInsert(sql, params, function (answer_id, err) {
				question.correct_answer_id = answer_id;
				test_questions.push(question);
				callback();
			});
		});
	});
}

function CreateChallengeAttempt(dbm, callback) {
	var sql = "insert into challenge_attempts (user_id, added) values (?, now())";
	var params = [test_guest_user_id];
	dbm.ParameterizedInsert(sql, params, function (attempt_id, err) {
		test_attempt_id = attempt_id;
		callback();
	});
}

function CreateChallengeModeConfigTimer(dbm, callback) {
	var sql = "insert into config (`key`, value) values (?, ?)";
	var params = ["challenge_mode_timer_length", "15"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function CreateHealthCheckKey(dbm, callback) {
	var sql = "insert into health (health_string) values (?)";
	var params = ["gaga X ari"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function CreateClosedCosmosLiveSession(dbm, callback) {
	var sql = "insert into cosmos_live_sessions (state, start) values (?, ?)";
	var params = ["CLOSED", "2021-01-01"];
	dbm.ParameterizedInsert(sql, params, function (session_id, err) {
		test_cosmos_live_session_id = session_id;
		callback();
	});
}

function AdvanceCosmosLiveSessionToPreGameLobby(dbm, callback) {
	var sql = "update cosmos_live_sessions set state = ?, asked_questions_ids = ?";
	var params = ["PRE_GAME_LOBBY", test_questions[0].id.toString()];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});	
}

function AdvanceCosmosLiveSessionToInGame(dbm, callback) {
	var sql = "update cosmos_live_sessions set state = ?";
	var params = ["IN_GAME"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});	
}

function AdvanceCosmosLiveRound(dbm, rounds, callback) {
	var questionIds = test_questions[0].id.toString();
	for (var i = 1; i < rounds; i++) {
		questionIds += ", " + test_questions[i].id.toString();
	}

	var sql = "update cosmos_live_sessions set asked_questions_ids = ?";
	var params = [questionIds];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});	
}

function GetDBM() {
	var database_connections = LoadDatabaseConnections();
	var database_connection = GetDatabaseConnection("test", database_connections);
	var dbm = new DBM(database_connection);

	return dbm;
}

var test_guest_user_id = -1;
var test_attempt_id = -1;
var test_questions = [];
var test_cosmos_live_session_id = -1;

function Setup(callback) {
	var dbm = GetDBM();

	CreateAdminPrivilege(dbm, function() {
		CreateGuestPrivilege(dbm, function() {
			CreateAdminUser(dbm, function() {
				CreateGuestUser(dbm, function() {
					CreateQuestions(dbm, function() {
						CreateChallengeAttempt(dbm, function() {
							CreateChallengeModeConfigTimer(dbm, function() {
								CreateHealthCheckKey(dbm, function() {
									dbm.Close();
									callback();
								});
							});
						});
					});
				});
			});
		});
	});
}

function TestCosmosLive(callback) {
	var dbm = GetDBM();

	TestCosmosLiveReturnsRequest();
	TestCosmosLiveInvalidUser();
	TestCosmosLiveSubmitAnswerReturnsRequest();
	TestCosmosLiveSubmitAnswerInvalidUser();

	//closed
	CreateClosedCosmosLiveSession(dbm, function() {
		TestCosmosLiveClosedReturnsCorrectData();

		//pre game lobby
		AdvanceCosmosLiveSessionToPreGameLobby(dbm, function() {
			TestCosmosLivePreGameLobbyReturnsCorrectData();

			//in game
			AdvanceCosmosLiveSessionToInGame(dbm, function() {
				TestCosmosLiveInGameReturnsCorrectData();
				TestCosmosLiveInGameReturnsPlayerTypePlayer();

				TestSubmitIncorrectCosmosLiveAnswer(test_cosmos_live_session_id, test_questions[0]);
				TestSubmitCorrectCosmosLiveAnswer(test_cosmos_live_session_id, test_questions[0]);
				TestCosmosLiveInGameReturnsPlayerTypeSpectator();

				//advance round

				// submit right answer for previous round - prove spectator
				// database update to correct answer

				//




				//test all variations of below
				// essentially - server needs to know when user can no longer submit old answers
				//				 and client needs to know when it is now only a spectator.
				//TestLiveSubmitCorrectAnswerValidPlayerValidRound(test_cosmos_live_session_id, test_questions[0]);

				//AnswerCosmosLiveSessionQuestionCorrectly(dbm, function() {
//					AdvanceCosmosLiveRound(dbm, 2, function() {
//						TestPlayerTypeAfterCorrectAnswer();

//						AdvanceCosmosLiveRound(dbm, 3, function() {
							dbm.Close();
							callback();
//						});
//					});
				//});
			});
		});
	});
}

function runTests() {
	/* AUTHENTICATE */
	TestAuthenticateReturnsRequest();
	TestAuthenticateNoParameters();
	TestAuthenticateMissingUsername();
	TestAuthenticateMissingPassword();
	TestAuthenticateEmptyUsername();
	TestAuthenticateEmptyPassword();
	TestAuthenticateIncorrectUsername();
	TestAuthenticateIncorrectPassword();
	TestAuthenticateValidUser();
	TestAuthenticateValidGuestUser();

	/* AUTHENTICATE GUEST */
	TestGuestAuthenticateReturnsRequest();
	TestGuestAuthenticateNoParameters();
	TestGuestAuthenticateMissingUsername();
	TestGuestAuthenticateEmptyUsername();
	TestGuestAuthenticateValidCreatesUser();

	/* NEW CHALLENGE */
	TestNewChallengeReturnsRequest();
	TestNewChallengeNoParameters();
	TestNewChallengeMissingUsername();
	TestNewChallengeMissingPassword();
	TestNewChallengeEmptyUsername();
	TestNewChallengeEmptyPassword();
	TestNewChallengeIncorrectUsername();
	TestNewChallengeIncorrectPassword();
	TestNewChallengeValidUser();

	/* GET CHALLENGE QUESTIONS */
	TestGetChallengeQuestionsReturnsRequest();
	TestGetChallengeQuestionsNoParameters();
	TestGetChallengeQuestionsMissingUsername();
	TestGetChallengeQuestionsMissingPassword();
	TestGetChallengeQuestionsEmptyUsername();
	TestGetChallengeQuestionsEmptyPassword();
	TestGetChallengeQuestionsIncorrectUsername();
	TestGetChallengeQuestionsIncorrectPassword();
	TestGetChallengeQuestionsValidUserMissingAttemptId();
	TestGetChallengeQuestionsValidUserInvalidAttemptId();
	TestGetChallengeQuestionsValidUserValidAttemptId();

	/* REGISTER CHALLENGE ANSWER */
	TestRegisterChallengeAnswerReturnsRequest();
	TestRegisterChallengeAnswerNoParameters();
	TestRegisterChallengeAnswerMissingUsername();
	TestRegisterChallengeAnswerMissingPassword();
	TestRegisterChallengeAnswerEmptyUsername();
	TestRegisterChallengeAnswerEmptyPassword();
	TestRegisterChallengeAnswerIncorrectUsername();
	TestRegisterChallengeAnswerIncorrectPassword();
	TestRegisterChallengeAnswerValidUserMissingAttemptId();
	TestRegisterChallengeAnswerValidUserMissingAnswerId();
	TestRegisterChallengeAnswerValidUserInvalidAttemptId();
	TestRegisterChallengeAnswerValidUserInvalidAnswerId();
	TestRegisterChallengeAnswerValidUserValid();

	/* GET CHALLENGE LEADERBOARD */
	TestGetChallengeLearderboardReturnsRequest();
	TestGetChallengeLearderboardNoParameters();

	/* GET USER PROFILE */
	TestGetUserProfileReturnsRequest();
	TestGetUserProfileNoParameters();
	TestGetUserProfileInvalidSpecifier();
	//TestGetUserProfileValidUserContainsChallengeStats(); ---> crap test - requires user is on the leaderboard

	/* FLAG QUESTION */
	TestFlagQuestionReturnsRequest();
	TestFlagQuestionNoParameters();
	TestFlagQuestionValidUser();
	TestFlagQuestionValidUserAndValidQuestion();

	/* REVIEW QUESTION */
	TestReviewQuestionReturnsRequest();
	TestReviewQuestionNoParameters();
	TestReviewQuestionValidUser();
	TestReviewQuestionValidUserAndValidQuestionInvalidPrivileges();
	TestReviewQuestionValidUserAndValidQuestionValidPrivileges();

	/* HEALTH */
	TestHealthCheck();

	/* MESSAGES */
	TestGetMessagesReturnsRequest();
	TestGetMessagesNoParameters();

	/* COSMOS LIVE */
	TestCosmosLive(PrintResults);
}

Setup(runTests);