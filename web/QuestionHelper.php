<?php
  include_once("./QuestionManager.php");
  include_once("./ProposedQuestion.php");
  $questionManager = new QuestionManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
    $question = $_GET['q'];
    $correctAnswer = $_GET['c'];
    $wrongAnswer1 = $_GET['w1'];
    $wrongAnswer2 = $_GET['w2'];
    $wrongAnswer3 = $_GET['w3'];
    $wrongAnswer4 = $_GET['w4'];
    $wrongAnswer5 = $_GET['w5'];
    $wrongAnswer6 = $_GET['w6'];
    $wrongAnswer7 = $_GET['w7'];
    $wrongAnswer8 = $_GET['w8'];
    $wrongAnswer9 = $_GET['w9'];
    $wrongAnswer10 = $_GET['w10'];
    $bucketId = $_GET['b'];

    $proposedQuestion = new ProposedQuestion($question, $correctAnswer, $bucketId);
    $proposedQuestion->AddWrongAnswer($wrongAnswer1);
    $proposedQuestion->AddWrongAnswer($wrongAnswer2);
    $proposedQuestion->AddWrongAnswer($wrongAnswer3);
    $proposedQuestion->AddWrongAnswer($wrongAnswer4);
    $proposedQuestion->AddWrongAnswer($wrongAnswer5);
    $proposedQuestion->AddWrongAnswer($wrongAnswer6);
    $proposedQuestion->AddWrongAnswer($wrongAnswer7);
    $proposedQuestion->AddWrongAnswer($wrongAnswer8);
    $proposedQuestion->AddWrongAnswer($wrongAnswer9);
    $proposedQuestion->AddWrongAnswer($wrongAnswer10);

    $questionManager->AddQuestion($proposedQuestion);
  }

  else if ($option == "update") {
  	$id = $_GET['id'];
  	$new = $_GET['new'];
  	$questionManager->UpdateQuestion($id, $new);
  }

  else if ($option == "updateBucket") {
    $id = $_GET['id'];
    $new = $_GET['new'];
    $questionManager->UpdateQuestionBucket($id, $new);
  }

  else if ($option == "enable") {
  	$id = $_GET['id'];
    $questionManager->EnableQuestion($id);
  }

  else if ($option == "disable") {
    $id = $_GET['id'];
    $questionManager->DisableQuestion($id);
  }
?>