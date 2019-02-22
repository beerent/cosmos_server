<?php
	class ChallengeLeaderboardEntry {

		function __construct($username, $points){
			$this->username = $username;
			$this->points = $points;
		}

		function GetUsername() {
			return $this->username;
		}

		function GetPoints() {
			return $this->points;
		}
	}
?>