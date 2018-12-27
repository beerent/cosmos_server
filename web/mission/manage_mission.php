<html lang="en">
  <head>
    <title>Add Mission</title>
  </head>

  <body>


<?php

$include = $_SERVER['DOCUMENT_ROOT']; $include .="/shared/CommonFunctions.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/MissionManager.php"; include_once($include);

$startOrder = -1;

/***********************************/
// MISC
/***********************************/

function BuildUpdateDivs() {
	echo '<div id="mission_titles_to_update" style="display:none"></div>';
	echo '<div id="mission_summaries_to_update" style="display:none"></div>';
	echo '<div id="mission_enabled_state_to_update" style="display:none"></div>';

	echo '<div id="stage_titles_to_update" style="display:none"></div>';
	echo '<div id="stage_stories_to_update" style="display:none"></div>';
	echo '<div id="stage_buckets_to_update" style="display:none"></div>';
	echo '<div id="stage_to_delete" style="display:none"></div>';
}

function StartTable() {
	echo "<center>";
	echo "<table>";
}

function EndTable() {
	echo "</table>";
	echo "</center>";
}

function StartRow() {
	echo "<tr>";
}

function EndRow() {
	echo "</tr>";
}

function AddLineBreak() {
	echo "<br>";
}

/***********************************/
// BUCKETS
/***********************************/

function GetBuckets() {
	$bucket_manager = new BucketManager();
	$buckets = $bucket_manager->GetEnabledBuckets();

	$elementId = 'add_stage_bucket';

	$selectObj = '<select id="'. $elementId .'">';
	foreach ($buckets as $bucket) {
		$selectObj .= '<option value="' . $bucket->GetId() .'">' . $bucket->GetName() . '</option>';
	}
	$selectObj .= "</select>";

	return $selectObj;	
}

  function GetBucketsWithSelectedValue($stage) {
  	$bucket_manager = new BucketManager();
  	$buckets = $bucket_manager->GetEnabledBuckets();

  	$elementId = 'edit_stage_bucket_'. $stage->GetId();
  	$onchange = "AddToUpdateQueue('". $stage->GetId() ."', 'stage_buckets_to_update', '". $elementId ."', '". $stage->GetBucketId() ."')";

  	$selectObj = '<select id="'. $elementId .'" onchange="'. $onchange .'">';
  	foreach ($buckets as $bucket) {
  		$selected = "";
  		if ($bucket->GetId() == $stage->GetBucketId()) {
  			$selected = " selected ";
  		}
  		$selectObj .= '<option value="' . $bucket->GetId() . '"' . $selected . '>' . $bucket->GetName() . '</option>';
  	}
  	$selectObj .= "</select>";

  	return $selectObj;
  }

/***********************************/
// MISSION
/***********************************/

  function AddMissionIdField($mission) {
    echo '<tr><td>ID</td><td>'. $mission->GetId() .'</td></tr>';  	
  }

  function AddMissionTitleField($mission) {
  	$elementId = 'edit_mission_title_'. $mission->GetId();
  	$onchange = "AddToUpdateQueue('". $mission->GetId() ."', 'mission_titles_to_update', '". $elementId ."', '". $mission->GetTitle() ."')";
    echo '<tr><td><font color="red">*</font>Title</td><td><input size="60" type="text" placeholder="enter title..." value="'. $mission->GetTitle() .'" maxlength="150" id="'. $elementId .'" onchange="'. $onchange .'"></td></tr>';  	
  }

  function AddMissionSummaryField($mission) {
  	$elementId = 'edit_mission_summary_'. $mission->GetId();
  	$onchange = "AddToUpdateQueue('". $mission->GetId() ."', 'mission_summaries_to_update', '". $elementId ."', '". $mission->GetSummary() ."')";
  	echo '<tr><td><font color="red">*</font>Summary</td><td><textarea rows="4" cols="58" placeholder="enter summary..." id="'. $elementId .'" onchange="'. $onchange .'">'. $mission->GetSummary() .'</textarea></td></tr>';
  }

  function AddMissionEnabledStateField($mission) {
  	echo "<tr>";
  	echo "  <td>";
  	echo "    State";
  	echo "  </td>";
  	echo "  <td>";
  	
  	$stateToSet = "1";
  	$confirmString = "Are you sure you want to enable this mission?";
  	$stateString = "DISABLED";
  	if ($mission->IsEnabled()) {
  		$stateToSet = "0";
	  	$confirmString = "Are you sure you want to disable this mission?";
  		$stateString = "enabled";
  	}

  	echo "    <button onclick='if (confirm(\"". $confirmString ."\")) {ToggleMissionState(". $mission->GetId() .", ". $stateToSet .")}'>". $stateString ."</button>";
  	echo "  </td>";
  	echo "</tr>";
  }

