<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/alert/AlertManager.php"; include_once($include);
  
  $alert_manager = new AlertManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
    $key = $_GET['key'];
    $title = $_GET['title'];
    $alert = $_GET['alert'];

    $alert_manager->AddAlert($key, $title, $alert);

  } else if ($option == "delete") {
    $id = $_GET['id'];
    $alert_manager->DeleteAlert($id);
  }
?>