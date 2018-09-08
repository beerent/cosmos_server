<?php
	class AnswerManager {
		function __construct(){
			include_once("./DBM.php");
			$this->dbm = new DBM();
			$this->dbm->connect();
		}

		function UpdateAnswer($answerId, $newValue) {
			$sql = "update answers set answer = '". $newValue ."' where id = '". $answerId ."';";
			$this->dbm->insert($sql);
		}
	}
?>