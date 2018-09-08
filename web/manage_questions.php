
<?php
  include("./BucketManager.php");
  include("./QuestionManager.php");
  $bucket_manager = new BucketManager();
  $questionManager = new QuestionManager();
  $buckets = $bucket_manager->GetEnabledBuckets();
?>

<html lang="en">
  <head>
    <title>Manage Questions</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="./setInnerHTML.js"></script>
  </head>

  <body>
    <?php include 'top.html';?>
    <center>
      <h1>Manage Questions</h1>
      <br><br><br><br>
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

if ($currentBucketId != "") {  
  $enabledQuestions = $questionManager->GetEnabledQuestions($currentBucketId);

  $enabledTable = '<h3>Enabled Questions</h3>';
  $enabledTable .= '<table id="enabled_question_table" border="1">';
  $enabledTable .= '<tr>';
  $enabledTable .= '<td><b><center>ID</center></b></td>';
  $enabledTable .= '<td><b><center>Question</center></b></td>';
  $enabledTable .= '<td><b><center>Correct Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $enabledTable .= '<td><b><center>Edit</center></b></td>';
  $enabledTable .= '<td><b><center>Disable</center></b></td>';
  $enabledTable .= '</tr>';

  foreach ($enabledQuestions as $question) {
    $enabledTable .= '<tr>';
    $enabledTable .= '<td>'. $question->GetId() .'</td>';
    $enabledTable .= '<td>'. $question->GetQuestion() .'</td>';
    $enabledTable .= '<td>'. $question->GetCorrectAnswer()->GetAnswer() .'</td>';

    $wrongAnswers = $question->GetWrongAnswers();
    for ($i = 0; $i < count($wrongAnswers); $i++) {
      $wrongAnswer = $wrongAnswers[$i];
      $enabledTable .= '<td>'. $wrongAnswer->GetAnswer() .'</td>';
    }

    for ($i = 0; $i < 10 - count($wrongAnswers); $i++) {
      $enabledTable .= '<td></td>';
    }



    $enabledTable .= '<td><center><button onclick="OnEditQuestionClicked(' . $question->GetId() . ')">edit</button></center></td>';
    $enabledTable .= '<td><center><input type="checkbox" name="delete" id="disable_question_id_' . $question->GetId() . '"></center></td>';

    $enabledTable .= '</tr>';
  }

  $enabledTable .= '</table>';

  if (count($enabledQuestions) > 0) {
    echo $enabledTable;
  }

echo "<br><br><br>";

  $disabledQuestions = $questionManager->GetDisabledQuestions($currentBucketId);

  $disabledTable = '<h3>Disabled Questions</h3>';
  $disabledTable .= '<table id="disabled_question_table" border="1">';
  $disabledTable .= '<tr>';
  $disabledTable .= '<td><b><center>ID</center></b></td>';
  $disabledTable .= '<td><b><center>Question</center></b></td>';
  $disabledTable .= '<td><b><center>Correct Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Wrong Answer</center></b></td>';
  $disabledTable .= '<td><b><center>Enable</center></b></td>';
  $disabledTable .= '</tr>';


  foreach ($disabledQuestions as $question) {
    $disabledTable .= '<tr>';
    $disabledTable .= '<td>'. $question->GetId() .'</td>';
    $disabledTable .= '<td>'. $question->GetQuestion() .'</td>';
    $disabledTable .= '<td>'. $question->GetCorrectAnswer()->GetAnswer() .'</td>';

    $wrongAnswers = $question->GetWrongAnswers();
    for ($i = 0; $i < count($wrongAnswers); $i++) {
      $wrongAnswer = $wrongAnswers[$i];
      $disabledTable .= '<td>'. $wrongAnswer->GetAnswer() .'</td>';
    }

    for ($i = 0; $i < 10 - count($wrongAnswers); $i++) {
      $disabledTable .= '<td></td>';
    }

    $disabledTable .= '<td><center><input type="checkbox" name="delete" id="enable_question_id_' . $question->GetId() . '"></center></td>';

    $disabledTable .= '</tr>';
  }

  $disabledTable .= '</table>';

  if (count($disabledQuestions) > 0) {
    echo $disabledTable;
  }
}

echo "<br><br>";
echo "<button onclick=\"DisableQuestions(". $currentBucketId ."); EnableQuestions(". $currentBucketId ."); location.reload()\">APPLY</button>";
?>
    </center>
  </body>
</html>

