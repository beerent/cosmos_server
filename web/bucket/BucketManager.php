<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/Bucket.php"; include_once($include);

	class BucketManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function GetEnabledBuckets() {
			return $this->GetBuckets(1);
		}

		function GetDisabledBuckets() {
			return $this->GetBuckets(0);
		}

		function GetBuckets($enabledFlag) {
			$sql = "select id, name from buckets where enabled = ". $enabledFlag ." order by id";
			return $this->GetBucketsFromSql($sql);
		}

		function GetBucketsForQuestion($id) {
			$sql = "select buckets.id, buckets.name from buckets join question_bucket_map on buckets.id = question_bucket_map.bucket_id where question_bucket_map.question_id = ". $id;
			return $this->GetBucketsFromSql($sql);
		}

		function GetAllBucketsAlphabetical() {
			$sql = "select id, name from buckets order by name asc";
			return $this->GetBucketsFromSql($sql);
		}

		function GetRemainingBucketsForMission($missionId) {
			$sql = "SELECT buckets.id, buckets.name FROM buckets where buckets.id not in (select bucket_id from stages where mission_id = ". $missionId .") order by name asc";
			return $this->GetBucketsFromSql($sql);
		}

		function GetBucketsFromSql($sql) {
			$results = $this->dbm->query($sql);

			$buckets = array();
			while($row = $results->fetch_assoc()){
				$bucket = new Bucket($row['id'], $row['name']);
				array_push($buckets, $bucket);
			}

			return $buckets;
		}

		function RenameBucket($bucketId, $newBucketName) {
			$sql = "update buckets set name = '" . $newBucketName . "' where id = ". $bucketId .";";
			echo $sql;
			$this->dbm->insert($sql);
		}

		function EnableBucket($bucketId) {
			$sql = "update buckets set enabled = 1 where id = '". $bucketId ."';";
			echo $sql;
			$this->dbm->insert($sql);
		}

		function DisableBucket($bucketId) {
			$sql = "update buckets set enabled = 0 where id = '". $bucketId ."';";
			echo $sql;
			$this->dbm->insert($sql);
		}

		function AddBucket($bucketName) {
			$sql = "insert into buckets (name) values ('". $bucketName ."');";
			echo $sql;
			$this->dbm->insert($sql);
		}

		function BucketListContainsBucket($bucketList, $bucket) {
			for($i = 0; $i < count($bucketList); $i++) {
				if ($bucketList[$i]->GetId() == $bucket->GetId()) {
					return true;
				}
			}

			return false;

		}
	}
?>