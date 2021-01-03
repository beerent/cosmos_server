var ConfigLoader = require("../config/ConfigLoader.js");
var DBM = require("../database/DBM.js");

const https = require('http');

var config_loader = new ConfigLoader("test");
var server = config_loader.GetApiServer();

const PLAYER = "PLAYER";
const SPECTATOR = "SPECTATOR";

var failedTests = "";
var testsRanCount = 0;
var testsFailedCount = 0;

function GetHTTPResponse(url, body=null) {
	var request = require('sync-request');

	try {
		res = request('GET', url);
	    return JSON.parse(res.getBody().toString());
	} catch (e) {
		console.log(e);
	}
}

function PrintResults() {
	if (testsFailedCount == 0) {
		console.log("All "+ testsRanCount +" Tests Passed!");
	} else {
		console.log("(" + testsFailedCount + "/" + testsRanCount + ") Tests Failed:");
		console.log(failedTests);
	}
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
	url += "?password="+ test_admin_password;
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
	url += "?username="+ test_admin_username;
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
	url += "?username=&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password=";
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
	url += "?username="+ test_admin_username +"1&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"3";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password;
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
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
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
	url += "?password="+ test_admin_password;
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
	url += "?username=&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password=" + test_guest_password;
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password;
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
	url += "?password="+ test_admin_password;
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
	url += "?username="+ test_admin_username;
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
	url += "?username=&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password=";
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
	url += "?username="+ test_admin_username +"1&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"3";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password;
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
	url += "?password="+ test_admin_password;
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
	url += "?username="+ test_admin_username;
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
	url += "?username=&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password=";
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
	url += "?username="+ test_admin_username +"1&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"3";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"&attempt_id=0";
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
	url += "?username="+ test_guest_username +"&password=" + test_guest_password + "&attempt_id=" + test_attempt_id.toString();
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
	url += "?password="+ test_admin_password;
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
	url += "?username="+ test_admin_username;
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
	url += "?username=&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password=";
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
	url += "?username="+ test_admin_username +"1&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"3";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"&answer_id=100";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"&attempt_id=1";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"&attempt_id=0&answer_id=100";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"&attempt_id=1&answer_id=0";
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
	url += "?username="+ test_guest_username +"&password=" + test_guest_password + "&attempt_id=" + test_attempt_id.toString() + "&answer_id=" + test_questions[0].incorrect_answer_id.toString();
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
	url += "?username="+ test_admin_username +"Stinks";
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
	url += "?username="+ test_admin_username;

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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password;
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"&question_id=28";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password;
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
	url += "?username="+ test_guest_username +"&password=" + test_guest_password + "&question_id=" + test_questions[0].id.toString();
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"&question_id=28";
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
	url += "?username="+ test_admin_username +"&password="+ test_admin_password +"3";
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

function TestCosmosLiveAdminInvalidAuthKeyBypassesUserAuth() {
	var functionName = "TestCosmosLiveAdminInvalidAuthKeyBypassesUserAuth\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/live";
	url += "?admin_auth_key=" + test_invalid_admin_auth_key;
	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 117) {
		failures += "  - op was " + response.op + ", expected 117\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveAdminValidAuthKeyBypassesUserAuth() {
	var functionName = "TestCosmosLiveAdminValidAuthKeyBypassesUserAuth\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/live";
	url += "?admin_auth_key=" + test_valid_admin_auth_key;
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

function TestCosmosLiveSubmitAnswerReturnsRequest() {
	var functionName = "TestCosmosLiveSubmitReturnsRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveRegisterAdmin";

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

	var requestString = "liveRegisterAdmin";

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
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
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
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
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
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
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
			
			if (response.payload.cosmos_live_session.round_seconds_remaining == undefined) {
				failures += "  - IN_GAME state requires round's round_seconds_remaining in the payload\n";
				success = false;
			}

			if (response.payload.cosmos_live_session.player_count == undefined) {
				failures += "  - IN_GAME state requires round's 'player_count' in the payload\n";
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

function TestCosmosLivePostGameLobbyReturnsCorrectData() {
	var functionName = "TestCosmosLivePostGameLobbyReturnsCorrectData\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
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
		if (response.payload.cosmos_live_session.state != "POST_GAME_LOBBY") {
			failures += "  - payload's 'state' was " + response.payload.cosmos_live_session.state + ", expected 'POST_GAME_LOBBY'\n";
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

function TestSubmitIncorrectCosmosLiveAnswer(username, password, session_id, question) {
	var functionName = "TestSubmitIncorrectCosmosLiveAnswer\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveRegisterAdmin";

	var url = server + "/" + requestString;
	url += "?username="+ username +"&password="+ password +"&session_id=" + session_id + "&answer_id=" + question.incorrect_answer_id;
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

function TestSubmitCorrectCosmosLiveAnswer(username, password, session_id, question) {
	var functionName = "TestSubmitCorrectCosmosLiveAnswer\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveRegisterAdmin";

	var url = server + "/" + requestString;
	url += "?username="+ username +"&password="+ password +"&session_id=" + session_id + "&answer_id=" + question.correct_answer_id;
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

function TestCosmosLiveInGameReturnsCorrectPlayerCount(expected_player_count) {
	var functionName = "TestCosmosLiveInGameReturnsCorrectPlayerCount\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
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

	var player_count = response.payload.cosmos_live_session.player_count;
	if (player_count != expected_player_count) {
		failures += "  - player count was "+ player_count +", expected "+ expected_player_count +"\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveInGameReturnsPlayerTypePlayer(username, password) {
	var functionName = "TestCosmosLiveInGameReturnsPlayerTypePlayer\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username="+ username +"&password=" + password;
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
		failures += "  - player type was '"+ playerType +", expected "+ PLAYER +"\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveInGameReturnsPlayerTypeSpectator(username, password) {
	var functionName = "TestCosmosLiveInGameReturnsPlayerTypeSpectator\n";
	var failures = "";
	testsRanCount++;

	var requestString = "live";

	var url = server + "/" + requestString;
	url += "?username="+ username +"&password=" + password;
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

	var requestString = "liveRegisterAdmin";

	var url = server + "/" + requestString;
	url += "?username="+ test_guest_username +"&password=" + test_guest_password + "&session_id=" + session_id + "&answer_id=" + question.correct_answer_id;
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

function TestCosmosLiveAdminReturnsResponse() {
	var functionName = "TestCosmosLiveAdminReturnsResponse\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

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
	}
}

function TestCosmosLiveAdminInvalidAdminAuthKey() {
	var functionName = "TestCosmosLiveAdminInvalidAdminAuthKey\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

	var url = server + "/" + requestString;
	url += "?admin_auth_key=" + test_invalid_admin_auth_key;

	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 117) {
		failures += "  - op was " + response.op + ", expected 117\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveAdminInvalidRequest() {
	var functionName = "TestCosmosLiveAdminInvalidRequest\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

	var url = server + "/" + requestString;
	url += "?request=invalid&admin_auth_key=" + test_valid_admin_auth_key;

	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 118) {
		failures += "  - op was " + response.op + ", expected 118\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveAdminValidAuthKey() {
	var functionName = "TestCosmosLiveAdminValidAuthKey\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

	var url = server + "/" + requestString;
	url += "?admin_auth_key=" + test_valid_admin_auth_key;

	var response = GetHTTPResponse(url);

	var success = true;
	if (response.success) {
		failures += "  - success was true, expected false\n";
		success = false;
	}

	if (response.op != 118) {
		failures += "  - op was " + response.op + ", expected 118\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}
}

function TestCosmosLiveAdminTransitionToClosedState() {
	var functionName = "TestCosmosLiveAdminTransitionToClosedState\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

	var url = server + "/" + requestString;
	url += "?request=transition_state&state=closed&admin_auth_key=" + test_valid_admin_auth_key;

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

function TestCosmosLiveAdminTransitionToPreGameLobbyState() {
	var functionName = "TestCosmosLiveAdminTransitionToPreGameLobbyState\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

	var url = server + "/" + requestString;
	url += "?request=transition_state&state=pre_game_lobby&admin_auth_key=" + test_valid_admin_auth_key;

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

function TestCosmosLiveAdminTransitionToInGameState() {
	var functionName = "TestCosmosLiveAdminTransitionToInGameState\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

	var url = server + "/" + requestString;
	url += "?request=transition_state&state=in_game&admin_auth_key=" + test_valid_admin_auth_key;

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

function TestCosmosLiveAdminTransitionToPostGameLobbyState() {
	var functionName = "TestCosmosLiveAdminTransitionToPostGameLobbyState\n";
	var failures = "";
	testsRanCount++;

	var requestString = "liveAdmin";

	var url = server + "/" + requestString;
	url += "?request=transition_state&state=post_game_lobby&admin_auth_key=" + test_valid_admin_auth_key;

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

function TestCosmosLiveAdminAdvanceRound() {
	var functionName = "TestCosmosLiveAdminAdvanceRound\n";
	var failures = "";
	testsRanCount++;

	var roundBefore = -1;
	var roundAfter = -1;


	var requestString = "live";
	var url = server + "/" + requestString;
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
	var response = GetHTTPResponse(url);
	roundBefore = response.payload.cosmos_live_session.round;


	requestString = "liveAdmin";

	url = server + "/" + requestString;
	url += "?request=advance_round&admin_auth_key=" + test_valid_admin_auth_key;

	response = GetHTTPResponse(url);

	var success = true;
	if (false == response.success) {
		failures += "  - success was false, expected true\n";
		success = false;
	}

	if (response.op != 0) {
		failures += "  - op was " + response.op + ", expected 0\n";
		success = false;
	}

	var requestString = "live";
	var url = server + "/" + requestString;
	url += "?username="+ test_guest_username +"&password=" + test_guest_password;
	var response = GetHTTPResponse(url);
	roundAfter = response.payload.cosmos_live_session.round;

	if (roundBefore == roundAfter) {
		failures += "  - round failed to advance.\n";
		success = false;
	}

	if (false == success) {
		functionName += failures;
		failedTests += functionName;
		testsFailedCount++;
	}	
}

function UTIL_CREATE_ADMIN_PRIVILEGE(dbm, callback) {
	var sql = "insert into privileges_enum (privilege) values (?)";
	var params = ["ADMIN"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function UTIL_CREATE_GUEST_PRIVILEGE(dbm, callback) {
	var sql = "insert into privileges_enum (privilege) values (?)";
	var params = ["GUEST"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function UTIL_CREATE_ADMIN_USER(dbm, callback) {
	var sql = "insert into users (username, email, password_salt, access_level, added) values (?, ?, ?, ?, now())";
	var params = [test_admin_username, test_admin_password, "admin", 4];
	dbm.ParameterizedInsert(sql, params, function (user_id, err) {
		test_admin_user_id = user_id;
		callback();
	});
}

function UTIL_CREATE_GUEST_USER(dbm, callback) {
	var sql = "insert into users (username, email, password_salt, access_level, added) values (?, ?, ?, ?, now())";
	var params = [test_guest_username, test_guest_password, "guest", 5];
	dbm.ParameterizedInsert(sql, params, function (user_id, err) {
		test_guest_user_id = user_id;
		callback();
	});
}

function UTIL_CREATE_QUESTIONS(dbm, callback) {
	var question = "How many moons does planet Earth have?";
	UTIL_CREATE_QUESTION(dbm, question, function() {
		var question = "How many moons does planet Mars have?";
		UTIL_CREATE_QUESTION(dbm, question, function() {
			var question = "How many moons does planet Venus have?";
			UTIL_CREATE_QUESTION(dbm, question, function() {
				var question = "How many moons does planet Saturn have?";
				UTIL_CREATE_QUESTION(dbm, question, function() {
					callback();
				});
			});
		});
	});
}

function UTIL_CREATE_QUESTION(dbm, questionStr, callback) {
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

function UTIL_CREATE_CHALLENGE_ATTEMPT(dbm, callback) {
	var sql = "insert into challenge_attempts (user_id, added) values (?, now())";
	var params = [test_guest_user_id];
	dbm.ParameterizedInsert(sql, params, function (attempt_id, err) {
		test_attempt_id = attempt_id;
		callback();
	});
}

function UTIL_CREATE_CHALLENGE_MODE_CONFIG_TIMER(dbm, callback) {
	var sql = "insert into config (`key`, value) values (?, ?)";
	var params = ["challenge_mode_timer_length", "15"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function UTIL_CREATE_COSMOS_LIVE_CONFIG_QUESTION_TIMER(dbm, callback) {
	var sql = "insert into config (`key`, value) values (?, ?)";
	var params = ["live_mode_question_timer_length", "15"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function UTIL_CREATE_COSMOS_LIVE_CONFIG_ROUND_TIMER(dbm, callback) {
	var sql = "insert into config (`key`, value) values (?, ?)";
	var params = ["live_mode_round_timer_length", "30"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function UTIL_CREATE_HEALTH_CHECK_KEY(dbm, callback) {
	var sql = "insert into health (health_string) values (?)";
	var params = ["gaga X ari"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function UTIL_CREATE_CLOSED_COSMOS_LIVE_SESSION(dbm, callback) {
	var sql = "insert into cosmos_live_sessions (state, start) values (?, ?)";
	var params = ["CLOSED", "2021-01-01"];
	dbm.ParameterizedInsert(sql, params, function (session_id, err) {
		test_cosmos_live_session_id = session_id;
		callback();
	});
}

function UTIL_ADVANCE_COSMOS_LIVE_SESSION_TO_PRE_GAME_LOBBY(dbm, callback) {
	var sql = "update cosmos_live_sessions set state = ?, asked_questions_ids = ?";
	var params = ["PRE_GAME_LOBBY", test_questions[0].id.toString()];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});	
}

function UTIL_ADVANCE_COSMOS_LIVE_SESSION_TO_IN_GAME(dbm, callback) {
	var sql = "update cosmos_live_sessions set state = ?, start = now()";
	var params = ["IN_GAME"];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});	
}

function UTIL_ADVANCE_COSMOS_LIVE_ROUND(dbm, rounds, callback) {
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

function UTIL_TRUNCATE_SESSION_ANSWERS(dbm, callback) {
	var sql = "truncate cosmos_live_answers";
	var params = [];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});	
}

function UTIL_INSERT_COSMOS_LIVE_ANSWER(dbm, user_id, answer_id, callback) {
	var sql = "insert into cosmos_live_answers (session_id, user_id, answer_id, added) values (?, ?, ?, now())";
	var params = [test_cosmos_live_session_id, user_id, answer_id];
	dbm.ParameterizedInsert(sql, params, function (results, err) {
		callback();
	});
}

function UTIL_CREATE_ADMIN_AUTH_KEY(dbm, callback) {
	var sql = "insert into config (`key`, value) values (?, ?)";
	var params = ["admin_auth_key", test_valid_admin_auth_key];
	dbm.ParameterizedInsert(sql, params, function (response, err) {
		callback();
	});
}

function GetDBM() {
	var database_connection = config_loader.GetDatabaseConnectionInfo();
	var dbm = new DBM(database_connection);

	return dbm;
}

var test_admin_username = "testadmin";
var test_admin_password = "admin";
var test_admin_user_id = -1;
var test_guest_username = "testguest";
var test_guest_password = "guest";
var test_guest_user_id = -1;
var test_attempt_id = -1;
var test_questions = [];
var test_cosmos_live_session_id = -1;
var test_valid_admin_auth_key = "mega_auth_key";
var test_invalid_admin_auth_key = "mega_auth_key_invalid";

function Setup(callback) {
	var dbm = GetDBM();

	UTIL_CREATE_ADMIN_PRIVILEGE(dbm, function() {
		UTIL_CREATE_GUEST_PRIVILEGE(dbm, function() {
			UTIL_CREATE_ADMIN_USER(dbm, function() {
				UTIL_CREATE_GUEST_USER(dbm, function() {
					UTIL_CREATE_QUESTIONS(dbm, function() {
						UTIL_CREATE_CHALLENGE_ATTEMPT(dbm, function() {
							UTIL_CREATE_CHALLENGE_MODE_CONFIG_TIMER(dbm, function() {
								UTIL_CREATE_COSMOS_LIVE_CONFIG_QUESTION_TIMER(dbm, function() {
									UTIL_CREATE_COSMOS_LIVE_CONFIG_ROUND_TIMER(dbm, function() {
										UTIL_CREATE_HEALTH_CHECK_KEY(dbm, function() {
											UTIL_CREATE_ADMIN_AUTH_KEY(dbm, function() {
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
	UTIL_CREATE_CLOSED_COSMOS_LIVE_SESSION(dbm, function() {
		TestCosmosLiveClosedReturnsCorrectData();

		TestCosmosLiveAdminInvalidAuthKeyBypassesUserAuth();
		TestCosmosLiveAdminValidAuthKeyBypassesUserAuth();

		//pre game lobby
		UTIL_ADVANCE_COSMOS_LIVE_SESSION_TO_PRE_GAME_LOBBY(dbm, function() {
			TestCosmosLivePreGameLobbyReturnsCorrectData();

			//in game
			UTIL_ADVANCE_COSMOS_LIVE_SESSION_TO_IN_GAME(dbm, function() {
				TestCosmosLiveInGameReturnsCorrectData();
				TestCosmosLiveInGameReturnsPlayerTypePlayer(test_guest_username, test_guest_password);

				TestSubmitIncorrectCosmosLiveAnswer(test_guest_username, test_guest_password, test_cosmos_live_session_id, test_questions[0]);
				TestCosmosLiveInGameReturnsPlayerTypeSpectator(test_guest_username, test_guest_password);

				UTIL_TRUNCATE_SESSION_ANSWERS(dbm, function() {
					UTIL_ADVANCE_COSMOS_LIVE_ROUND(dbm, 2, function() {
						// testing against submitting answer to old question
						TestSubmitCorrectCosmosLiveAnswer(test_guest_username, test_guest_password, test_cosmos_live_session_id, test_questions[0]);
						TestCosmosLiveInGameReturnsPlayerTypeSpectator(test_guest_username, test_guest_password);

						UTIL_INSERT_COSMOS_LIVE_ANSWER(dbm, test_guest_user_id, test_questions[0].correct_answer_id, function() {
							TestCosmosLiveInGameReturnsCorrectPlayerCount(1);
							UTIL_INSERT_COSMOS_LIVE_ANSWER(dbm, test_admin_user_id, test_questions[0].correct_answer_id, function() {
								TestCosmosLiveInGameReturnsCorrectPlayerCount(2);

								TestSubmitCorrectCosmosLiveAnswer(test_guest_username, test_guest_password, test_cosmos_live_session_id, test_questions[1]);
								TestCosmosLiveInGameReturnsPlayerTypePlayer(test_guest_username, test_guest_password);

								TestSubmitIncorrectCosmosLiveAnswer(test_admin_username, test_admin_password, test_cosmos_live_session_id, test_questions[1]);
								TestCosmosLiveInGameReturnsPlayerTypeSpectator(test_admin_username, test_admin_password);
								TestCosmosLiveInGameReturnsCorrectPlayerCount(2); //admin is "player" until the next round starts
								UTIL_ADVANCE_COSMOS_LIVE_ROUND(dbm, 3, function() {
									TestCosmosLiveInGameReturnsCorrectPlayerCount(1); // pt. 2 - see above, at this point admin is no longer a player
									TestSubmitIncorrectCosmosLiveAnswer(test_guest_username, test_guest_password, test_cosmos_live_session_id, test_questions[2]);

									TestCosmosLiveAdminReturnsResponse();
									TestCosmosLiveAdminInvalidRequest();
									TestCosmosLiveAdminInvalidAdminAuthKey();
									TestCosmosLiveAdminValidAuthKey();

									TestCosmosLiveAdminTransitionToClosedState();
									TestCosmosLiveClosedReturnsCorrectData();

									TestCosmosLiveAdminTransitionToPreGameLobbyState();
									TestCosmosLivePreGameLobbyReturnsCorrectData();

									TestCosmosLiveAdminTransitionToInGameState();
									TestCosmosLiveInGameReturnsCorrectData();

									TestCosmosLiveAdminAdvanceRound();
									TestCosmosLiveInGameReturnsCorrectData();
									TestCosmosLiveInGameReturnsCorrectPlayerCount(0); // pt. 3 - see above, at this point guest is no longer a player

									TestCosmosLiveAdminTransitionToPostGameLobbyState();
									TestCosmosLivePostGameLobbyReturnsCorrectData();

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