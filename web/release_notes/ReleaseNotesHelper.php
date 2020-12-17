<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/release_notes/ReleaseNotesManager.php"; include_once($include);

  $releaseNotesManager = new ReleaseNotesManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
  	$releaseNotes = $_GET['notes'];
    $releaseVersion = $_GET['version'];
  	$releaseNotesManager->AddReleaseNotes($releaseNotes, $releaseVersion);
  }

  else if ($option == "disable") {
  	$id = $_GET['id'];
  	$releaseNotesManager->DisableReleaseNotes($id);
  }
?>