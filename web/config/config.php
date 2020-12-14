<script src="/base.js"></script>
<script src="config.js"></script>
<script src="./message/message.js"></script>

<div id="config_data_to_update" style="display:none"></div>
<div id="message_to_update" style="display:none"></div>
<div id="start_to_update" style="display:none"></div>
<div id="expire_to_update" style="display:none"></div>

<?php

  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/config/ConfigDataManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/config/message/MessageManager.php"; include_once($include);

  $config_data_manager = new ConfigDataManager();
  $message_manager = new MessageManager();


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

  function DisplayMessages() {
    global $message_manager;

    $messages = $message_manager->GetMessages();

    echo "<center>";
    echo "<table border='1'>";
    echo "<tr><td><b>Message</b></td><td><b>Start</b></td><td><b>Expire</b></td></tr>";
    foreach ($messages as $message) {
      $messageElementId = "message_". $message->getId();

      echo "<tr?>";
      echo '<td><input type="text" size="60" id="'.$messageElementId.'" value="'.htmlspecialchars($message->GetMessage()).'" maxlength="500" onchange="AddToMessageUpdateQueue(\''.$messageElementId.'\', \''.$message->getId().'\', \''.$message->GetMessage().'\');"></td>';

      $startElementId = "start_". $message->getId();
      echo '<td><input type="text" size="20" id="'.$startElementId.'" value="'.htmlspecialchars($message->GetStart()).'" maxlength="500" onchange="AddToStartUpdateQueue(\''.$startElementId.'\', \''.$message->getId().'\', \''.$message->GetStart().'\');"></td>';

      $expireElementId = "expire_". $message->getId();      
      echo '<td><input type="text" size="20" id="'.$expireElementId.'" value="'.htmlspecialchars($message->GetExpire()).'" maxlength="500" onchange="AddToExpireUpdateQueue(\''.$expireElementId.'\', \''.$message->getId().'\', \''.$message->GetExpire().'\');"></td></tr>';
      echo "</tr>";
    }
    echo "</table>";
    echo "</center>";
  }

  function DisplayMessagesSubmitButton() {
    echo "<center>";
    echo "<button onclick='if (CommitMessagesUpdates() && CommitStartUpdates() && CommitExpireUpdates()){location.reload(); alert(\"Updates Saved!\")}'>Save Changes!</button>";
    echo "</center>";
  }

 function DisplayAddMessage() {
  echo "<center>";
  echo '<b>Add Message<b>';
  echo "<br>";
  echo '<input size="60" type="text" placeholder="message" id="add_message_message" value="" maxlength="300">';
  echo '<input size="20" type="text" placeholder="start" id="add_message_start" value="" maxlength="50">';
  echo '<input size="20" type="text" placeholder="expire" id="add_message_expire" value="" maxlength="50">';

  echo "<button onclick='if (AddMessage()){location.reload(); alert(\"Message Added!\")}'>Add!</button>";
  echo "</center>";
 }



  //CONFIG
  echo "<center><b>Config</b></center>";
  echo "<hr>";

  DisplayConfigEntries();
  echo "<br><br>";
  DisplayConfigSubmitButton();
  echo "<hr>";
  echo "<br><br>";

  //MESSAGES
  echo "<center><b>Messages</b></center>";
  echo "<hr>";  DisplayMessages();
  DisplayMessagesSubmitButton();
  echo "<br><br>";
  DisplayAddMessage();


?>