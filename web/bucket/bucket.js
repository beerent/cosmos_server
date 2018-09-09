var BUCKET_DIR = "/bucket";

function AddBucket(bucketName) {
  execute("/bucket/BucketHelper.php?option=add&name=" + bucketName, 'fakediv');
}

function DisableBuckets() {
  var bucketTable = document.getElementById("enabled_bucket_table");
    if (bucketTable == null) {
    return;
  }

  var bucketTableCount = bucketTable.rows.length;

  for (var i = 1; i < bucketTableCount; i++) {
    var bucketId = bucketTable.rows[i].cells[0].innerHTML;
    var bucketName = bucketTable.rows[i].cells[1].innerHTML;
    var bucketHtml = bucketTable.rows[i].cells[3].innerHTML;
    var start = bucketHtml.indexOf("id=") + 4;
    var end = bucketHtml.indexOf(">") - 1;
    
    var id = bucketHtml.substring(start, end);
    var isChecked = GetObject(id).checked;

    if (!isChecked) {
      continue;
    }

    execute(BUCKET_DIR + "/BucketHelper.php?option=disable&id=" + bucketId, 'fakediv');
  }
}

function EnableBuckets() {
  var bucketTable = document.getElementById("disabled_bucket_table");
  if (bucketTable == null) {
    return;
  }

  var bucketTableCount = bucketTable.rows.length;
  
  for (var i = 1; i < bucketTableCount; i++) {
    var bucketId = bucketTable.rows[i].cells[0].innerHTML;
    var bucketHtml = bucketTable.rows[i].cells[2].innerHTML;
    var start = bucketHtml.indexOf("id=") + 4;
    var end = bucketHtml.indexOf(">") - 1;
    
    var id = bucketHtml.substring(start, end);
    var isChecked = GetObject(id).checked;

    if (!isChecked) {
      continue;
    }

    execute(BUCKET_DIR + "/BucketHelper.php?option=enable&id=" + bucketId, 'fakediv');
  }
}

function RenameBuckets() {
  var bucketTable = document.getElementById("enabled_bucket_table");
    if (bucketTable == null) {
    return;
  }

  var bucketTableCount = bucketTable.rows.length;
  
  for (var i = 1; i < bucketTableCount; i++) {
    var bucketId = bucketTable.rows[i].cells[0].innerHTML;

    var bucketHtml = bucketTable.rows[i].cells[2].innerHTML;
    var start = bucketHtml.indexOf("id=") + 4;
    var end = bucketHtml.indexOf(">") - 1;
    
    var id = bucketHtml.substring(start, end);
    var newValue = GetValue(id);
    
    if (newValue == "") {
      continue;
    }

    execute(BUCKET_DIR + "/BucketHelper.php?option=rename&id=" + bucketId + "&new=" + newValue, 'fakediv');
  }
}