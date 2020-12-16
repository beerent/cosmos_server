<?php
    $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/database/DatabaseManager.php"; include_once($include);
      $include = $_SERVER['DOCUMENT_ROOT']; $include .="/message/Message.php"; include_once($include);

	class MessageManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function GetAllMessages() {
			$whereCondition = "";
			return $this->GetMessages($whereCondition);
		}

		function GetActiveMessages() {
			$whereCondition = "start <= now() and expire >= now()";
			return $this->GetMessages($whereCondition);
		}

		function GetExpiredMessages() {
			$whereCondition = "expire < now()";
			return $this->GetMessages($whereCondition);
		}

		function GetFutureMessages() {
			$whereCondition = "start > now()";
			return $this->GetMessages($whereCondition);
		}

		function GetMessages($whereCondition) {
			$sql = "select id, message, start, expire from messages";
			if ($whereCondition != "") {
				$sql .= " where ";
				$sql .= $whereCondition;
			}

			$results = $this->dbm->query($sql);

			$messages = array();
			while($row = $results->fetch_assoc()){
				$message = new Message($row['id'], $row['message'], $row['start'], $row['expire']);
				array_push($messages, $message);
			}

			return $messages;
		}

		function UpdateMessageMessage($id, $message) {
			$escapedMessage = $this->dbm->GetEscapedString($message);
			$sql = "update messages set message = '$escapedMessage' where id = $id";
			$this->dbm->insert($sql);
		}

		function UpdateMessageStart($id, $start) {
			$escapedStart = $this->dbm->GetEscapedString($start);
			$sql = "update messages set start = '$escapedStart' where id = $id";
			$this->dbm->insert($sql);
		}

		function UpdateMessageExpire($id, $expire) {
			$escapedExpire = $this->dbm->GetEscapedString($expire);
			$sql = "update messages set expire = '$escapedExpire' where id = $id";
			$this->dbm->insert($sql);
		}

		function AddMessage($message, $start, $expire) {
			$escapedMessage = $this->dbm->GetEscapedString($message);
			$escapedStart = $this->dbm->GetEscapedString($start);
			$escapedExpire = $this->dbm->GetEscapedString($expire);

			$sql = "insert into messages (message, start, expire) values ('$escapedMessage', '$escapedStart', '$escapedExpire');";

			$this->dbm->insert($sql);	
		}
	}
?>