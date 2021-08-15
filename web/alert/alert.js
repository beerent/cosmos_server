function AddAlert() {
  var key = GetObject("add_alert_key").value;
  var title = GetObject("add_alert_title").value;
  var alert = GetObject("add_alert_alert").value;

  execute("/alert/AlertHelper.php?option=add&key=" + key + "&title=" + title + "&alert=" + alert, 'fakediv');

  return true;
}

function DeleteAlert(id) {
  execute("/alert/AlertHelper.php?option=delete&id=" + id, 'fakediv');
}