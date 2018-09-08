<?php
  include("./AnswerManager.php");
  $answerManager = new AnswerManager();
  
  $option = $_GET['option'];

  if ($option == "update") {
  	$id = $_GET['id'];
  	$new = $_GET['new'];
  	$answerManager->UpdateAnswer($id, $new);
  }
?>