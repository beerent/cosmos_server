<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/MissionManager.php"; include_once($include);

  $mission_manager = new MissionManager();
  
  $option = $_GET['option'];

  if ($option == "addMission") {
    
    $missionTitle = $_GET['t'];
  	$missionSummary = $_GET['s'];
  	$mission_manager->AddMission($missionTitle, $missionSummary);
  }

  else if ($option == "addStage") {

    $missionTitle = $_GET['m'];
    $title = $_GET['t'];
    $story = $_GET['s'];
    $bucketId = $_GET['b'];
    $order = $_GET['o'];

    $mission = $mission_manager->GetMissionByTitle($missionTitle);
    $mission_manager->AddStage($mission->GetId(), $bucketId, $title, $story, $order);
  }

  else if ($option == "reorderMission") {
    $id = $_GET['id'];
    $order = $_GET['order'];

    $mission_manager->UpdateMissionOrder($id, $order);
  }

  else if ($option == "updateMissionTitle") {
    $id = $_GET['id'];
    $title = $_GET['title'];

    $mission_manager->UpdateMissionTitle($id, $title);
  }

  else if ($option == "updateMissionSummary") {
    $id = $_GET['id'];
    $summary = $_GET['summary'];

    $mission_manager->UpdateMissionSummary($id, $summary);
  }

  else if ($option == "updateStageTitle") {
    $id = $_GET['id'];
    $title = $_GET['title'];

    $mission_manager->UpdateStageTitle($id, $title);
  }

  else if ($option == "updateStageStory") {
    $id = $_GET['id'];
    $story = $_GET['story'];

    $mission_manager->UpdateStageStory($id, $story);
  }

  else if ($option == "updateStageBucket") {
    $id = $_GET['id'];
    $bucket = $_GET['bucket'];

    $mission_manager->UpdateStageBucket($id, $bucket);
  }

  else if ($option == "updateStageDelete") {
    $id = $_GET['id'];

    $mission_manager->DeleteStage($id);
  }
?>