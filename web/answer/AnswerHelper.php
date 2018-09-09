<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/answer/AnswerManager.php"; include_once($include);

  $answerManager = new AnswerManager();
  
  $option = $_GET['option'];

  if ($option == "update") {
  	$id = $_GET['id'];
  	$new = $_GET['new'];
  	$answerManager->UpdateAnswer($id, $new);
  }
?>