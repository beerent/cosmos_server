var BUCKET_DIR = "/bucket";

function AddBucket(bucketName) {
  execute("/bucket/BucketHelper.php?option=add&name=" + bucketName, 'fakediv');
  alert("bucket "+ bucketName +" added!");
  location.reload();
}

function AddToBucketUpdateQueue(bucketId, elementId, originalText) {
  var bucketsToUpdate = GetObject("buckets_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (bucketsToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += bucketId + "{{}}" + newText;
  bucketsToUpdate.innerHTML = bucketsToUpdate.innerHTML + queryString;
  UpdateTextColorIfChanged(textObject, originalText);
}

function AddToBucketEnableUpdateQueue(bucketId, elementId, originalText) {
  var bucketsToToggleEnable = GetObject("buckets_to_toggle_enable");
  var textObject = GetObject(elementId);
  var newValue = GetValue(elementId);

  var queryString = "";
  if (bucketsToToggleEnable.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += bucketId + "{{}}" + newValue;
  bucketsToToggleEnable.innerHTML = bucketsToToggleEnable.innerHTML + queryString;

  if (newValue == "enabled") {
    textObject.value="DISABLED";
    textObject.innerHTML="DISABLED";
  } else {
    textObject.value="enabled";
    textObject.innerHTML="enabled";
  }
  
  UpdateTextColorIfChanged(textObject, originalText);
}

function CommitBucketUpdates() {
  var bucketsToUpdate = GetObject("buckets_to_update");
  var entries = bucketsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];
    execute("/bucket/BucketHelper.php?option=rename&id=" + id + "&new=" + newValue, 'fakediv');
  });

  return true;
}

function CommitToggleEnableUpdates() {
  var bucketsToUpdate = GetObject("buckets_to_toggle_enable");
  var entries = bucketsToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var newValue = map[id];

    var enabledValue = "disable";
    if (newValue == "DISABLED") {
      enabledValue = "enable";
    }

    execute("/bucket/BucketHelper.php?option="+ enabledValue +"&id=" + id, 'fakediv');    
  });

  return true;
}