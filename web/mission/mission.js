function AddNewStageField() {
  var tableObject = GetObject("add_mission_stages_table");
  var newRowId = tableObject.rows.length;

  var row = tableObject.insertRow();
  row.id = newRowId;

  var x = row.insertCell(0);
  x.innerHTML = '<center>≡</center>';

  var x = row.insertCell(1);
  x.innerHTML = '<input size="60" placeholder="enter title..." type="text" value="" maxlength="500">';

  var x = row.insertCell(2);
  x.innerHTML = '<textarea rows="4" cols="58" placeholder="enter story..."></textarea>';

  var x = row.insertCell(3);
  var selectObject = GetObject("bucket_select").cloneNode(true);
  selectObject.hidden = false;
  x.appendChild(selectObject);

  var x = row.insertCell(4);
  x.innerHTML = "<center><button onclick=' if (confirm(\"Delete Row?\")) { DeleteRow("+ newRowId +"); } '>-</button></center>";
}

function DeleteRow(rowid) {
	var row = document.getElementById(rowid);
	row.parentNode.removeChild(row);
}

function SubmitAddMission() {
	var missionTitle = GetObject("add_mission_title").value;
	if (missionTitle == "") {
		alert ("Invalid Title!");
		return false;
	}

	var missionSummary = GetObject("add_mission_summary").value;
	if (missionSummary == "") {
		alert ("Invalid Summary!");
		return false;
	}

	var table = GetObject("add_mission_stages_table");
	var rows = table.rows;

	if (rows.length == 1) {
		alert("Missing Stages!");
		return false;
	}

	var usedBuckets = [];
	var stages = [];
	for (var i = 1; i < rows.length; i++) {
		var cells = rows[i].cells;

		var stageTitle = cells[1].childNodes[0].value;
		if (stageTitle == "") {
			alert ("Missing Stage Title!");
			return false;
		}

		var stageStory = cells[2].childNodes[0].value;
		if (stageStory == "") {
			alert ("Missing Stage Story!");
			return false;
		}

		var stageBucket = cells[3].childNodes[0].value;
		if (usedBuckets.includes(stageBucket)) {
			alert ("Duplicate Stage Bucket Found!");
			return false;
		}
		usedBuckets.push(stageBucket);

		var stage = {
			title: stageTitle,
			story: stageStory,
			bucket: stageBucket,
			order: i
		};

		stages.push(stage);
	}

	execute("/mission/MissionHelper.php?option=addMission&t=" + missionTitle + "&s=" + missionSummary, 'fakediv');
	sleep(1500);
	for (var i = 0; i < stages.length; i++) {
		var stage = stages[i];
		execute("/mission/MissionHelper.php?option=addStage&m=" + missionTitle + "&t=" + stage.title + "&s=" + stage.story + "&b=" + stage.bucket + "&o=" + stage.order, 'fakediv');
	}

	alert("added!");
	location.reload();
}

function ReorderMissions(startOrder) {
	var order = startOrder;

	var table = GetObject("manage_missions_table");
	var rows = table.rows;

	var usedBuckets = [];
	var stages = [];

	for (var i = 1; i < rows.length; i++) {
		var cells = rows[i].cells;
		var missionId = cells[1].childNodes[0].innerHTML;
		execute("/mission/MissionHelper.php?option=reorderMission&id=" + missionId + "&order=" + order, 'fakediv');
		order = order + 1;
	}

	sleep(1000);
	alert("missions reordered!");
	location.reload();
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}