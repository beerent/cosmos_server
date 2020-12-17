function AddReleaseNotes() {
  var releaseNotes = GetValue("release_notes");
  var releaseVersion = GetValue("release_version");

  if (releaseNotes == "" || releaseNotes == "enter release notes here..." || releaseVersion == "") {
    alert ("invalid release notes. release notes and version are required.");
    return;
  }

  releaseNotes = ReplaceAll(releaseNotes, "\n", "{n}");

  execute("/release_notes/ReleaseNotesHelper.php?option=add&notes=" + releaseNotes + "&version=" + releaseVersion, 'fakediv');

  GetObject('release_notes_block').innerHTML = "<h3><font color='red'>Release Notes Added :)</font></h3>";
  setTimeout(function(){ GetObject('release_notes_block').innerHTML = ""; }, 3000);
  GetObject('release_notes').value = "";
  GetObject('release_version').value = "";

}

function DisableReleaseNotes(id) {
  if(confirm ("delete release notes?")) {
    execute("/release_notes/ReleaseNotesHelper.php?option=disable&id=" + id, 'fakediv');
  }
}