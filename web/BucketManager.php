<?php
	class BucketManager {
		function __construct(){
			include_once("./DBM.php");
			include_once("./Bucket.php");
			$this->dbm = new DBM();
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

			$results = $this->dbm->query($sql);
			$buckets = array();
			$count = 1;
			while($row = $results->fetch_assoc()){
				$bucket = new Bucket($row['id'], $row['name']);
				$count = $count + 1;
				array_push($buckets, $bucket);
			}
			return $buckets;
		}

		function GetBucketForQuestion($id) {
			$sql = "select buckets.id, buckets.name from buckets join question_bucket_map on buckets.id = question_bucket_map.bucket_id where question_bucket_map.question_id = ". $id;

			$result = $this->dbm->query($sql);
			$row = $result->fetch_assoc();
			$bucket = new Bucket($row['id'], $row['name']);
			return $bucket;
		}

		function RenameBucket($bucketId, $newBucketName) {
			$sql = "update buckets set name = '" . $newBucketName . "' where id = ". $bucketId .";";
			$this->dbm->insert($sql);
		}

		function EnableBucket($bucketId) {
			$sql = "update buckets set enabled = 1 where id = '". $bucketId ."';";
			$this->dbm->insert($sql);
		}

		function DisableBucket($bucketId) {
			$sql = "update buckets set enabled = 0 where id = '". $bucketId ."';";
			$this->dbm->insert($sql);
		}

		function AddBucket($bucketName) {
			$sql = "insert into buckets (name) values ('". $bucketName ."');";
			$this->dbm->insert($sql);
		}
	}
?>