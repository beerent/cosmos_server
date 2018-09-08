<?php
  include("./BucketManager.php");
  $bucket_manager = new BucketManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
  	$name = $_GET['name'];
  	$bucket_manager->AddBucket($name);
  }

  else if ($option == "rename") {
  	$id = $_GET['id'];
  	$new = $_GET['new'];
  	$bucket_manager->RenameBucket($id, $new);
  }

  else if ($option == "enable") {
  	$id = $_GET['id'];
  	$bucket_manager->EnableBucket($id);
  }

  else if ($option == "disable") {
    $id = $_GET['id'];
    $bucket_manager->DisableBucket($id);
  }
?>