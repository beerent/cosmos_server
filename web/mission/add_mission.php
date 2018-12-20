<html lang="en">
  <head>
    <title>Add Mission</title>
  </head>

  <body>


<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/shared/CommonFunctions.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/MissionManager.php"; include_once($include);

  function CreateHiddenSelectObject() {
  	$bucket_manager = new BucketManager();
  	$buckets = $bucket_manager->GetEnabledBuckets();

  	echo "<select hidden id=\"bucket_select\">";
  	foreach ($buckets as $bucket) {
  		echo '<option value="' . $bucket->GetId() . '">' . $bucket->GetName() . '</option>';
  	}
  	echo "</select>";
  }

  function StartTable() {
  	echo "<center>";
  	echo "<table>";
  }

  function EndTable() {
  	echo "</table>";
  	echo "</center>";
  }

  function AddTitleField() {
    echo '<tr><td><font color="red">*</font>Title</td><td><input size="60" type="text" placeholder="enter title..." id="question" value="" maxlength="150"></td></tr>';  	
  }

  function AddSummaryField() {
  	echo '<tr><td><font color="red">*</font>Summary</td><td><textarea rows="4" cols="58" placeholder="enter summary..." id="add_blog_text"></textarea></td></tr>';
  }

  function AddLineBreak() {
  	echo "<br>";
  }

  function AddStagesField() {
  	echo "<center>";

  	echo "<h3>Stages</h3>";

  	echo "<table border='1' id='add_mission_stages_table'><tr><td><b>Order</b></td><td><b>Title</b></td><td><b>Story</b></td><td><b>Bucket</b></td><td><b>Delete</b></td></tr>";
    echo "<tbody>";

    echo "</tbody>";
    echo "</table>";

  	echo "<br>";
  	echo "<button onclick='AddNewStageField();'>Add Stage</button>";

  	echo "</center>";
  }

  function AddSubmitField() {
  	echo "<center>";
  	echo "<br><br>";
  	echo "<button onclick='SwapRows();'>Submit!</button>";
  	echo "</center>";
  }
?>

<?php
  CreateHiddenSelectObject();
  DisplayMenu();
  DisplayTitle("Add Mission");
  StartTable();
  AddTitleField();
  AddSummaryField();
  EndTable();
  AddLineBreak();
  AddStagesField();
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
