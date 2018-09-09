
<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/QuestionManager.php"; include_once($include);

  $bucket_manager = new BucketManager();
  $questionManager = new QuestionManager();
  $buckets = $bucket_manager->GetEnabledBuckets();
?>

<?php
  function DisplayQuestions($questions) {
    foreach ($questions as $question) {
      echo "<hr>";
      echo "<center>";

      echo "<table>";
      echo "  <tr>";
      echo "    <td>";
      echo "      id";
      echo "    </td>";
      echo "    <td>";
      echo "      <input type='text' readonly value='". $question->GetId() ."' size='60' maxlength='150'>";
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
      echo "      <input type='text' size='60' id='". $elementId ."' onchange='AddToQuestionUpdateQueue(\"". $questionId ."\", \"". $elementId ."\", \"". $originalText ."\");' value='". $originalText ."' maxlength='150'>";

      echo "    </td>";
      echo "  </tr>";

      echo "  <tr>";
      echo "    <td>";
      echo "      enabled";
      echo "    </td>";
      echo "    <td>";

      $questionId = $question->GetId();
      $elementId = "edit_question_enabled_id_". $questionId;

      $originalState = "enabled";
      if (!$question->IsEnabled()) {
        $originalState = "DISABLED";
      }

      echo "      <input type='text' readonly size='60' id='". $elementId ."' value='". $originalState ."' maxlength='150'>";
      echo "<button onclick='AddToQuestionEnableUpdateQueue(\"". $questionId ."\", \"". $elementId ."\", \"". $originalState ."\");'>toggle</button>";

      echo "    </td>";
      echo "  </tr>";

      $answers = $question->GetAnswers();
      for ($i = 0; $i < count($answers); $i++) {
        $answer = $answers[$i];

        echo "  <tr>";
        echo "    <td>";
        if ($answer->IsCorrect()) {
          echo "      correct answer";
        } else {
          echo "      wrong answer";
        }
        echo "    </td>";
        echo "    <td>";

        $answerId = $answer->GetId();
        $elementId = "edit_answer_id_". $answerId;
        $originalText = $answer->GetAnswer();
        echo "      <input type='text' size='60' id='". $elementId ."' onchange='AddToAnswerUpdateQueue(\"". $answerId ."\", \"". $elementId ."\", \"". $originalText ."\");' value='". $originalText ."' maxlength='150'>";

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

    <div id="questions_to_update" style="display:none"></div>
    <div id="questions_to_toggle_enable" style="display:none"></div>
    <div id="answers_to_update" style="display:none"></div>
    
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
  echo "<br><br>";
  echo "<button onclick='if (CommitQuestionUpdates() && CommitToggleEnableUpdates() && CommitAnswerUpdates()){location.reload(); alert(\"Updates Saved!\")}'>Save Changes!</button>";
  echo "</center>";

  echo "<br><br>";

if ($currentBucketId != "") {  
  
  $enabledQuestions = $questionManager->GetEnabledQuestions($currentBucketId);
  DisplayQuestions($enabledQuestions);
  $disabledQuestions = $questionManager->GetDisabledQuestions($currentBucketId);
  DisplayQuestions($disabledQuestions);
}
?>
  </body>
</html>

