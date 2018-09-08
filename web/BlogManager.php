<?php
	class BlogManager {
		function __construct(){
			include_once("./DBM.php");
			include_once("./Blog.php");
			$this->dbm = new DBM();
			$this->dbm->connect();
		}

		function AddBlog($blogPost, $blogAuthor) {
			$sql = "insert into blogs (blog, author, date) values ('". $this->dbm->GetEscapedString($blogPost) ."', '". $this->dbm->GetEscapedString($blogAuthor) ."', now());";
			$this->dbm->insert($sql);
		}

		function GetBlogs() {
			$sql = "select id, blog, author, date from blogs order by id desc";
			$results = $this->dbm->query($sql);

			$blogs = array();
			while($row = $results->fetch_assoc()){
				$id = $row['id'];
				$blogText = $row['blog'];
				$blogText = $this->ReplaceStrings("{n}", "<br>", $blogText);
				$author = $row['author'];
				$date = $row['date'];
				$blog = new Blog($id, $blogText, $author, $date);
				array_push($blogs, $blog);
			}

			return $blogs;
		}

		function ReplaceStrings($from, $to, $string) {
			return str_replace($from, $to, $string);
		}
	}
?>