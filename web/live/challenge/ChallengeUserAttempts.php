<?php
	class ChallengeUserAttempts {

		function __construct($username, $attempts){
			$this->username = $username;
			$this->attempts = $attempts;
		}

		function GetUsername() {
			return $this->username;
		}

		function GetAttempts() {
			return $this->attempts;
		}

	}
?>