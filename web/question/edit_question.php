<html lang="en">
  <head>
    <title>Edit Question</title>
    <meta charset="utf-8">
    <script src="/base.js"></script>
    <script src="question.js"></script>
  </head>
  <body>
    <center>
    	<p id="updated"></p>

<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/QuestionManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
  
  $questionManager = new QuestionManager();
  $bucketManager = new BucketManager();
  $questionId = $_GET['id'];
  $question = $questionManager->GetQuestion($questionId);

  $buckets = $bucketManager->GetEnabledBuckets();
  $questionsCurrentBucket = $bucketManager->GetBucketForQuestion($questionId);
?>
  <table border="1" id="question_table">
    <tr>
      <td>Field</td>
      <td>ID</td>
      <td>Current</td>
      <td>New</td>
    </tr>

    <tr>
      <td>Question</td>
      <td><? echo $question->GetId(); ?></td>
      <td><? echo $question->GetQuestion(); ?></td>
      <td><input type="text" name="reword" id="db_question_id_<? echo $question->GetId()?>"></td>
    </tr>

    <? $correctAnswer = $question->GetCorrectAnswer(); ?>

    <tr>
      <td>Correct Answer</td>
      <td><? echo $correctAnswer->GetId(); ?></td>
      <td><? echo $correctAnswer->GetAnswer() ;?></td>
      <td><input type="text" name="reword" id="db_answer_id_<? echo $correctAnswer->GetId() ?>"></td>
    </tr>

    <?php
      $wrongAnswers = $question->GetwrongAnswers();
      foreach ($wrongAnswers as $wrongAnswer) {
        $row  = "<tr>";
        $row .= "  <td>Wrong Answer</td>";
        $row .= " <td>". $wrongAnswer->GetId() ."</td>";
        $row .= " <td>". $wrongAnswer->GetAnswer() ."</td>";
        $row .= " <td><input type='text' name='reword' id='db_answer_id_" . $wrongAnswer->GetId() . "'></td>";
        $row .= "</tr>";
        echo $row;
      }
    ?>
  </table>
  
  <br><br>

  <select id="new_bucket_select">
    <?php
      foreach ($buckets as $bucket) {
        if ($bucket->GetId() == $questionsCurrentBucket->getId()) {
          $select = '<option selected value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
        } else {
          $select = '<option value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
        }

        echo $select;
      }
    ?>
  
  </select>

  <br><br>

  <button onclick="
    UpdateQuestion(); 
    UpdateAnswers(); 
    UpdateQuestionsBucket('<? echo $questionId; ?>', '<? echo $questionsCurrentBucket->GetId(); ?>'); 
    MarkEditPageAsEdited();
    ">
    UPDATE
  </button>
  <button onclick="window.close()">CLOSE</button>

  </center>
</body>

