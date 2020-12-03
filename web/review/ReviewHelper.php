<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/review/ReviewManager.php"; include_once($include);
  
  $reviewManager = new ReviewManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
    $questionId = $_GET['qid'];
    $reviewId = $_GET['rid'];

    $reviewManager->AddReview($questionId, $reviewId);
  }

  else if ($option == "remove") {
    $questionId = $_GET['qid'];
    $reviewId = $_GET['rid'];

    $reviewManager->RemoveReview($questionId, $reviewId);
  }