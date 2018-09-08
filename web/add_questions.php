
<?php
  include("./BucketManager.php");
  $bucket_manager = new BucketManager();
  $buckets = $bucket_manager->GetEnabledBuckets();
?>

<html lang="en">
  <head>
    <title>Add Questions</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="./setInnerHTML.js"></script>
  </head>

  <body>
    <?php include 'top.html';?>
    <center>
      <p id="question_added"></p>
        <font color="red">*</font>Question <input type="text" id="question" value="" maxlength="150"> <br>
        <font color="red">*</font>Correct Answer <input type="text" id="correct_answer" value="" maxlength="150"> <br>
        <font color="red">*</font>Wrong Answer 1 <input type="text" id="wrong_answer1" value="" maxlength="150"> <br>
        <font color="red">*</font>Wrong Answer 2 <input type="text" id="wrong_answer2" value="" maxlength="150"> <br>
        <font color="red">*</font>Wrong Answer 3 <input type="text" id="wrong_answer3" value="" maxlength="150"> <br>
        Wrong Answer 4 <input type="text" id="wrong_answer4" value="" maxlength="150"> <br>
        Wrong Answer 5 <input type="text" id="wrong_answer5" value="" maxlength="150"> <br>
        Wrong Answer 6 <input type="text" id="wrong_answer6" value="" maxlength="150"> <br>
        Wrong Answer 7 <input type="text" id="wrong_answer7" value="" maxlength="150"> <br>
        Wrong Answer 8 <input type="text" id="wrong_answer8" value="" maxlength="150"> <br>
        Wrong Answer 9 <input type="text" id="wrong_answer9" value="" maxlength="150"> <br>
        Wrong Answer 10 <input type="text" id="wrong_answer10" value="" maxlength="150"> <br>
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

