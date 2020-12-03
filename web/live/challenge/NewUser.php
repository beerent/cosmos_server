<?php
	class NewUser {

		function __construct($username, $daysOld){
			$this->username = $username;
			$this->daysOld = $daysOld;
		}

		function GetUsername() {
			return $this->username;
		}

		function GetDaysOld() {
			return $this->daysOld;
		}
	}
?>