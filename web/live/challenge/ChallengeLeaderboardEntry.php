<?php
	class ChallengeLeaderboardEntry {

		function __construct($username, $points, $seconds_per_question, $date){
			$this->username = $username;
			$this->points = $points;
			$this->seconds_per_question = $seconds_per_question;
			$this->date = $date;
		}

		function GetUsername() {
			return $this->username;
		}

		function GetPoints() {
			return $this->points;
		}

		function GetSecondsPerQuestion() {
			return $this->seconds_per_question;
		}

		function GetDate() {
			return $this->date;
		}
	}
?>