<script src="/base.js"></script>
<script src="./alert.js"></script>

<?php

$include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/alert/AlertManager.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/util/StringUtils.php"; include_once($include);

$alert_manager = new AlertManager();

function DisplayAddAlert() {
  echo "<center>";
  echo '<input size="10" type="text" placeholder="key" id="add_alert_key" value="" maxlength="300"> ';
  echo '<input size="20" type="text" placeholder="title" id="add_alert_title" value="" maxlength="300"> ';
  echo '<input size="60" type="text" placeholder="alert" id="add_alert_alert" value="" maxlength="300"> ';

  echo "<button onclick='if (AddAlert()){alert(\"Alert Added!\"); location.reload();}'>Add!</button>";
  echo "</center>";
}

function DisplayAlerts() {
  global $alert_manager;
  $stringUtils = new StringUtils();

  $alerts = $alert_manager->GetAlerts();

  echo "<center>";
  echo "<table border='1'>";
  echo "<tr><td><b>Key</b></td><td><b>Title</b></td><td><b>Alert</b></td><td><b>Action</b></td></tr>";
  foreach ($alerts as $alert) {
    echo "<tr>";
    echo "<td>" . $alert->GetKey() . "</td>";
    echo "<td>" . $alert->GetTitle() . "</td>";
    echo "<td>" . $alert->GetAlert() . "</td>";
    echo "<td><button onclick='if(confirm(\"delete \\\"". $alert->GetKey(). "\\\"?\")){DeleteAlert(". $alert->GetId() ."); location.reload();}'>Delete</button></td>";
    echo "</tr>";
  }
  echo "</table>";
  echo "</center>";
}

echo "<center><b>Alerts</b></center>";
echo "<hr>";
DisplayAddAlert();
echo "<br><br>";
DisplayAlerts();
echo "<hr>";
?>