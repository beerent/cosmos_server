<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/blog/BlogManager.php"; include_once($include);

  $blogManager = new BlogManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
  	$blogPost = $_GET['blog'];
    $blogAuthor = $_GET['name'];
  	$blogManager->AddBlog($blogPost, $blogAuthor);
  }

  else if ($option == "disable") {
  	$id = $_GET['id'];
  	$blogManager->DisableBlog($id);
  }
?>