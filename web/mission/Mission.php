<?php
	class Mission {
		function __construct($id, $title, $summary, $stages){
			$this->id = $id;
			$this->title = $title;
			$this->summary = $summary;
			$this->stages = $stages;
		}

		function GetId(){
			return $this->id;
		}

		function GetTitle(){
			return $this->title;
		}

		function GetSummary(){
			return $this->summary;
		}

		function GetStages(){
			return $this->stages;
		}
	}
?>