<?php
	class ConfigEntry {

		function __construct($key, $value){
			$this->key = $key;
			$this->value = $value;
		}

		function GetKey() {
			return $this->key;
		}

		function GetValue() {
			return $this->value;
		}
	}
?>