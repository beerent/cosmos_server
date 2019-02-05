<?php
  
  $task = $_GET['task'];

  if ($task == "update_hq_website") {
    echo exec("pwd");
    echo "<br>";
    echo exec ("whoami");
  } else if ($task == "update_hq_database") {
    
  }

?>