/***********************************/
// STAGES
/***********************************/

  function AddStageOrderField() {
  	echo "<td><center>≡</center></td>";
  }

  function AddStageIdField($stage) {
    echo '<td>'. $stage->GetId() .'</td>';  	
  }

  function AddStageTitleField($stage) {
  	if ($stage == "") {
	   	$elementId = 'add_stage_title';
  		echo '<td><input size="60" placeholder="enter title..." type="text" id="'. $elementId .'" maxlength="500"></td>';
  		return;
  	}

   	$elementId = 'edit_stage_title_'. $stage->GetId();
  	$onchange = "AddToUpdateQueue('". $stage->GetId() ."', 'stage_titles_to_update', '". $elementId ."', '". $stage->GetTitle() ."')";
  	echo '<td><input size="60" placeholder="enter title..." type="text" value="'. $stage->GetTitle() .'" id="'. $elementId .'" onchange="'. $onchange .'" maxlength="500"></td>';
  }

  function AddStageStoryField($stage) {
  	if ($stage == "") {
      $elementId = 'edit_stage_story';
      echo '<td><textarea rows="4" cols="58" placeholder="enter story..." id="'. $elementId .'"></textarea></td>';
      return;
   	}

    $elementId = 'edit_stage_story_'. $stage->GetId();
  	$onchange = "AddToUpdateQueue('". $stage->GetId() ."', 'stage_stories_to_update', '". $elementId ."', '". $stage->GetStory() ."')";
  	echo '<td><textarea rows="4" cols="58" placeholder="enter story..." id="'. $elementId .'" onchange="'. $onchange .'">'. $stage->GetStory() .'</textarea></td>';
  }

  function AddStageBucketField($stage) {
  	if ($stage == "") {
  		echo "<td>". GetBuckets() ."</td>";
  		return;
  	}

  	echo "<td>". GetBucketsWithSelectedValue($stage) ."</td>";
  }

  function AddStageDeleteField($stage) {
    $elementId = 'edit_stage_delete_'. $stage->GetId();
  	$onclick = "AddToStageDeleteQueue('". $elementId ."', '". $stage->GetId() ."', '". $stage->GetTitle() ."')";
  	echo '<td><center><button id="'. $elementId .'" onclick="'. $onclick .'">-</button></center></td>';
  }

/***********************************/
// BUTTONS
/***********************************/
  function AddSubmitField() {
  	echo "<center>";
  	echo "<br>";
  	echo "<button onclick='SubmitUpdateMission()'>Submit!</button>";
  	echo "</center>";
  }

  function AddAddStageField($mission, $highestOrder) {
  	echo "<center>";
  	echo "<br>";
  	echo "<button onclick='AddNewStageFieldToExistingMission(\"". $mission->GetTitle() ."\", \"". ($highestOrder + 1) ."\")'>Add New Stage!</button>";
  	echo "</center>";
  }

  function AddNewStageField($mission, $highestOrder) {
	echo "<h3>Add Stage</h3>";
	echo "<table border='1'>";
	StartRow();
	AddStageTitleField("");
	AddStageStoryField("");
	AddStageBucketField("");
	EndRow();
	echo "</table>";
	AddAddStageField($mission, $highestOrder);
	echo "<br><br><br><br><br>";
  }

  function AddStagesField($mission) {
  	global $startOrder;
  	$highestOrder = -1;

  	echo "<center>";

  	echo "<h3>Stages</h3>";

  	echo "<table border='1' id='add_mission_stages_table'>";
  	echo "<tr>";
  	echo "<td><b>Order</b></td>";
  	echo "<td><b>ID</b></td>";
  	echo "<td><b>Title</b></td>";
  	echo "<td><b>Story</b></td>";
  	echo "<td><b>Bucket</b></td>";
  	echo "<td><b>Delete</b></td>";
  	echo "</tr>";

    echo "<tbody>";

    $stages = $mission->GetStages();
    foreach ($stages as $stage) {
    	if ($startOrder == -1) {
    		$startOrder = $stage->GetOrder();
    	}

    	if ($stage->GetOrder() > $highestOrder) {
    		$highestOrder = $stage->GetOrder();
    	}
    	
    	StartRow();
    	AddStageOrderField();
    	AddStageIdField($stage);
    	AddStageTitleField($stage);
    	AddStageStoryField($stage);
    	AddStageBucketField($stage);
    	AddStageDeleteField($stage);
    	EndRow();
    }
    echo "</tbody>";
    echo "</table>";

  	AddSubmitField();

    echo "<br>";
    AddNewStageField($mission, $highestOrder);

  	echo "</center>";
  }
?>

<?php
  $missionId = $_GET['id'];
  if ($missionId == "") {
  	echo "<center>missing a mission ID!</center>";
  	return;
  }
  $mission_manager = new MissionManager();
  $mission = $mission_manager->GetMissionById($missionId);

  BuildUpdateDivs();
  DisplayMenu();
  DisplayTitle("Manage Mission");
  StartTable();
  AddMissionIdField($mission);
  AddMissionTitleField($mission);
  AddMissionSummaryField($mission);
  AddMissionEnabledStateField($mission);
  EndTable();
  AddLineBreak();
  AddStagesField($mission);
?>


  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> 
  <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script> 

  <script src="/base.js"></script>
  <script src="mission.js"></script>

  <script type="text/javascript">
    $('tbody').sortable();
  </script>

  </body>
</html>
