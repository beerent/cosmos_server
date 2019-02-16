const https = require('http');

var server = "http://127.0.0.1:8081";

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
	url += "?password=turtle12";
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
	url += "?username=beerent";
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
	url += "?username=&password=turtle12";
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
	url += "?username=beerent&password=";
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
	url += "?username=beerent1&password=turtle12";
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
	url += "?username=beerent&password=turtle123";
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
	url += "?username=beerent&password=turtle12";
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
	url += "?password=turtle12";
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
	url += "?username=beerent";
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
	url += "?username=&password=turtle12";
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
	url += "?username=beerent&password=";
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
	url += "?username=beerent1&password=turtle12";
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
	url += "?username=beerent&password=turtle123";
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
	url += "?username=beerent&password=turtle12";
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
	url += "?password=turtle12";
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
	url += "?username=beerent";
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
	url += "?username=&password=turtle12";
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
	url += "?username=beerent&password=";
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
	url += "?username=beerent1&password=turtle12";
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
	url += "?username=beerent&password=turtle123";
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
	url += "?username=beerent&password=turtle12";
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
	url += "?username=beerent&password=turtle12&attempt_id=0";
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
	var functionName = "TestGetChallengeQuestionsValidUserInvalidAttemptId\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getChallengeQuestions";
	url += "?username=beerent&password=turtle12&attempt_id=1";
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
	url += "?password=turtle12";
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
	url += "?username=beerent";
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
	url += "?username=&password=turtle12";
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
	url += "?username=beerent&password=";
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
	url += "?username=beerent1&password=turtle12";
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
	url += "?username=beerent&password=turtle123";
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
	url += "?username=beerent&password=turtle12&answer_id=100";
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
	url += "?username=beerent&password=turtle12&attempt_id=1";
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
	url += "?username=beerent&password=turtle12&attempt_id=0&answer_id=100";
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
	url += "?username=beerent&password=turtle12&attempt_id=1&answer_id=0";
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
	url += "?username=beerent&password=turtle12&attempt_id=1&answer_id=1000";
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

function TestGetUserProfileValidUserContainsChallengeStats() {
	var functionName = "TestGetUserProfileValidUserContainsChallengeStats\n";
	var failures = "";
	testsRanCount++;


	var url = server + "/getUserProfile";
	url += "?username=beerent&password=turtle12";

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
TestGetUserProfileValidUserContainsChallengeStats();


PrintResults();













