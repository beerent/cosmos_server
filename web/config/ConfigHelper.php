<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/config/ConfigDataManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/config/ConfigEntry.php"; include_once($include);
  
  $config_data_manager = new ConfigDataManager();
  
  $option = $_GET['option'];

  if ($option == "updateConfigData") {
    $key = $_GET['key'];
    $value = $_GET['value'];

    $configEntry = new ConfigEntry($key, $value);
    $config_data_manager->UpdateConfigEntry($configEntry);
  }
?>