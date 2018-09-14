<?php
	class ProposedQuestion {
		function __construct($question, $correctAnswer){
			$this->question = $question;
			$this->correctAnswer = $correctAnswer;
			$this->bucketIds = array();
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

		function GetBucketIds() {
			return $this->bucketIds;
		}

		function AddBucketId($bucketId) {
			if ($bucketId == "") {
				return;
			}

			array_push($this->bucketIds, $bucketId);
		}

		function AddWrongAnswer($newWrongAnswer) {
			if ($newWrongAnswer == "") {
				return;
			}

			array_push($this->wrongAnswers, $newWrongAnswer);
		}

		function MeetsNewQuestionRequirements() {
			return $this->question != "" && $this->correctAnswer != "" && count($this->bucketIds) > 0 && count($this->wrongAnswers) > 0;
		}
	}
?>