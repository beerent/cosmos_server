var game_timer = 0;
var game_timer_on = true;
var breakTimer = false;

function loadInnerHTML(url, pageElement) {
  try {
    req = new XMLHttpRequest();
    /* e.g. Firefox */
  } catch(e) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
      /* some versions IE */
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        /* some versions IE */
      } catch (e) {
        req = false;
      }
    }
  }
  req.onreadystatechange = function() {set(pageElement);};
  req.open("GET",url,true);
  req.send(null);
}

function set(pageElement) {
  if(req.status == 200) {
    output = req.responseText;
    document.getElementById(pageElement).innerHTML = output;
  }
}

function execute(url) {
  try {
    req = new XMLHttpRequest();
    /* e.g. Firefox */
  } catch(e) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
      /* some versions IE */
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        /* some versions IE */
      } catch (e) {
        req = false;
      }
    }
  }

  req.open("GET",url,true);
  req.send(null);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function GetObject(id) {
  return document.getElementById(id);
}

function GetValue(id) {
  return GetObject(id).value;
}

/*****************/
/***  BUCKETS  ***/
/*****************/

function AddBucket(bucketName) {
  execute("./BucketHelper.php?option=add&name=" + bucketName, 'fakediv');
}

function DisableBuckets() {
  var bucketTable = document.getElementById("enabled_bucket_table");
    if (bucketTable == null) {
    return;
  }

  var bucketTableCount = bucketTable.rows.length;

  for (var i = 1; i < bucketTableCount; i++) {
    var bucketId = bucketTable.rows[i].cells[0].innerHTML;
    var bucketName = bucketTable.rows[i].cells[1].innerHTML;
    var bucketHtml = bucketTable.rows[i].cells[3].innerHTML;
    var start = bucketHtml.indexOf("id=") + 4;
    var end = bucketHtml.indexOf(">") - 1;
    
    var id = bucketHtml.substring(start, end);
    var isChecked = GetObject(id).checked;

    if (!isChecked) {
      continue;
    }

    //if (confirm ("disable " + bucketName + "?")) {
    execute("./BucketHelper.php?option=disable&id=" + bucketId, 'fakediv');
    //}
  }
}

function EnableBuckets() {
  var bucketTable = document.getElementById("disabled_bucket_table");
  if (bucketTable == null) {
    return;
  }

  var bucketTableCount = bucketTable.rows.length;
  
  for (var i = 1; i < bucketTableCount; i++) {
    var bucketId = bucketTable.rows[i].cells[0].innerHTML;
    var bucketHtml = bucketTable.rows[i].cells[2].innerHTML;
    var start = bucketHtml.indexOf("id=") + 4;
    var end = bucketHtml.indexOf(">") - 1;
    
    var id = bucketHtml.substring(start, end);
    var isChecked = GetObject(id).checked;

    if (!isChecked) {
      continue;
    }

    execute("./BucketHelper.php?option=enable&id=" + bucketId, 'fakediv');
  }
}

function RenameBuckets() {
  var bucketTable = document.getElementById("enabled_bucket_table");
    if (bucketTable == null) {
    return;
  }

  var bucketTableCount = bucketTable.rows.length;
  
  for (var i = 1; i < bucketTableCount; i++) {
    var bucketId = bucketTable.rows[i].cells[0].innerHTML;

    var bucketHtml = bucketTable.rows[i].cells[2].innerHTML;
    var start = bucketHtml.indexOf("id=") + 4;
    var end = bucketHtml.indexOf(">") - 1;
    
    var id = bucketHtml.substring(start, end);
    var newValue = GetValue(id);
    
    if (newValue == "") {
      continue;
    }

    execute("./BucketHelper.php?option=rename&id=" + bucketId + "&new=" + newValue, 'fakediv');
  }
}
/*****************/
/*** QUESTIONS ***/
/*****************/

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

    execute("./QuestionHelper.php?option=enable&id=" + questionId, 'fakediv');
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

    //if (confirm ("disable " + questionName + "?")) {
    execute("./QuestionHelper.php?option=disable&id=" + questionId, 'fakediv');
    //}
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
    execute("./QuestionHelper.php?option=update&id=" + questionId + "&new=" + newQuestionValue, 'fakediv');
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
      execute("./AnswerHelper.php?option=update&id=" + answerId + "&new=" + newAnswerValue, 'fakediv');
    }
  }
}

