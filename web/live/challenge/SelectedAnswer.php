<?php
	class SelectedAnswer {

		function __construct($question, $answer, $count){
			$this->question = $question;
			$this->answer = $answer;
			$this->count = $count;
		}

		function GetQuestion() {
			return $this->question;
		}

		function GetAnswer() {
			return $this->answer;
		}

		function GetCount() {
			return $this->count;
		}
	}
?>