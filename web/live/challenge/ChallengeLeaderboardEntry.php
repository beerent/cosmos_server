<?php
	class ChallengeLeaderboardEntry {

		function __construct($username, $points, $date){
			$this->username = $username;
			$this->points = $points;
			$this->date = $date;
		}

		function GetUsername() {
			return $this->username;
		}

		function GetPoints() {
			return $this->points;
		}

		function GetDate() {
			return $this->date;
		}
	}
?>