<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/QuestionManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/ProposedQuestion.php"; include_once($include);
  
  $questionManager = new QuestionManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
    $question = $_GET['q'];
    $correctAnswer = $_GET['c'];

    $proposedQuestion = new ProposedQuestion($question, $correctAnswer);

    $getElementCount = count($_GET);
    for ($i = 0; $i < $getElementCount; $i++) {
      if(!isset($_GET['b' . $i])) {
        continue;
      }
 
      $proposedQuestion->AddBucketId($_GET['b' . $i]);
    }    

    for ($i = 0; $i < $getElementCount; $i++) {
      if(!isset($_GET['w' . $i])) {
        continue;
      }
 
      $proposedQuestion->AddWrongAnswer($_GET['w' . $i]);
    }

    $questionManager->AddQuestion($proposedQuestion);
  }

  else if ($option == "update") {
  	$id = $_GET['id'];
  	$new = $_GET['new'];
  	$questionManager->UpdateQuestion($id, $new);
  }

  else if ($option == "enable") {
  	$id = $_GET['id'];
    $questionManager->EnableQuestion($id);
  }

  else if ($option == "disable") {
    $id = $_GET['id'];
    $questionManager->DisableQuestion($id);
  }

  else if ($option == "addMapping") {
    $questionId = $_GET['qid'];
    $bucketId = $_GET['bid'];
    $questionManager->AddBucketMapping($questionId, $bucketId);
  }

  else if ($option == "deleteMapping") {
    $questionId = $_GET['qid'];
    $bucketId = $_GET['bid'];
    $questionManager->DeleteBucketMapping($questionId, $bucketId);
  }
?>