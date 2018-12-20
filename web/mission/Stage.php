<?php
	class Stage {
		function __construct($id, $title, $story, $missionId, $bucketId, $order){
			$this->id = $id;
			$this->title = $title;
			$this->story = $story;
			$this->missionId = $missionId;
			$this->bucketId = $bucketId;
			$this->order = $order;
		}

		function GetId(){
			return $this->id;
		}

		function GetTitle(){
			return $this->title;
		}

		function GetStory(){
			return $this->story;
		}

		function GetMissionId(){
			return $this->missionId;
		}

		function GetBucketId(){
			return $this->bucketId;
		}

		function GetOrder(){
			return $this->order;
		}
	}
?>