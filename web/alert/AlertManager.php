<?php
    $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/database/DatabaseManager.php"; include_once($include);
    $include = $_SERVER['DOCUMENT_ROOT']; $include .="/alert/Alert.php"; include_once($include);

	class AlertManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function AddAlert($key, $title, $alert) {
			$escapedKey = $this->dbm->GetEscapedString($key);
			$escapedTitle = $this->dbm->GetEscapedString($title);
			$escapedAlert = $this->dbm->GetEscapedString($alert);

			$sql = "insert into alerts (`key`, title, alert) values ('$escapedKey', '$escapedTitle', '$escapedAlert');";

			$this->dbm->insert($sql);	
		}

		function DeleteAlert($id) {
			$escapedId = $this->dbm->GetEscapedString($id);
			$sql = "delete from alerts where id = $escapedId";

			$this->dbm->query($sql);
		}

		function GetAlerts() {
			$sql = "select id, `key`, title, alert from alerts order by id desc";

			$results = $this->dbm->query($sql);

			$alerts = array();
			while($row = $results->fetch_assoc()){
				$alert = new Alert($row['id'], $row['key'], $row['title'], $row['alert']);
				array_push($alerts, $alert);
			}

			return $alerts;
		}
	}
?>