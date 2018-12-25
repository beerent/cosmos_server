<html lang="en">
  <head>
    <title>Add Mission</title>
  </head>

  <body>


<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/shared/CommonFunctions.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/MissionManager.php"; include_once($include);

  function GetBucketsWithSelectedValue($id) {
  	$bucket_manager = new BucketManager();
  	$buckets = $bucket_manager->GetEnabledBuckets();

  	$selectObj = "<select>";
  	foreach ($buckets as $bucket) {
  		$selected = "";
  		if ($bucket->GetId() == $id) {
  			$selected = " selected ";
  		}
  		$selectObj .= '<option value="' . $bucket->GetId() . '"' . $selected . '>' . $bucket->GetName() . '</option>';
  	}
  	$selectObj .= "</select>";

  	return $selectObj;
  }

  function StartTable() {
  	echo "<center>";
  	echo "<table>";
  }

  function EndTable() {
  	echo "</table>";
  	echo "</center>";
  }

  function AddIdField($mission) {
    echo '<tr><td>ID</td><td>'. $mission->GetId() .'</td></tr>';  	
  }

  function AddTitleField($mission) {
    echo '<tr><td><font color="red">*</font>Title</td><td><input size="60" type="text" placeholder="enter title..." id="add_mission_title" value="'. $mission->GetTitle() .'" maxlength="150"></td></tr>';  	
  }

  function AddSummaryField($mission) {
  	echo '<tr><td><font color="red">*</font>Summary</td><td><textarea rows="4" cols="58" placeholder="enter summary..." id="add_mission_summary">'. $mission->GetSummary() .'</textarea></td></tr>';
  }

  function AddLineBreak() {
  	echo "<br>";
  }

  function AddStagesField($mission) {
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
    	echo "<tr>";
    	echo "<td><center>≡</center></td>";
    	echo "<td><center>". $stage->GetId() ."</center></td>";

    	echo '<td><input size="60" placeholder="enter title..." type="text" value="'. $stage->GetTitle() .'" maxlength="500"></td>';
    	echo '<td><textarea rows="4" cols="58" placeholder="enter story...">'. $stage->GetStory() .'</textarea></td>';
    	echo "<td>". GetBucketsWithSelectedValue($stage->GetBucketId()) ."</td>";
    	echo "<td><center><button>-</button></center></td>";
    	echo "</tr>";
    }

    echo "</tbody>";

    echo "</table>";

  	echo "<br>";
  	echo "<button onclick='AddNewStageField();'>Add Stage</button>";

  	echo "</center>";
  }

  function AddSubmitField() {
  	echo "<center>";
  	echo "<br><br>";
  	echo "<button onclick='SubmitAddMission()'>Submit!</button>";
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

  DisplayMenu();
  DisplayTitle("Manage Mission");
  StartTable();
  AddIdField($mission);
  AddTitleField($mission);
  AddSummaryField($mission);
  EndTable();
  AddLineBreak();
  AddStagesField($mission);
  AddSubmitField();
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
