<?php
	class ProposedQuestion {
		function __construct($question, $correctAnswer, $bucketId){
			$this->question = $question;
			$this->correctAnswer = $correctAnswer;
			$this->bucketId = $bucketId;
			$this->wrongAnswers = array();
		}

		function GetQuestion(){
			return $this->question;
		}

		function GetCorrectAnswer() {
			return $this->correctAnswer;
		}

		function GetWrongAnswers() {
			return $this->wrongAnswers;
		}

		function GetBucketId() {
			return $this->bucketId;
		}

		function AddWrongAnswer($newWrongAnswer) {
			if ($newWrongAnswer == "") {
				return;
			}

			array_push($this->wrongAnswers, $newWrongAnswer);
		}

		function MeetsNewQuestionRequirements() {
			return $this->question != "" && $this->correctAnswer != "" && count($this->wrongAnswers) > 2;
		}
	}
?>