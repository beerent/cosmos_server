
<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);

  $bucket_manager = new BucketManager();
  $buckets = $bucket_manager->GetEnabledBuckets();
?>

<html lang="en">
  <head>
    <title>Add Questions</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="/base.js"></script>
    <script src="question.js"></script>
  </head>

  <body>
    <?php  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include($include); ?>

    <center>
      <h1>Add Question</h1>
      <hr>

      <p id="question_added"></p>
        <table id="new_question_table">
          <tr><td><font color="red">*</font>Question</td><td><input size="60" type="text" id="question" value="" maxlength="150"></td></tr>
          <tr><td><font color="red">*</font>Correct Answer</td><td><input size="60" type="text" id="correct_answer" value="" maxlength="150"></td></tr>
          <tr><td><font color="red">*</font>Wrong Answer</td><td><input size="60" type="text" id="wrong_answer1" value="" maxlength="150"></td></tr>
          <tr><td><font color="red">*</font>Wrong Answer</td><td><input size="60" type="text" id="wrong_answer2" value="" maxlength="150"></td></tr>
          <tr><td><font color="red">*</font>Wrong Answer</td><td><input size="60" type="text" id="wrong_answer3" value="" maxlength="150"></td></tr>
        </table>
        <button onclick="AddNewWrongAnswerField();">+ wrong answer</button>
        <br><br><br>
        

        <?php
          $checklist = "Buckets:";
          $checklist .= "<table>";

          foreach ($buckets as $bucket) {
            $checklist .= "<tr>";
            $checklist .= "<td>";
            $checklist .= '<input type="checkbox" name="new_question_buckets" value="'. $bucket->GetId() .'"> ' . $bucket->GetName();
            $checklist .= "</td>";
            $checklist .= "</tr>";
          }

          $checklist .= "</table>";
          echo $checklist;
        ?>

        <button onclick="ClearAddQuestionBuckets();">reset buckets</button>
        <br><br><br>
        <button onclick="if (AddQuestion()) { MarkAsQuestionAdded(); ClearAddQuestionFields(); } ">ADD QUESTION</button>
    
    </center>
  </body>
</html>