var express = require('express');
var app = express();
var fs = require("fs");

var DBM = require("./database/DBM.js");
var QuestionManager = require("./question/QuestionManager.js");
var dbm = new DBM();





app.get('/listQuestions', function (req, res) {
	var question_manager = new QuestionManager(dbm);
	var questions = question_manager.GetAllQuestions(function (questions) {
		res.json(questions);
		console.log("[SERVER] sent questions.");
	});
});





var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("istening at http://%s:%s", host, port)
});



