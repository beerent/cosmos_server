<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/config/message/MessageManager.php"; include_once($include);
  
  $message_manager = new MessageManager();
  
  $option = $_GET['option'];

  if ($option == "updateMessage") {
    $id = $_GET['id'];
    $message = $_GET['message'];

    $message_manager->UpdateMessageMessage($id, $message);
  }

  else if ($option == "updateStart") {
    $id = $_GET['id'];
    $start = $_GET['start'];

    $message_manager->UpdateMessageStart($id, $start);
  }

  else if ($option == "updateExpire") {
    $id = $_GET['id'];
    $expire = $_GET['expire'];

    $message_manager->UpdateMessageExpire($id, $expire);
  }

  else if ($option == "add") {
    $message = $_GET['message'];
    $start = $_GET['start'];
    $expire = $_GET['expire'];

    $message_manager->AddMessage($message, $start, $expire);
  }
?>