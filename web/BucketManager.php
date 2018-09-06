<?php
	class BucketManager {
		function __construct(){
			include ("./DBM.php");
			include("./Bucket.php");
			$this->dbm = new DBM();
			$this->dbm->connect();
		}

		function GetBuckets() {
			$sql = "select id, name from buckets";

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

		function RenameBucket($currentBucketName, $newBucketName) {

		}

		function RemoveBucket($bucketName) {

		}

		function AddBucket($bucketName) {
			$sql = "insert into buckets (name) values ('". $bucketName ."');";
			$this->dbm->insert($sql);
		}
	}
?>