<?php
	class Question {
		function __construct($id, $question, $citation, $answers, $enabled, $added) {
			$this->id = $id;
			$this->question = $question;
			$this->citation = $citation;
			$this->answers = $answers;
			$this->enabled = $enabled;
			$this->added = $added;
		}

		function GetId(){
			return $this->id;
		}

		function GetQuestion(){
			return $this->question;
		}

		function GetCitation(){
			return $this->citation;
		}

		function GetAnswers() {
			return $this->answers;
		}

		function GetAdded() {
			return $this->added;
		}

		function GetCorrectAnswer() {
			foreach ($this->answers as $answer) {
				if ($answer->IsCorrect()) {
					return $answer;
				}
			}
		}

		function IsEnabled() {
			return $this->enabled;
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