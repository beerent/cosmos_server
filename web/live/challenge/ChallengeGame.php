<?php
	class ChallengeGame {

		function __construct($username, $rounds){
			$this->username = $username;
			$this->rounds = $rounds;
		}

		function GetUsername() {
			return $this->username;
		}

		function GetRounds() {
			return $this->rounds;
		}
	}

	class ChallengeRound {
		function __construct($question, $answer, $correct) {
			$this->question = $question;
			$this->answer = $answer;
			$this->correct = $correct;
		}

		function GetQuestion() {
		}
	}
?>