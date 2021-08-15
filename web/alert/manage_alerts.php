<script src="/base.js"></script>
<script src="./alert.js"></script>

<?php

$include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/alert/AlertManager.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/util/StringUtils.php"; include_once($include);

//$message_manager = new Manager();

function DisplayAddAlert() {
  echo "<center>";
  echo '<input size="10" type="text" placeholder="key" id="add_alert_key" value="" maxlength="300"> ';
  echo '<input size="20" type="text" placeholder="title" id="add_alert_title" value="" maxlength="300"> ';
  echo '<input size="60" type="text" placeholder="alert" id="add_alert_alert" value="" maxlength="300"> ';

  echo "<button onclick='if (AddAlert()){location.reload(); alert(\"Alert Added!\")}'>Add!</button>";
  echo "</center>";
}

function DisplayMessages() {
  global $message_manager;
  $stringUtils = new StringUtils();

  $date_category = "all";
  if (isset($_GET['date_category'])) {
    $date_category = $_GET['date_category'];
  }

  if ($date_category == "active") {
    $messages = $message_manager->GetActiveMessages();
  } else if ($date_category == "expired") {
    $messages = $message_manager->GetExpiredMessages();
  } else if ($date_category == "future") {
    $messages = $message_manager->GetFutureMessages();
  } else {
    $messages = $message_manager->GetAllMessages();
  }


  echo "<center>";
  echo "<table border='1'>";
  echo "<tr><td><b>Message</b></td><td><b>Start</b></td><td><b>Expire</b></td></tr>";
  foreach ($messages as $message) {
    $messageElementId = "message_". $message->getId();
    $singleQuoteEscapedMessageText = $stringUtils->EscapeSingleQuotes($message->GetMessage());

    echo "<tr?>";
    echo '<td><input type="text" size="60" id="'.$messageElementId.'" value="'.htmlspecialchars($message->GetMessage()).'" maxlength="500" onchange="AddToMessageUpdateQueue(\''.$messageElementId.'\', \''.$message->getId().'\', \''.htmlspecialchars($singleQuoteEscapedMessageText).'\');"></td>';

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

  //MESSAGES
echo "<center><b>Alerts</b></center>";
echo "<hr>";
DisplayAddAlert();
//echo "<br><br>";
//DisplayMessages();
//echo "<br><br>";
//DisplayMessagesSubmitButton();
echo "<hr>";


?>