<?php
  include("./BucketManager.php");
  $bucket_manager = new BucketManager();
  
  $option = $_GET['option'];

  if ($option == "add") {
  	$name = $_GET['name'];
  	$bucket_manager->AddBucket($name);
  }
?>