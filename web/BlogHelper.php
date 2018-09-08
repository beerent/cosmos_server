<?php
  include_once("./BlogManager.php");
  $blogManager = new BlogManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
  	$blogPost = $_GET['blog'];
    $blogAuthor = $_GET['name'];
  	$blogManager->AddBlog($blogPost, $blogAuthor);
  }
?>