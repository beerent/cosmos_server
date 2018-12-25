
<?php
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/util/StringUtils.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/shared/CommonFunctions.php"; include_once($include);

function BuildUpdateDivs() {
  echo '<div id="buckets_to_update" style="display:none"></div>';
  echo '<div id="buckets_to_toggle_enable" style="display:none"></div>';
}

function DisplayBuckets($buckets, $enabled) {
  $html = "<table border='1'>";
  $html .= "  <tr>";
  $html .= "    <td><b>ID</b></td>";
  $html .= "    <td><b>Bucket</b></td>";
  $html .= "    <td><b>Enabled</b></td>";
  $html .= "  </tr>";

  foreach ($buckets as $bucket) {
    $bucketId = $bucket->GetId();
    $elementId = "edit_bucket_id_". $bucketId;
    $stringUtils = new StringUtils();
    $bucketText = $bucket->GetName();
    $singleQuoteEscapedBucketText = $stringUtils->EscapeSingleQuotes($bucketText);

    $bucketText = '<input type="text" size="60" id="'.$elementId.'" value="'.htmlspecialchars($bucketText).'" maxlength="150" onchange="AddToBucketUpdateQueue(\''.$bucketId.'\', \''.$elementId.'\', \''.htmlspecialchars($singleQuoteEscapedBucketText).'\');">';

      $elementId = "edit_bucket_enabled_id_". $bucketId;

      $originalState = "enabled";
      if (!$enabled) {
        $originalState = "DISABLED";
      }
      $currentState = $originalState;

    $enabledButton = "<button id='". $elementId ."' value='". $originalState ."' onclick='AddToBucketEnableUpdateQueue(\"". $bucketId ."\", \"". $elementId ."\", \"". $originalState ."\");'>$currentState</button>";

    $html .= "  <tr>";
    $html .= "    <td><b>". $bucketId ."</b></td>";
    $html .= "    <td><b>". $bucketText ."</b></td>";
    $html .= "    <td><b>". $enabledButton ."</b></td>";
    $html .= "  </tr>";
  }

  $html .= "<table>";

  echo "<center>";
  echo $html;
  echo "</center>";
  echo "<br><br>";
}

function DisplayApplyButton() {
  echo "<center>";
  echo "<button onclick='if (CommitBucketUpdates() && CommitToggleEnableUpdates()){location.reload(); alert(\"Updates Saved!\")}'>Save Changes!</button>";
  echo "</center>";
}

?>

<html lang="en">
  <head>
    <title>Manage Buckets</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="/base.js"></script>
    <script src="bucket.js"></script>
  </head>

  <body>
  <?php
    $bucket_manager = new BucketManager();
    $enabledBuckets = $bucket_manager->GetEnabledBuckets();
    $disabledBuckets = $bucket_manager->GetDisabledBuckets();

    BuildUpdateDivs();
    DisplayMenu();
    DisplayTitle("Manage Buckets");
    DisplayApplyButton();
    DisplayBuckets($enabledBuckets, true);
    DisplayBuckets($disabledBuckets, false);
    ?>
  </body>
</html>