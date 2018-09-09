function AddNewWrongAnswerField() {
  var wrongAnswersHtml = GetObject("new_questions_field");
  wrongAnswersHtml.insertAdjacentHTML('beforeend', 'Wrong Answer<input type="text" name="extra_wrong_answer" value="" maxlength="150"> <br>');
}

function UpdateQuestionsPage(bucketId) {
  window.location.replace(window.location.href.substring(0, window.location.href.indexOf("?")) + "?id=" + bucketId);
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

function AddToQuestionUpdateQueue(questionId, elementId, originalText) {
  var questionsToUpdate = GetObject("questions_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (questionsToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += questionId + "{{}}" + newText;
  questionsToUpdate.innerHTML = questionsToUpdate.innerHTML + queryString;
  UpdateTextColorIfChanged(textObject, originalText);
}

function AddToQuestionEnableUpdateQueue(questionId, elementId, originalText) {
  var questionsToToggleEnable = GetObject("questions_to_toggle_enable");
  var textObject = GetObject(elementId);
  var newValue = GetValue(elementId);

  var queryString = "";
  if (questionsToToggleEnable.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += questionId + "{{}}" + newValue;
  questionsToToggleEnable.innerHTML = questionsToToggleEnable.innerHTML + queryString;

  if (newValue == "enabled") {
    textObject.value="DISABLED";
  } else {
    textObject.value="enabled";
  }
  UpdateTextColorIfChanged(textObject, originalText);
}

function AddToAnswerUpdateQueue(answerId, elementId, originalText) {
  var answersToUpdate = GetObject("answers_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (answersToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += answerId + "{{}}" + newText;
  answersToUpdate.innerHTML = answersToUpdate.innerHTML + queryString;
  UpdateTextColorIfChanged(textObject, originalText);
}

function CommitQuestionUpdates() {
  var questionsToUpdate = GetObject("questions_to_update");
  var entries = questionsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/question/QuestionHelper.php?option=update&id=" + id + "&new=" + newValue, 'fakediv');
  });

  return true;
}

function CommitToggleEnableUpdates() {
  var questionsToUpdate = GetObject("questions_to_toggle_enable");
  var entries = questionsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    if (newValue == "enabled") {
      execute("/question/QuestionHelper.php?option=disable&id=" + id, 'fakediv');    
    } else {
      execute("/question/QuestionHelper.php?option=enable&id=" + id, 'fakediv');    
    }
  });

  return true;
}

function CommitAnswerUpdates() {
  var questionsToUpdate = GetObject("answers_to_update");
  var entries = questionsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/answer/AnswerHelper.php?option=update&id=" + id + "&new=" + newValue, 'fakediv');
  });

  return true;
}


function UpdateTextColorIfChanged(textObject, originalText) {
  var newText = textObject.value;

  if (originalText == newText) {
    UpdateTextToBlack(textObject);
  } else {
    UpdateTextToRed(textObject);
  }
}

function UpdateTextToBlack(textObject) {
    textObject.style.color = "black";
}

function UpdateTextToRed(textObject) {
    textObject.style.color = "red";
}














