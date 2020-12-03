<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/conf/ConfigManager.php"; include_once($include);

	class DatabaseManager {
		var $conn;
		
		function __construct(){
			$this->cm = new ConfigManager();
		}

		function connect(){
			$user =     $this->cm->getProperty("database", "user");
			$password = $this->cm->getProperty("database", "password");
			$host =     $this->cm->getProperty("database", "host");
			$port =     $this->cm->getProperty("database", "port");
			$database = $this->cm->getProperty("database", "db");
			$this->conn = mysqli_connect($host, $user, $password, $database);
		}

		function query($sql){
			return $this->conn->query($sql);
		}

		function insert($sql){
			$this->conn->query($sql);
			return $this->conn->insert_id;
		}

		function GetEscapedString($string) {
			return mysqli_real_escape_string($this->conn, $string);
		}
	}
?>