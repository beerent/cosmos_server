<?php
	class Mission {
		function __construct($id, $title, $summary, $stages, $added, $order, $complete){
			$this->id = $id;
			$this->title = $title;
			$this->summary = $summary;
			$this->stages = $stages;
			$this->added = $added;
			$this->order = $order;
			$this->complete = $complete;
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

		function GetAdded(){
			return $this->added;
		}

		function GetOrder(){
			return $this->order;
		}

		function GetComplete(){
			return $this->complete;
		}
	}
?>