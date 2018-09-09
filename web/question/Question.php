<?php
	class Question {
		function __construct($id, $question, $answers){
			$this->id = $id;
			$this->question = $question;
			$this->answers = $answers;
		}

		function GetId(){
			return $this->id;
		}

		function GetQuestion(){
			return $this->question;
		}

		function GetAnswers() {
			return $this->answers;
		}

		function GetCorrectAnswer() {
			foreach ($this->answers as $answer) {
				if ($answer->IsCorrect()) {
					return $answer;
				}
			}
		}

		function GetwrongAnswers() {
			$wrongAnswers = array();

			foreach ($this->answers as $answer) {
				if (!$answer->IsCorrect()) {
					array_push($wrongAnswers, $answer);
				}
			}

			return $wrongAnswers;
		}
	}
?>