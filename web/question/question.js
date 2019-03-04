function AddNewWrongAnswerField() {
  var tableObject = GetObject("new_question_table");

  var row = tableObject.insertRow();
  
  var x = row.insertCell(0);
  x.innerHTML = "Wrong Answer";


  x = row.insertCell(1);
  x.innerHTML = '<input type="text" name="extra_wrong_answer" value="" size="60" maxlength="150">';
}

function UpdateManageQuestionsPage() {
  var bucketId = GetValue("bucket_select");
  var enabled = GetObject("enabled_checked").checked;
  var flagged = GetObject("flagged_checked").checked;

  var enabledString = "0";
  if (enabled) {
    enabledString = "1";
  }

  var flaggedString = "0";
  if (flagged) {
    flaggedString = "1";
  }

  window.location.replace("/question/manage_questions.php?id=" + bucketId + "&enabled=" + enabledString  + "&flagged=" + flaggedString);
}

function OnEditQuestionClicked(questionId) {
  window.open('/question/edit_question.php?id=' + questionId, 'Edit Question'); 
  GetObject('updateID').innerHTML="<h3><font color='red'>refresh page for to see changes</font></h3><br><button onclick='location.reload();'>refresh</button><br><br>";
}

function AddQuestion() {
  var question = GetValue("question");
  var questionCitation = GetValue("question_citation");
  var correctAnswer = GetValue("correct_answer");
  var wrongAnswer1 = GetValue("wrong_answer1");
  var wrongAnswer2 = GetValue("wrong_answer2");
  var wrongAnswer3 = GetValue("wrong_answer3");

  var extraWrongAnswers = [];
  var extraWrongAnswerFields = GetObjectsByName("extra_wrong_answer");
  for (var i = 0; i < extraWrongAnswerFields.length; i++) {
    extraWrongAnswers.push(extraWrongAnswerFields[i].value);
  }

  var bucketChecklist = GetObjectsByName("new_question_buckets");
  var bucketsChecked = [];
  bucketChecklist.forEach(function(bucket) {
    if (bucket.checked) {
      bucketsChecked.push(bucket.value);
    }
  });

  if (question == "") {
    alert ("missing question field!");
    return false;
  }

  if (questionCitation == "") {
    alert ("missing citation field!");
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

  if (bucketsChecked.length == 0) {
    alert ("missing bucket!");
    return false;
  }

  var urlArgs = "q=" + question;
  urlArgs += "&ci=" + questionCitation;
  urlArgs += "&c=" + correctAnswer;
  urlArgs += "&w1=" + wrongAnswer1;

  if (wrongAnswer2 != "") {
    urlArgs += "&w2=" + wrongAnswer2;
  }

  if (wrongAnswer3 != "") {
    urlArgs += "&w3=" + wrongAnswer3;
  }

  for (var i = 0; i < bucketsChecked.length; i++) {
    var bucketId = bucketsChecked[i];
    urlArgs += "&b" + (i + 1) + "=" + bucketId;
  }

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
  GetObject("question_citation").value="";
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

function AddToCitationUpdateQueue(questionId, elementId, originalText) {
  var citationsToUpdate = GetObject("citations_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (citationsToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += questionId + "{{}}" + newText;
  citationsToUpdate.innerHTML = citationsToUpdate.innerHTML + queryString;
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

function AddAnswerToDeleteQueue(answerId, elementId, elementDeleteId) {
  var answersToDelete = GetObject("answers_to_delete");
  var textObject = GetObject(elementId);
  var deleteObject = GetObject(elementDeleteId);

  if (!confirm("Delete answer '" + textObject.value + "'?")) {
    return;
  }

  deleteObject.disabled = true;

  var queryString = "";
  if (answersToDelete.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += answerId;
  answersToDelete.innerHTML = answersToDelete.innerHTML + queryString;
  UpdateTextToDarkRed(textObject);

  return true;
}

function AddAnswerToAddQueue(questionId, elementId) {
  var answersToAdd = GetObject("answers_to_add");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  if (newText == "") {
    alert("oops! add text to your new wrong answer!");
    return;
  }

  var queryString = "";
  if (answersToAdd.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += questionId + "{{}}" + newText;
  answersToAdd.innerHTML = answersToAdd.innerHTML + queryString;
  textObject.value = "";

  alert("answer added!");
}

function AddToUpdateBucketsQueue(questionId, bucketId, originalState, currentState, cellElementId) {
  var bucketsToUpdate = GetObject("buckets_to_update");
  var cellElement = GetObject(cellElementId);

  var queryString = "";
  if (bucketsToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += questionId + "{{}}" + bucketId + "{{}}" + currentState;
  bucketsToUpdate.innerHTML = bucketsToUpdate.innerHTML + queryString;

  if (("" + originalState) == ("" + currentState)) {
    UpdateTextToBlack(cellElement);
  } else {
    UpdateTextToRed(cellElement);
  }
}

function AddToQuestionUnflagQueue(questionId) {
  var questionsToUnflag = GetObject("questions_to_unflag");

  var queryString = "";
  if (questionsToUnflag.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += questionId;
  questionsToUnflag.innerHTML = questionsToUnflag.innerHTML + queryString;
}

function AddToUpdateReviewQueue(elementId, questionId, reviewerId, originalState, currentState) {
  var reviewsToUpdate = GetObject("reviews_to_update");
  var element = GetObject(elementId);

  var op = "-";
  if (currentState) {
    op = "+";
  }

  var queryString = "";
  if (reviewsToUpdate.innerHTML != "") {
    queryString += "(())";
  }

  queryString += questionId + "{{}}" + reviewerId + "{{}}" + op;
  reviewsToUpdate.innerHTML = reviewsToUpdate.innerHTML + queryString;

  if (originalState == currentState) {
    UpdateTextToBlack(element);
  } else {
    UpdateTextToRed(element);
  }
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

function CommitCitationUpdates() {
  var questionsToUpdate = GetObject("citations_to_update");
  var entries = questionsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/question/QuestionHelper.php?option=updateCitation&id=" + id + "&new=" + newValue, 'fakediv');
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

function CommitAnswerAdds() {
  var questionsToUpdate = GetObject("answers_to_add");
  var entries = questionsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    var id = entry[0];
    var newValue = entry[1];
    execute("/answer/AnswerHelper.php?option=add&questionId=" + id + "&answer=" + newValue, 'fakediv');
  });

  return true;
}

function CommitAnswerDeletes() {
  var questionsToUpdate = GetObject("answers_to_delete");
  var entries = questionsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(id) {
    execute("/answer/AnswerHelper.php?option=delete&id=" + id, 'fakediv');
  });

  return true;
}

function CommitBucketUpdates() {
  var questionsToUpdate = GetObject("buckets_to_update");
  var entries = questionsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    var questionId = entry[0];
    var bucketId = entry[1];
    var checked = entry[2] == "true";

    var mapKey = questionId + "{{}}" + bucketId;
    map[mapKey] = checked;
  });

  Object.keys(map).forEach(function(mappingKey) {
    var checked = map[mappingKey];
    var values = mappingKey.split("{{}}");
    var questionId = values[0];
    var bucketId = values[1];

    if (checked) {
      execute("/question/QuestionHelper.php?option=addMapping&qid=" + questionId + "&bid=" + bucketId, 'fakediv');
    } else {
      execute("/question/QuestionHelper.php?option=deleteMapping&qid=" + questionId + "&bid=" + bucketId, 'fakediv');
    }
  });

  return true;
}

function CommitReviewUpdates() {
  var reviewsToUpdate = GetObject("reviews_to_update");
  var entries = reviewsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    var questionId = entry[0];
    var reviewerId = entry[1];
    var add = entry[2] == "+";

    var mapKey = questionId + "{{}}" + reviewerId;
    map[mapKey] = add;
  });

  Object.keys(map).forEach(function(mappingKey) {
    var add = map[mappingKey];
    var values = mappingKey.split("{{}}");
    var questionId = values[0];
    var reviewerId = values[1];

    if (add) {
      execute("/review/ReviewHelper.php?option=add&qid=" + questionId + "&rid=" + reviewerId, 'fakediv');
    } else {
      execute("/review/ReviewHelper.php?option=remove&qid=" + questionId + "&rid=" + reviewerId, 'fakediv');
    }
  });

  return true;
}

function CommitUnflaggedQuestions() {
  var questionsToUnflag = GetObject("questions_to_unflag");
  var entries = questionsToUnflag.innerHTML.split("(())");

  var updated = [];
  entries.forEach(function(questionId) {
    if (updated.includes(questionId) == false) {
      execute("/question/QuestionHelper.php?option=unflag&qid=" + questionId, 'fakediv');
      updated.push(questionId);
    }
  });
  
  return true;
}

function ClearAddQuestionBuckets() {
  var bucketChecklist = GetObjectsByName("new_question_buckets");
  bucketChecklist.forEach(function(bucket) {
    bucket.checked = false;
  });
}































