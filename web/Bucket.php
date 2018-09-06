<?php
	class Bucket {
		function __construct($id, $name){
			$this->id = $id;
			$this->name = $name;
		}

		function GetId(){
			return $this->id;
		}

		function GetName(){
			return $this->name;
		}
	}
?>