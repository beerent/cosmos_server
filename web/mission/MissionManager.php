<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/Mission.php"; include_once($include);

	class MissionManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function AddMission($missionTitle, $missionSummary) {
			$sql = "insert into missions (title, summary, added) values ('". $this->dbm->GetEscapedString($missionTitle) ."', '". $this->dbm->GetEscapedString($missionSummary) ."', now())";
			$missionId = $this->dbm->insert($sql);

			return $missionId;
		}

		function GetMissionByTitle($missionTitle) {
			$sql = "select id, title, summary, added from missions where title = '". $this->dbm->GetEscapedString($missionTitle) ."'";
			$result = $this->dbm->query($sql);
			$row = $result->fetch_assoc();

			$id = $row['id'];
			$title = $row['title'];
			$summary = $row['summary'];
			$added = $row['added'];

			return new Mission($id, $title, $summary, array(), $added);
		}

		function AddStage($missionId, $bucketId, $title, $story, $order) {
			$sql = "insert into stages (mission_id, bucket_id, title, story, stage_order, added) values (". $missionId .", ". $bucketId .", '". $this->dbm->GetEscapedString($title) ."', '". $this->dbm->GetEscapedString($story) ."', ". $order ." , now())";
			$stageId = $this->dbm->insert($sql);

			return $stageId;
		}
	}
?>