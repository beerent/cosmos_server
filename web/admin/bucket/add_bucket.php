
<?php
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/bucket/BucketManager.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/util/StringUtils.php"; include_once($include);
$include = $_SERVER['DOCUMENT_ROOT']; $include .="/shared/CommonFunctions.php"; include_once($include);

function DisplayNewBucketOption() {
  echo "<center>";
  echo '<input type="text" name="add_bucket" id="add_bucket">';
  echo '<button onclick="AddBucket(GetValue(\'add_bucket\')); location.reload();">Add Bucket</button>';
  echo "<br><br>";
  echo "</center>";
}

?>

<html lang="en">
  <head>
    <title>Add Bucket</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="/base.js"></script>
    <script src="bucket.js"></script>
  </head>

  <body>
  <?php
    $bucket_manager = new BucketManager();

    DisplayMenu();
    DisplayTitle("Add Bucket");
    DisplayNewBucketOption();
    ?>
  </body>
</html>