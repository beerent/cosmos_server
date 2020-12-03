<?php
	class QuestionCount {

		function __construct($question, $count){
			$this->question = $question;
			$this->count = $count;
		}

		function GetQuestion() {
			return $this->question;
		}

		function GetCount() {
			return $this->count;
		}
	}
?>