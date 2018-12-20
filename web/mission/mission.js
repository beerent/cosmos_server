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
