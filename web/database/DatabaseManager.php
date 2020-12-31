<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/conf/ConfigManager.php"; include_once($include);

	class DatabaseManager {
		var $conn;
		
		function __construct(){
			$this->cm = new ConfigManager();
		}

		function connect() {
			$databaseConnectionInfo = $this->cm->getDatabaseConnectionInfo();
			$user =     $databaseConnectionInfo["user"];
			$password = $databaseConnectionInfo["password"];
			$host =     $databaseConnectionInfo["host"];
			$port =     $databaseConnectionInfo["port"];
			$database = $databaseConnectionInfo["database"];
			$this->conn = mysqli_connect($host, $user, $password, $database);
		}

		function query($sql) {
			return $this->conn->query($sql);
		}

		function insert($sql) {
			$this->conn->query($sql);
			return $this->conn->insert_id;
		}

		function GetEscapedString($string) {
			return mysqli_real_escape_string($this->conn, $string);
		}
	}
?>