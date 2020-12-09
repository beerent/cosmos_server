<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/config/ConfigEntry.php"; include_once($include);

	class ConfigDataManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function GetConfigEntries() {
			$sql = "select `key` as k, value as v from config;";

			$results = $this->dbm->query($sql);

			$configEntries = array();
			while($row = $results->fetch_assoc()){
				$entry = new ConfigEntry($row['k'], $row['v']);
				array_push($configEntries, $entry);
			}

			return $configEntries;
		}

		function UpdateConfigEntry($entry) {
			$key = $entry->GetKey();
			$value = $entry->GetValue();
			$escapedValue = $this->dbm->GetEscapedString($value);
			$sql = "update config set value = '$escapedValue' where `key` = '$key'";
			$this->dbm->insert($sql);
		}

		function GetConfigValue($key) {
			$sql = "select value as v from config where `key` = '$key'";
			$results = $this->dbm->query($sql);

			if($row = $results->fetch_assoc()) {
				return $row['v'];
			}

			return "[config not found]";
		}
	}
?>