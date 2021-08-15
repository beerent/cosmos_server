<?php
    $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/database/DatabaseManager.php"; include_once($include);
    //$include = $_SERVER['DOCUMENT_ROOT']; $include .="/alert/Alert.php"; include_once($include);

	class AlertManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function AddAlert($key, $title, $alert) {
			$escapedKey = $this->dbm->GetEscapedString($key);
			$escapedTitle = $this->dbm->GetEscapedString($title);
			$escapedAlert = $this->dbm->GetEscapedString($alert);

			$sql = "insert into alerts (`key`, title, alert) values ('$escapedKey', '$escapedTitle', '$escapedAlert');";

			$this->dbm->insert($sql);	
		}
	}
?>