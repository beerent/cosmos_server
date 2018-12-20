<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/Mission.php"; include_once($include);

	class MissionManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}
	}
?>