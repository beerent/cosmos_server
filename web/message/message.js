function AddToMessageUpdateQueue(elementId, databaseId, originalText) {
  var messageToUpdate = GetObject("message_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (messageToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += databaseId + "{{}}" + newText;
  messageToUpdate.innerHTML = messageToUpdate.innerHTML + queryString;
  UpdateTextColorIfChanged(textObject, originalText);
}

function AddToStartUpdateQueue(elementId, databaseId, originalText) {
  var startToUpdate = GetObject("start_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (startToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += databaseId + "{{}}" + newText;
  startToUpdate.innerHTML = startToUpdate.innerHTML + queryString;
  UpdateTextColorIfChanged(textObject, originalText);
}

function AddToExpireUpdateQueue(elementId, databaseId, originalText) {
  var expireToUpdate = GetObject("expire_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (expireToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += databaseId + "{{}}" + newText;
  expireToUpdate.innerHTML = expireToUpdate.innerHTML + queryString;
  UpdateTextColorIfChanged(textObject, originalText);
}

function CommitMessagesUpdates() {
  var configDataToUpdate = GetObject("message_to_update");
  var entries = configDataToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var message = map[id];
    execute("/config/message/MessageHelper.php?option=updateMessage&id=" + id + "&message=" + message, 'fakediv');
  });

  return true;
}

function CommitStartUpdates() {
  var configDataToUpdate = GetObject("start_to_update");
  var entries = configDataToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var start = map[id];
    execute("/config/message/MessageHelper.php?option=updateStart&id=" + id + "&start=" + start, 'fakediv');
  });

  return true;
}

function CommitExpireUpdates() {
  var configDataToUpdate = GetObject("expire_to_update");
  var entries = configDataToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(id) {
    var expire = map[id];
    execute("/config/message/MessageHelper.php?option=updateExpire&id=" + id + "&expire=" + expire, 'fakediv');
  });

  return true;
}

function AddMessage() {
  var message = GetObject("add_message_message").value;
  var start = GetObject("add_message_start").value;
  var expire = GetObject("add_message_expire").value;

  execute("/config/message/MessageHelper.php?option=add&message=" + message + "&start=" + start + "&expire=" + expire, 'fakediv');

  return true;
}

function RefreshManageMessagesPage() {
  var date_category = GetValue("date_category_select");
  window.location.replace("/message/manage_messages.php?date_category=" + date_category);
}