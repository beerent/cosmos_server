<?php

function DisplayMenu() {
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include($include);
}

function DisplayTitle($title) {
  echo "<center>";
  echo "<h1>". $title ."</h1>";
  echo "<hr>";
  echo "</center>";
}

?>