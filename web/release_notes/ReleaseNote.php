<?php
	class ReleaseNote {
		function __construct($id, $notes, $version, $date){
			$this->id = $id;
			$this->notes = $notes;
			$this->version = $version;
			$this->date = $date;
		}

		function GetId(){
			return $this->id;
		}

		function GetNotes(){
			return $this->notes;
		}

		function GetVersion() {
			return $this->version;
		}

		function GetDate() {
			return $this->date;
		}
	}
?>