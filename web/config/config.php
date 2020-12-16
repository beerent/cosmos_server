<script src="/base.js"></script>
<script src="config.js"></script>

<div id="config_data_to_update" style="display:none"></div>

<?php

  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/config/ConfigDataManager.php"; include_once($include);

  $config_data_manager = new ConfigDataManager();


  function DisplayConfigEntries() {
    global $config_data_manager;

    $pairs = $config_data_manager->GetConfigEntries();

    echo "<center>";
    echo "<table border='1'>";
    echo "<tr><td><b>Key</b></td><td><b>Value</b></td></tr>";
    foreach ($pairs as $pair) {
      $elementId = "edit_config_data_". $pair->GetKey();

      echo "<tr><td>". $pair->GetKey() . "</td>";
      echo '<td><input type="text" size="10" id="'.$elementId.'" value="'.htmlspecialchars($pair->GetValue()).'" maxlength="500" onchange="AddToConfigDataUpdateQueue(\''.$elementId.'\', \''.$pair->GetKey().'\', \''.$pair->GetValue().'\');"></td></tr>';
    }
    echo "</table>";
    echo "</center>";
  }

  function DisplayConfigSubmitButton() {
    echo "<center>";
    echo "<button onclick='if (CommitConfigEntryUpdates()){location.reload(); alert(\"Updates Saved!\")}'>Save Changes!</button>";
    echo "</center>";
  }


  echo "<center><b>Config</b></center>";
  echo "<hr>";

  DisplayConfigEntries();
  echo "<br><br>";
  DisplayConfigSubmitButton();
  echo "<hr>";
  echo "<br><br>";

?>