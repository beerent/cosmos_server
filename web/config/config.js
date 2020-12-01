function AddToConfigDataUpdateQueue(elementId, key, originalText) {
  var configDataToUpdate = GetObject("config_data_to_update");
  var textObject = GetObject(elementId);
  var newText = GetValue(elementId);

  var queryString = "";
  if (configDataToUpdate.innerHTML != "") {
    queryString += "(())";
  } 

  queryString += key + "{{}}" + newText;
  configDataToUpdate.innerHTML = configDataToUpdate.innerHTML + queryString;
  UpdateTextColorIfChanged(textObject, originalText);
}

function CommitConfigEntryUpdates() {
  var configDataToUpdate = GetObject("config_data_to_update");
  var entries = configDataToUpdate.innerHTML.split("(())");

  var map = {};
  entries.forEach(function(element) {
    var entry = element.split("{{}}");
    map[entry[0]] = entry[1];
  });

  Object.keys(map).forEach(function(key) {
    var value = map[key];
    execute("/config/ConfigHelper.php?option=updateConfigData&key=" + key + "&value=" + value, 'fakediv');
  });

  return true;
}