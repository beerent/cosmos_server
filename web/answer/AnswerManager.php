<?php
    $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/database/DatabaseManager.php"; include_once($include);

	class AnswerManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function UpdateAnswer($answerId, $newValue) {
			$sql = "update answers set answer = '". $newValue ."' where id = '". $answerId ."';";
			$this->dbm->insert($sql);
		}
	}
?>