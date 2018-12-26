<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/Mission.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/mission/Stage.php"; include_once($include);

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

		function UpdateMissionOrder($id, $order) {
			$sql = "update missions set mission_order = " . $order . " where id = " . $id;
			$this->dbm->insert($sql);
		}


		function GetMissions($enabled, $complete) {
			$enabledStr = "0";
			if ($enabled) {
				$enabledStr = "1";
			}

			$completeStr = "0";
			if ($complete) {
				$completeStr = "1";
			}

			$sql = "select id, title, summary, added, mission_order, complete, enabled from missions where enabled = ". $enabledStr ." and complete = ". $completeStr ." order by mission_order asc";

			$results = $this->dbm->query($sql);

			$missions = array();
			while($row = $results->fetch_assoc()){
				$mission = $this->GetMissionFromRow($row);
				array_push($missions, $mission);
			}

			return $missions;
		}

		function GetMissionByTitle($missionTitle) {
			$sql = "select id, title, summary, added, mission_order, complete, enabled from missions where title = '". $this->dbm->GetEscapedString($missionTitle) ."'";
			$result = $this->dbm->query($sql);
			$row = $result->fetch_assoc();
			return $this->GetMissionFromRow($row);
		}

		function GetMissionById($missionId) {
			$sql = "select id, title, summary, added, mission_order, complete, enabled from missions where id = '". $missionId ."'";
			$result = $this->dbm->query($sql);
			$row = $result->fetch_assoc();
			return $this->GetMissionFromRow($row);	
		}

		function GetMissionFromRow($row) {
			$id = $row['id'];
			$title = $row['title'];
			$summary = $row['summary'];
			$added = $row['added'];
			$order = $row['mission_order'];
			$complete = $row['complete'] == 1;
			$enabled = $row['enabled'] == 1;

			$stages = $this->GetStages($id);

			return new Mission($id, $title, $summary, $stages, $added, $order, $complete, $enabled);
		}

		function AddStage($missionId, $bucketId, $title, $story, $order) {
			$sql = "insert into stages (mission_id, bucket_id, title, story, stage_order, added) values (". $missionId .", ". $bucketId .", '". $this->dbm->GetEscapedString($title) ."', '". $this->dbm->GetEscapedString($story) ."', ". $order ." , now())";
			$stageId = $this->dbm->insert($sql);

			return $stageId;
		}

		function GetStages($missionId) {
			$sql = "select id, mission_id, bucket_id, title, story, stage_order, added from stages where mission_id = '". $missionId ."'";
			$results = $this->dbm->query($sql);

			$stages = array();
			while($row = $results->fetch_assoc()) {
				$stage = $this->GetStageFromRow($row);
				array_push($stages, $stage);
			}

			return $stages;
		}

		function GetStageFromRow($row) {
			$id = $row['id'];
			$mission_id = $row['mission_id'];
			$bucket_id = $row['bucket_id'];
			$title = $row['title'];
			$story = $row['story'];
			$stage_order = $row['stage_order'];
			$added = $row['added'];

			return new Stage($id, $mission_id, $bucket_id, $title, $story, $stage_order, $added);	
		}
	}
?>