<script src="/base.js"></script>
<script src="./message.js"></script>

<div id="message_to_update" style="display:none"></div>
<div id="start_to_update" style="display:none"></div>
<div id="expire_to_update" style="display:none"></div>

<?php

  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/message/MessageManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/util/StringUtils.php"; include_once($include);

  $message_manager = new MessageManager();

  function DisplayMessagesSelect() {
        $date_category = "all";
    if (isset($_GET['date_category'])) {
      $date_category = $_GET['date_category'];
    }

    echo "<center>";

    echo "<select id='date_category_select' onchange='RefreshManageMessagesPage()''>";
    if ($date_category == "all") {
      echo "  <option selected value='all'>all</option>";
    } else {
      echo "  <option value='all'>all</option>";
    }

    if ($date_category == "active") {
      echo "  <option selected value='active'>active</option>";
    } else {
      echo "  <option value='active'>active</option>";
    }
    
    if ($date_category == "expired") {
      echo "  <option selected value='expired'>expired</option>";
    } else {
      echo "  <option value='expired'>expired</option>";
    }

    if ($date_category == "future") {
      echo "  <option selected value='future'>future</option>";
    } else {
      echo "  <option value='future'>future</option>";
    }
 
    echo "</select>";

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
      $singleQuoteEscapedMessageText = $stringUtils->EscapeSingleQuotes($singleQuoteEscapedMessageText);

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

 function DisplayAddMessage() {
  echo "<center>";
  echo '<input size="60" type="text" placeholder="message" id="add_message_message" value="" maxlength="300">';
  echo '<input size="20" type="text" placeholder="start" id="add_message_start" value="" maxlength="50">';
  echo '<input size="20" type="text" placeholder="expire" id="add_message_expire" value="" maxlength="50">';

  echo "<button onclick='if (AddMessage()){location.reload(); alert(\"Message Added!\")}'>Add!</button>";
  echo "</center>";
 }

  //MESSAGES
  echo "<center><b>Messages</b></center>";
  echo "<hr>";
  DisplayMessagesSelect();
  echo "<br><br>";
  DisplayAddMessage();
  echo "<br><br>";
  DisplayMessages();
  echo "<br><br>";
  DisplayMessagesSubmitButton();
  echo "<hr>";


?>