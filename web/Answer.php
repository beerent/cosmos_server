<?php
	class Answer {
		function __construct($id, $answer, $correct){
			$this->id = $id;
			$this->answer = $answer;
			$this->correct = $correct == 1;
		}

		function GetId(){
			return $this->id;
		}

		function GetAnswer(){
			return $this->answer;
		}

		function IsCorrect(){
			return $this->correct;
		}
	}
?>