function OnFilterChecked() {
	var enabledStr = "false";
	var completeStr = "false";

	if (GetObject("manage_missions_enabled_checkbox").checked) {
		enabledStr = "true";
	}

	if (GetObject("manage_missions_completed_checkbox").checked) {
		completeStr = "true";
	}

	location.href = "/mission/manage_missions.php?enabled=" + enabledStr + "&complete=" + completeStr;
}

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

function AddNewStageFieldToExistingMission(missionTitle, order) {
	var title = GetObject("add_stage_title").value;
	if (title == "") {
		alert("Missing title!");
		return false;
	}

	var story = GetObject("edit_stage_story").value;
	if (story == "") {
		alert("Missing story!");
		return false;
	}

	var modifiedStageBuckets = GetObject("stage_buckets_to_update").innerHTML;
	if (modifiedStageBuckets != "") {
		alert ("I am sorry, but since above buckets were modified, I cannot prove you are adding a bucket that isn't already used. Please copy your data to a temporary location, reload the page and try again. If this is a recurring issue, we can make this smarter.");
		return false;
	}

	var bucketId = GetObject("add_stage_bucket").value;
	if (BucketIsAlreadySelected(bucketId)) {
		alert("This bucket is already selected! Please pick a different one.");
		return false;
	}

	execute("/mission/MissionHelper.php?option=addStage&m=" + missionTitle + "&t=" + title + "&s=" + story + "&b=" + bucketId + "&o=" + order, 'fakediv');
	alert("Stage Added!");
	location.reload();
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

function SubmitUpdateMission() {
	if (ConfirmNoDuplicateBuckets() && CommitMissionTitleUpdates() && CommitMissionSummaryUpdates() && CommitStageTitleUpdates() && CommitStageStoryUpdates() && CommitStageBucketUpdates() && CommitStageDeletes()) {
		alert("update complete!");
		location.reload();
	}
}

function BucketIsAlreadySelected(bucketId) {
	var rows = GetObject("add_mission_stages_table").rows;
	for (var i = 1; i < rows.length; i++) {
		var cells = rows[i].cells;

		var stageBucket = cells[4].childNodes[0].value;
		if (stageBucket == bucketId) {
			return true;
		}
	}

	return false;
}

function ConfirmNoDuplicateBuckets() {
	var table = GetObject("add_mission_stages_table");
	var rows = table.rows;

	var usedBuckets = [];

	for (var i = 1; i < rows.length; i++) {
		var cells = rows[i].cells;

		var stageBucket = cells[4].childNodes[0].value;
		if (usedBuckets.includes(stageBucket)) {
			alert ("Duplicate Stage Bucket Found!");
			return false;
		}

		usedBuckets.push(stageBucket);
	}

	return true;
}

function CommitMissionTitleUpdates() {
  var updateList = GetObject("mission_titles_to_update");
  var entries = updateList.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/mission/MissionHelper.php?option=updateMissionTitle&id=" + id + "&title=" + newValue, 'fakediv');
  });

  return true;
}

function CommitMissionSummaryUpdates() {
  var updateList = GetObject("mission_summaries_to_update");
  var entries = updateList.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/mission/MissionHelper.php?option=updateMissionSummary&id=" + id + "&summary=" + newValue, 'fakediv');
  });

  return true;
}

function CommitStageTitleUpdates() {
  var updateList = GetObject("stage_titles_to_update");
  var entries = updateList.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/mission/MissionHelper.php?option=updateStageTitle&id=" + id + "&title=" + newValue, 'fakediv');
  });

  return true;
}

function CommitStageStoryUpdates() {
  var updateList = GetObject("stage_stories_to_update");
  var entries = updateList.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/mission/MissionHelper.php?option=updateStageStory&id=" + id + "&story=" + newValue, 'fakediv');
  });

  return true;
}

function CommitStageBucketUpdates() {
  var updateList = GetObject("stage_buckets_to_update");
  var entries = updateList.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/mission/MissionHelper.php?option=updateStageBucket&id=" + id + "&bucket=" + newValue, 'fakediv');
  });

  return true;
}

function CommitStageDeletes() {
  var updateList = GetObject("stage_to_delete");
  var entries = updateList.innerHTML.split("{{}}");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    var id = entry[0];

    execute("/mission/MissionHelper.php?option=updateStageDelete&id=" + id, 'fakediv');
  });

  return true;
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

function ReorderMissionStages(missionId, startOrder) {
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

function AddToUpdateQueue(id, updateDivId, elementId, originalText) {
	var updateDiv = GetObject(updateDivId);
	var textObject = GetObject(elementId);
	var newText = GetValue(elementId);

	var queryString = "";
	if (updateDiv.innerHTML != "") {
      queryString += "(())";
	} 

	queryString += id + "{{}}" + newText;
	updateDiv.innerHTML = updateDiv.innerHTML + queryString;
	UpdateTextColorIfChanged(textObject, originalText);
}

function AddToStageDeleteQueue(elementId, stageId, stageTitle) {
	if (confirm("Are you SURE you want to delete this stage:\n\"" + stageTitle + "\"") == false) {
	  return;
	}

	var updateDiv = GetObject("stage_to_delete");

	var queryString = "";
	if (updateDiv.innerHTML == "") {
      queryString = "" + stageId;
	} else {
      queryString = "{{}}" + stageId;
	}

	updateDiv.innerHTML = updateDiv.innerHTML + queryString;

	var object = GetObject(elementId);
	var table = object.parentElement.parentElement.parentElement.parentElement;
	var rowIndex = object.parentElement.parentElement.parentElement.rowIndex - 1;
	table.deleteRow(rowIndex);	
}

function ToggleMissionState(missionId, stateToGo) {
	execute("/mission/MissionHelper.php?option=toggleMissionState&id=" + missionId + "&state=" + stateToGo, 'fakediv');
	alert("mission updated!");
	location.reload();
}




