<html lang="en">
  <head>
    <title>Edit Question</title>
    <meta charset="utf-8">
    <script src="./setInnerHTML.js"></script>
  </head>
  <body>
    <center>
    	<p id="updated"></p>

<?php
  include_once("./QuestionManager.php");
  include_once("./BucketManager.php");
  $questionManager = new QuestionManager();
  $bucketManager = new BucketManager();
  $questionId = $_GET['id'];
  $question = $questionManager->GetQuestion($questionId);

  $buckets = $bucketManager->GetEnabledBuckets();
  $questionsCurrentBucket = $bucketManager->GetBucketForQuestion($questionId);

  $table = "<table border=\"1\" id=\"question_table\">";
  $table .= "<tr><td>Field</td><td>ID</td><td>Current</td><td>New</td></tr>";

  $table .= "<tr><td>Question</td><td>". $question->GetId() ."</td><td>". $question->GetQuestion() ."</td><td><input type=\"text\" name=\"reword\" id=\"db_question_id_" . $question->GetId() . "\"></td></tr>";
  $correctAnswer = $question->GetCorrectAnswer();
  $table .= "<tr><td>Correct Answer</td><td>". $correctAnswer->GetId() ."</td><td>". $correctAnswer->GetAnswer() ."</td><td><input type=\"text\" name=\"reword\" id=\"db_answer_id_" . $correctAnswer->GetId() . "\"></td></tr>";
  
  $wrongAnswers = $question->GetwrongAnswers();
  foreach ($wrongAnswers as $wrongAnswer) {
  	$table .= "<tr><td>Wrong Answer</td><td>". $wrongAnswer->GetId() ."</td><td>". $wrongAnswer->GetAnswer() ."</td><td><input type=\"text\" name=\"reword\" id=\"db_answer_id_" . $wrongAnswer->GetId() . "\"></td></tr>";
  }

  $table .= "</table>";
  $table .= "<br><br>";

  $select = "<select id=\"new_bucket_select\" onchange=''>";

  foreach ($buckets as $bucket) {
    if ($bucket->GetId() == $questionsCurrentBucket->getId()) {
      $select .= '<option selected value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
    } else {
      $select .= '<option value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
    }
  }
  $select .= "</select>";
  $table .= $select;

  $table .= "<br><br>";

  $table .= "<button onclick=\"UpdateQuestion(); UpdateAnswers(); UpdateQuestionsBucket('". $questionId ."', '". $questionsCurrentBucket->GetId() ."'); GetObject('updated').innerHTML='<h3><font color=\'red\'>Updated! :)</font></h3>' \">UPDATE</button>";
  $table .= "<button onclick=\"window.close()\">CLOSE</button>";

  echo $table;

?>

  </center>
</body>

