<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/answer/AnswerManager.php"; include_once($include);

  $answerManager = new AnswerManager();
  
  $option = $_GET['option'];

  if ($option == "update") {
  	$id = $_GET['id'];
  	$new = $_GET['new'];
  	$answerManager->UpdateAnswer($id, $new);
  }

  else if ($option == "delete") {
   	$id = $_GET['id'];
  	$answerManager->DeleteAnswer($id);
  }

    else if ($option == "add") {
   	$qid = $_GET['questionId'];
   	$answer = $_GET['answer'];
  	$answerManager->AddWrongAnswer($answer, $qid);
  }
?>