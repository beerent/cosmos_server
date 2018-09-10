<?php
	class BlogManager {
		function __construct(){
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/blog/Blog.php"; include_once($include);

			$this->dbm = new DatabaseManager();
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

		function GetEnabledBlogs() {
			$sql = "select id, blog, author, date from blogs where enabled = 1 order by id desc";
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

		function DisableBlog($id) {
			$sql = "update blogs set enabled = 0 where id = " . $id;
			echo $sql;
			$this->dbm->insert($sql);
		}

		function ReplaceStrings($from, $to, $string) {
			return str_replace($from, $to, $string);
		}
	}
?>