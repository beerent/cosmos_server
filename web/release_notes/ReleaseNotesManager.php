<?php
	class ReleaseNotesManager {
		function __construct(){
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/util/StringUtils.php"; include_once($include);
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/release_notes/ReleaseNote.php"; include_once($include);

			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function AddReleaseNotes($notes, $version) {
			$sql = "insert into release_notes (notes, version, date) values ('". $this->dbm->GetEscapedString($notes) ."', '". $this->dbm->GetEscapedString($version) ."', now());";
			$this->dbm->insert($sql);
		}

		function GetReleaseNotes() {
			$sql = "select id, notes, version, subtime(date, '5:0:0') as date from release_notes order by id desc";
			$results = $this->dbm->query($sql);

			$releaseNotes = array();
			while($row = $results->fetch_assoc()){
				$id = $row['id'];
				$notes = $row['notes'];

				$stringUtils = new StringUtils();
				$notes = $stringUtils->ReplaceStrings("{n}", "<br>", $notes);
				$version = $row['version'];
				$date = $row['date'];
				$releaseNote = new ReleaseNote($id, $notes, $version, $date);
				array_push($releaseNotes, $releaseNote);
			}

			return $releaseNotes;
		}

		function GetEnabledReleaseNotes() {
			$sql = "select id, notes, version, subtime(date, '5:0:0') as date from release_notes where enabled = 1 order by id desc";
			$results = $this->dbm->query($sql);

			$releaseNotes = array();
			while($row = $results->fetch_assoc()){
				$id = $row['id'];
				$notes = $row['notes'];
				$stringUtils = new StringUtils();

				$notes = $stringUtils->ReplaceStrings("{n}", "<br>", $notes);
				$version = $row['version'];
				$date = $row['date'];
				$releaseNote = new ReleaseNote($id, $notes, $version, $date);
				array_push($releaseNotes, $releaseNote);
			}

			return $releaseNotes;
		}

		function DisableReleaseNotes($id) {
			$sql = "update release_notes set enabled = 0 where id = " . $id;
			echo $sql;
			$this->dbm->insert($sql);
		}
	}
?>