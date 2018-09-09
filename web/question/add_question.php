
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
      <p id="new_questions_field">
        <font color="red">*</font>Question <input type="text" id="question" value="" maxlength="150"> <br>
        <font color="red">*</font>Correct Answer <input type="text" id="correct_answer" value="" maxlength="150"> <br>
        <font color="red">*</font>Wrong Answer<input type="text" id="wrong_answer1" value="" maxlength="150"> <br>
        <font color="red">*</font>Wrong Answer<input type="text" id="wrong_answer2" value="" maxlength="150"> <br>
        <font color="red">*</font>Wrong Answer<input type="text" id="wrong_answer3" value="" maxlength="150"> <br>
      </p>
        <button onclick="AddNewWrongAnswerField();">+ wrong answer</button>
        <br><br><br>
        

        <?php
          $select = "<select id='add_to_bucket_select'>";

          foreach ($buckets as $bucket) {
            $select .= '<option value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
          }
          $select .= "</select>";

          echo "bucket " . $select;
        ?>


  <br><br>
  <button onclick="if (AddQuestion()) { MarkAsQuestionAdded(); ClearAddQuestionFields(); } ">ADD QUESTION</button>
    </center>
  </body>
</html>