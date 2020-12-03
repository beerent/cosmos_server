<?php
	class Blog {
		function __construct($id, $blog, $author, $date){
			$this->id = $id;
			$this->blog = $blog;
			$this->author = $author;
			$this->date = $date;
		}

		function GetId(){
			return $this->id;
		}

		function GetBlog(){
			return $this->blog;
		}

		function GetAuthor() {
			return $this->author;
		}

		function GetDate() {
			return $this->date;
		}
	}
?>