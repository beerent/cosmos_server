<html lang="en">
  <head>
    <title>Manage Missions</title>
  </head>

  <body>


<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/shared/CommonFunctions.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/MissionManager.php"; include_once($include);

  $startOrder = 0;
  
  $enableChecked = true;
  if (isset($_GET['enabled'])) {
    $enableChecked = $_GET['enabled'] == "true";
  }

  $completeChecked = false;
  if (isset($_GET['complete'])) {
    $completeChecked = $_GET['complete'] == "true";
  }

  function CreateHiddenSelectObject() {
  	$bucket_manager = new BucketManager();
  	$buckets = $bucket_manager->GetEnabledBuckets();

  	echo "<select hidden id=\"bucket_select\">";
  	foreach ($buckets as $bucket) {
  		echo '<option value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
  	}
  	echo "</select>";
  }

  function DisplayCheckboxes($enabled, $completed) {
    echo "<center>";
    $enabledChecked = "";
    if ($enabled) {
      $enabledChecked = " checked ";
    }

    $completedChecked = "";
    if ($completed) {
      $completedChecked = " checked ";
    }
    echo '<input type="checkbox" id="manage_missions_enabled_checkbox" '. $enabledChecked .' onclick="OnFilterChecked()"> enabled ';
    echo '<input type="checkbox" id="manage_missions_completed_checkbox" '. $completedChecked .' onclick="OnFilterChecked()"> completed';
    echo "</center>";
  }


  function DisplayMissions($enabled, $complete) {
    global $startOrder;

    $mission_manager = new MissionManager();
    $open_missions = $mission_manager->GetMissions($enabled, $complete);

    StartTable();
    AddTableTop();
    StartTBody();

    if (count($open_missions) > 0) {
      $startOrder = $open_missions[0]->GetOrder();
    }

    foreach ($open_missions as $mission) {
      StartRow();
      AddOrderField();
      AddIdField($mission);
      AddTitleField($mission);
      AddStagesField($mission);
      AddAddedField($mission);
      AddViewField($mission);
      EndRow();
    }
    EndTBody();
    EndTable();
    AddSubmitField();
  }

  function StartTable() {
  	echo "<center>";
  	echo "<table border='4' id='manage_missions_table'>";
  }

  function EndTable() {
  	echo "</table>";
  	echo "</center>";
  }

  function AddTableTop() {
    echo "<tr>";
    echo "<td><center><b>Order</b></center></td>";
    echo "<td><center><b>ID</b></center></td>";
    echo "<td><center><b>Title</b></center></td>";
    echo "<td><center><b>Stages</b></center></td>";
    echo "<td><center><b>Added</b></center></td>";
    echo "<td><center><b>View</b></center></td>";
    echo "</tr>";
  }

  function StartTBody() {
    echo "<tbody>";
  }

  function EndTBody() {
    echo "</tbody>";
  }

  function StartRow() {
    echo "<tr>";
  }

  function EndRow() {
    echo "</tr>";
  }

  function AddOrderField() {
    echo '<td><center>≡</center></td>';
  }

  function AddIdField($mission) {
    echo '<td><center>'. $mission->GetId() .'</center></td>';
  }

  function AddTitleField($mission) {
    echo '<td>' . $mission->GetTitle() .'</td>';
  }

  function AddStagesField($mission) {
    echo '<td><center>'. count($mission->GetStages()) .'</center></td>';
  }

  function AddAddedField($mission) {
    echo '<td>'. $mission->GetAdded() .'</td>';
  }

  function AddViewField($mission) {
    $url = "manage_mission.php?id=" . $mission->GetId();
    echo "<td><button onclick='location.href=\"". $url ."\"'>View</button></td>";  
  }

  function AddSubmitField() {
    global $startOrder;

  	echo "<center>";
  	echo "<br><br>";
  	echo "<button onclick='ReorderMissions(". $startOrder .")'>Submit!</button>";
  	echo "</center>";
  }
?>

<?php

  CreateHiddenSelectObject();
  DisplayMenu();
  DisplayTitle("Manage Missions");
  DisplayCheckboxes($enableChecked, $completeChecked);
  DisplayMissions($enableChecked, $completeChecked);
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
