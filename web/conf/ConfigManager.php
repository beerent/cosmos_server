<?php
	class ConfigManager {
		function __construct(){
			
		}

		function getProperty($config, $key){
			$file = $this->getConfigFileNameByKey($config);
			if ($file == NULL)
				return NULL;

			$handle = fopen($file, "r");
			if ($handle) {
				while (($line = fgets($handle)) !== false) {
					$line = explode("=", $line);
					if (strcmp($line[0], $key) == 0)
						return trim($line[1]);

				}
				fclose($handle);
			}

			throw new Exception('fatal error! failed to load property: '.$key.' from '. $config);
		}

		function getConfigFileNameByKey($key){
			$path = $_SERVER['DOCUMENT_ROOT'];
			if(strcmp($key, "database") == 0){
				return $path . "/conf/db.conf";
			}
			return NULL;
		}
	}
?>