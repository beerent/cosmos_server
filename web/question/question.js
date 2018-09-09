function AddNewWrongAnswerField() {
  var wrongAnswersHtml = GetObject("new_questions_field");
  wrongAnswersHtml.insertAdjacentHTML('beforeend', 'Wrong Answer<input type="text" name="extra_wrong_answer" value="" maxlength="150"> <br>');
}

function EnableQuestions(bucketId) {
  var questionTable = document.getElementById("disabled_question_table");
    if (questionTable == null) {
    return;
  }

  var questionTableCount = questionTable.rows.length;

  for (var i = 1; i < questionTableCount; i++) {
    var questionId = questionTable.rows[i].cells[0].innerHTML;
    var questionName = questionTable.rows[i].cells[1].innerHTML;
    var isChecked = GetObject("enable_question_id_" + questionId).checked;

    if (!isChecked) {
      continue;
    }

    execute("/question/QuestionHelper.php?option=enable&id=" + questionId, 'fakediv');
  }
}

function DisableQuestions(bucketId) {
  var questionTable = document.getElementById("enabled_question_table");
    if (questionTable == null) {
    return;
  }

  var questionTableCount = questionTable.rows.length;

  for (var i = 1; i < questionTableCount; i++) {
    var questionId = questionTable.rows[i].cells[0].innerHTML;
    var questionName = questionTable.rows[i].cells[1].innerHTML;
    var isChecked = GetObject("disable_question_id_" + questionId).checked;

    if (!isChecked) {
      continue;
    }

    execute("/question/QuestionHelper.php?option=disable&id=" + questionId, 'fakediv');
  }
}

function UpdateQuestionsPage(bucketId) {
  window.location.replace(window.location.href.substring(0, window.location.href.indexOf("?")) + "?id=" + bucketId);
}

function UpdateQuestion() {
  var questionTable = document.getElementById("question_table");
    if (questionTable == null) {
    return;
  }

  var questionId = questionTable.rows[1].cells[1].innerHTML;
  var htmlTagId = "db_question_id_" + questionId;
  var newQuestionValue = GetValue(htmlTagId);
  if (newQuestionValue != "") {
    execute("/question/QuestionHelper.php?option=update&id=" + questionId + "&new=" + newQuestionValue, 'fakediv');
  }
}

function UpdateAnswers() {
  var questionTable = document.getElementById("question_table");
    if (questionTable == null) {
    return;
  }

  var questionTableCount = 6;

  for (var i = 2; i < questionTableCount; i++) {
    var answerId = questionTable.rows[i].cells[1].innerHTML;
    var htmlTagId = "db_answer_id_" + answerId;
    var newAnswerValue = GetValue(htmlTagId);
    if (newAnswerValue != "") {
      execute("/answer/AnswerHelper.php?option=update&id=" + answerId + "&new=" + newAnswerValue, 'fakediv');
    }
  }
}

function UpdateQuestionsBucket(questionId, currentBucketId) {
  var newBucketId = GetValue('new_bucket_select');
  
  if (currentBucketId == newBucketId) {
    return;
  }

  execute("/question/QuestionHelper.php?option=updateBucket&id=" + questionId + "&new=" + newBucketId, 'fakediv');
}

function OnEditQuestionClicked(questionId) {
  window.open('/question/edit_question.php?id=' + questionId, 'Edit Question'); 
  GetObject('updateID').innerHTML="<h3><font color='red'>refresh page for to see changes</font></h3><br><button onclick='location.reload();'>refresh</button><br><br>";
}

function AddQuestion() {
  var question = GetValue("question");
  var correctAnswer = GetValue("correct_answer");
  var wrongAnswer1 = GetValue("wrong_answer1");
  var wrongAnswer2 = GetValue("wrong_answer2");
  var wrongAnswer3 = GetValue("wrong_answer3");

  var extraWrongAnswers = [];
  var extraWrongAnswerFields = GetObjectsByName("extra_wrong_answer");
  for (var i = 0; i < extraWrongAnswerFields.length; i++) {
    extraWrongAnswers.push(extraWrongAnswerFields[i].value);
  }

  var bucketId = GetValue("add_to_bucket_select");

  if (question == "") {
    alert ("missing question field!");
    return false;
  }

  if (correctAnswer == "") {
    alert ("missing correctAnswer field!");
    return false;
  }

  if (wrongAnswer1 == "") {
    alert ("missing wrong answer 1 field!");
    return false;
  }

  if (wrongAnswer2 == "") {
    alert ("missing wrong answer 2 field!");
    return false;
  }

  if (wrongAnswer3 == "") {
    alert ("missing wrong answer 3 field!");
    return false;
  }

  if (bucketId == "") {
    alert ("missing bucket!");
    return false;
  }

  var urlArgs = "q=" + question;
  urlArgs += "&c=" + correctAnswer;
  urlArgs += "&w1=" + wrongAnswer1;
  urlArgs += "&w2=" + wrongAnswer2;
  urlArgs += "&w3=" + wrongAnswer3;
  urlArgs+= "&b=" + bucketId;

  var count = 4;
  for (var i = 0; i < extraWrongAnswers.length; i++) {
    var q =  extraWrongAnswers[i];
    if (q == "")
      continue;
    
    urlArgs += "&w" + (count + i) + "=" + q;
  }

  execute("/question/QuestionHelper.php?option=add&" + urlArgs, 'fakediv');
  return true;
}


function MarkAsQuestionAdded() {
  GetObject('question_added').innerHTML = "<h3><font color='red'>Question Added!</font></h3>";
  setTimeout(function(){ GetObject('question_added').innerHTML = ""; }, 2000);

}

function MarkEditPageAsEdited() {
  GetObject('updated').innerHTML="<h3><font color='red'>Updated! :)</font></h3>";
}

function ClearAddQuestionFields() {
  GetObject("question").value="";
  GetObject("correct_answer").value="";
  GetObject("wrong_answer1").value="";
  GetObject("wrong_answer2").value="";
  GetObject("wrong_answer3").value="";

  var extraWrongAnswerFields = GetObjectsByName("extra_wrong_answer");
  for (var i = 0; i < extraWrongAnswerFields.length; i++) {
    extraWrongAnswerFields[i].value = "";
  }
}



