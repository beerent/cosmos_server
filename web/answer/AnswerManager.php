<?php
    $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/database/DatabaseManager.php"; include_once($include);

	class AnswerManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function UpdateAnswer($answerId, $newValue) {
			$sql = "update answers set answer = '". $this->dbm->GetEscapedString($newValue) ."' where id = '". $answerId ."';";
			$this->dbm->insert($sql);
		}

		function AddWrongAnswer($answer, $questionId) {
			$sql = "insert into answers (answer, correct, question_id) values ('". $this->dbm->GetEscapedString($answer) ."', 0, ". $questionId .")";
			$this->dbm->insert($sql);
		}

		function DeleteAnswer($answerId) {
			$sql = "delete from answers where id = '". $answerId ."';";
			$this->dbm->insert($sql);
		}
	}
?>