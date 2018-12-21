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
?>