<?php
	class ConfigManager {
		function __construct() {
			$this->environment = $this->loadEnvironment();
			$this->config = $this->loadConfigFile();
		}

		function getDatabaseConnectionInfo() {
			return $this->config["database"][$this->environment];
		}

		function loadConfigFile() {
			$homeDirectory = $this->getHomeDirectory();
			return json_decode(file_get_contents($homeDirectory . ".cosmos/config"), true);
		}

		function loadEnvironment() {
			$environment = "development";
			if (is_dir("/home/ubuntu/")) {
				$environment = "production";
			}

			return $environment;
		}

		function getHomeDirectory() {
			$homeDirectory = "/Users/beerent/";
			if ($this->environment == "production") {
				$homeDirectory = "/home/ubuntu/";
			}

			return $homeDirectory;
		}
	}
?>