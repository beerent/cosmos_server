
<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/QuestionManager.php"; include_once($include);

  $bucket_manager = new BucketManager();
  $questionManager = new QuestionManager();
  $buckets = $bucket_manager->GetEnabledBuckets();
?>

<html lang="en">
  <head>
    <title>Manage Questions</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="/base.js"></script>
    <script src="question.js"></script>
  </head>

  <body>
    <?php  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include($include); ?>
    
    <center>
      <h1>Manage Questions</h1>
      <hr>
<p id="updateID"></p>

<?php
  $currentBucketId = $_GET['id'];

  $select = "<b>Bucket: </b>";
  $select .= "<select id=\"bucket_select\" onchange='UpdateQuestionsPage(GetValue(\"bucket_select\"))'>";
  if ($currentBucketId == "") {
    $select .= '<option value="">select a bucket!</option>';
  }

  foreach ($buckets as $bucket) {
    if ($bucket->GetId() == $currentBucketId) {
      $select .= '<option selected value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
    } else {
      $select .= '<option value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
    }
  }
  $select .= "</select>";
  echo $select;
  echo "</center>";

  echo "<br><br>";

if ($currentBucketId != "") {  
  

  $enabledQuestions = $questionManager->GetEnabledQuestions($currentBucketId);
  foreach ($enabledQuestions as $question) {
    echo "<hr>";
    echo "<center>";

    echo "<table>";
    echo "  <tr>";
    echo "    <td>";
    echo "      id";
    echo "    </td>";
    echo "    <td>";
    echo "      <input type='text' readonly value='". $question->GetId() ."' maxlength='150'>";
    echo "    </td>";
    echo "  </tr>";

    echo "  <tr>";
    echo "    <td>";
    echo "      question";
    echo "    </td>";
    echo "    <td>";

    $questionId = $question->GetId();
    $elementId = "edit_question_id_". $questionId;
    $originalText = $question->GetQuestion();
    echo "      <input type='text' id='". $elementId ."' onchange='UpdateQuestion(\"". $questionId ."\", \"". $elementId ."\", \"". $originalText ."\");' value='". $originalText ."' maxlength='150'>";

    echo "    </td>";
    echo "  </tr>";

    echo "  <tr>";
    echo "    <td>";
    echo "      correct answer";
    echo "    </td>";
    echo "    <td>";

    $answerId = $question->GetCorrectAnswer()->GetId();
    $elementId = "edit_answer_id_". $answerId;
    $originalText = $question->GetCorrectAnswer()->GetAnswer();
    echo "      <input type='text' id='". $elementId ."' onchange='UpdateAnswer(\"". $answerId ."\", \"". $elementId ."\", \"". $originalText ."\");' value='". $originalText ."' maxlength='150'>";

    echo "    </td>";
    echo "  </tr>";

    $wrongAnswers = $question->GetWrongAnswers();
    for ($i = 0; $i < count($wrongAnswers); $i++) {
      $wrongAnswer = $wrongAnswers[$i];

      echo "  <tr>";
      echo "    <td>";
      echo "      wrong answer";
      echo "    </td>";
      echo "    <td>";

      $answerId = $wrongAnswer->GetId();
      $elementId = "edit_answer_id_". $answerId;
      $originalText = $wrongAnswer->GetAnswer();
      echo "      <input type='text' id='". $elementId ."' onchange='UpdateAnswer(\"". $answerId ."\", \"". $elementId ."\", \"". $originalText ."\");' value='". $originalText ."' maxlength='150'>";

      echo "    </td>";
      echo "  </tr>";
    }
    echo "</table>";

    echo "</center>";
    echo "<hr>";
    echo "<br>";
    echo "<br>";
  }
}
?>
  </body>
</html>

