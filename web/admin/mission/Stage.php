<?php
	class Stage {
		function __construct($id, $missionId, $bucketId, $title, $story, $order, $added){
			$this->id = $id;
			$this->missionId = $missionId;
			$this->bucketId = $bucketId;
			$this->title = $title;
			$this->story = $story;
			$this->order = $order;
			$this->added = $added;
		}

		function GetId(){
			return $this->id;
		}

		function GetMissionId(){
			return $this->missionId;
		}

		function GetBucketId(){
			return $this->bucketId;
		}

		function GetTitle(){
			return $this->title;
		}

		function GetStory(){
			return $this->story;
		}

		function GetOrder(){
			return $this->order;
		}

		function GetAdded(){
			return $this->added;
		}
	}
?>