function OnEditQuestionClicked(questionId) {
  window.open('./question_edit.php?id=' + questionId, 'Edit Question'); 
  GetObject('updateID').innerHTML="<h3><font color='red'>refresh page for to see changes</font></h3><br><button onclick='location.reload();'>refresh</button><br><br>";
}

function UpdateQuestionsBucket(questionId, currentBucketId) {
  var newBucketId = GetValue('new_bucket_select');
  
  if (currentBucketId == newBucketId) {
    return;
  }

  execute("./QuestionHelper.php?option=updateBucket&id=" + questionId + "&new=" + newBucketId, 'fakediv');

}

function AddQuestion() {
  var question = GetValue("question");
  var correctAnswer = GetValue("correct_answer");
  var wrongAnswer1 = GetValue("wrong_answer1");
  var wrongAnswer2 = GetValue("wrong_answer2");
  var wrongAnswer3 = GetValue("wrong_answer3");
  var wrongAnswer4 = GetValue("wrong_answer4");
  var wrongAnswer5 = GetValue("wrong_answer5");
  var wrongAnswer6 = GetValue("wrong_answer6");
  var wrongAnswer7 = GetValue("wrong_answer7");
  var wrongAnswer8 = GetValue("wrong_answer8");
  var wrongAnswer9 = GetValue("wrong_answer9");
  var wrongAnswer10 = GetValue("wrong_answer10");
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

  var urlArgs = "q=" + question;
  urlArgs += "&c=" + correctAnswer;
  urlArgs += "&w1=" + wrongAnswer1;
  urlArgs += "&w2=" + wrongAnswer2;
  urlArgs += "&w3=" + wrongAnswer3;
  if (wrongAnswer4 != "")
    urlArgs += "&w4=" + wrongAnswer4;
  if (wrongAnswer5 != "")
    urlArgs += "&w5=" + wrongAnswer5;
  if (wrongAnswer6 != "")
    urlArgs += "&w6=" + wrongAnswer6;
  if (wrongAnswer7 != "")
    urlArgs += "&w7=" + wrongAnswer7;
  if (wrongAnswer8 != "")
    urlArgs += "&w8=" + wrongAnswer8;
  if (wrongAnswer9 != "")
    urlArgs += "&w9=" + wrongAnswer9;
  if (wrongAnswer10 != "")
    urlArgs += "&w10=" + wrongAnswer10;
  urlArgs+= "&b=" + bucketId;

  execute("./QuestionHelper.php?option=add&" + urlArgs, 'fakediv');
  return true;
}


function MarkAsQuestionAdded() {
  GetObject('question_added').innerHTML = "<h3><font color='red'>Question Added!</font></h3>";
  setTimeout(function(){ GetObject('question_added').innerHTML = ""; }, 2000);

}

function ClearAddQuestionFields() {
  GetObject("question").value="";
  GetObject("correct_answer").value="";
  GetObject("wrong_answer1").value="";
  GetObject("wrong_answer2").value="";
  GetObject("wrong_answer3").value="";
  GetObject("wrong_answer4").value="";
  GetObject("wrong_answer5").value="";
  GetObject("wrong_answer6").value="";
  GetObject("wrong_answer7").value="";
  GetObject("wrong_answer8").value="";
  GetObject("wrong_answer9").value="";
  GetObject("wrong_answer10").value="";
}

function AddBlogPost() {
  var blogPost = GetValue("add_blog_text");
  var blogAuthor = GetValue("add_blog_name");

  if (blogPost == "" || blogPost == "enter blog post here..." || blogAuthor == "") {
    alert ("invalid blog post. blog and name are required.");
    return;
  }

  blogPost = ReplaceAll(blogPost, "\n", "{n}");

  execute("./BlogHelper.php?option=add&blog=" + blogPost + "&name=" + blogAuthor, 'fakediv');

  GetObject('blog_post_post').innerHTML = "<h3><font color='red'>Blog Post Added :)</font></h3>";
  setTimeout(function(){ GetObject('blog_post_post').innerHTML = ""; }, 3000);
  GetObject('add_blog_text').value = "enter blog post here...";
  GetObject('add_blog_name').value = "";

}

function ReplaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}





















