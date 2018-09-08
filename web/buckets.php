
<?php
  include("./BucketManager.php");
  $bucket_manager = new BucketManager();
  $enabledBuckets = $bucket_manager->GetEnabledBuckets();
  $disabledBuckets = $bucket_manager->GetDisabledBuckets();
?>

<html lang="en">
  <head>
    <title>Buckets</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="./setInnerHTML.js"></script>
  </head>

  <body>
    <?php include 'top.html';?>
    
    <center>
      <h1>Buckets</h1>
      <br><br><br><br>

      <?php
        if (count($enabledBuckets) > 0) {
          $enabledTable = "<table id=\"enabled_bucket_table\" border=\"1\">";
          $enabledTable .= "<tr>";
          $enabledTable .= "<td><b><center>ID</center></b></td>";
          $enabledTable .= "<td><b><center>Bucket</center></b></td>";
          $enabledTable .= "<td><b><center>Rename</center></b></td>";
          $enabledTable .= "<td><b><center>Disable</center></b></td>";
          $enabledTable .= "</tr>";
            
          foreach ($enabledBuckets as $bucket) {
            $enabledTable .= "<tr>";
            $enabledTable .= '<td>' . $bucket->GetId() . '</td>';
            $enabledTable .= '<td>' . $bucket->GetName() . '</td>';
            $enabledTable .= '<td><input type="text" name="rename" id="rename_bucket_id_' . $bucket->GetId() . '"></td>';
            $enabledTable .= '<td><input type="checkbox" name="delete" id="disable_bucket_id_' . $bucket->GetId() . '"></td>';
            $enabledTable .= "</tr>";
          }
          $enabledTable .= "</table>";
          echo $enabledTable;
        }
      ?>
      <br><br>
      <input type="text" name="add_bucket" id="add_bucket">
      <button onclick="AddBucket(GetValue('add_bucket')); location.reload();">Add Bucket</button>
      <br><br>

      <?php
        if (count($disabledBuckets) > 0) {
          $disabledTable = "<table id=\"disabled_bucket_table\" border=\"1\">";
          $disabledTable .= "<tr>";
          $disabledTable .= "<td><b><center>ID</center></b></td>";
          $disabledTable .= "<td><b><center>Bucket</center></b></td>";
          $disabledTable .= "<td><b><center>Enable</center></b></td>";
          $disabledTable .= "</tr>";
            
          foreach ($disabledBuckets as $bucket) {
            $disabledTable .= "<tr>";
            $disabledTable .= '<td>' . $bucket->GetId() . '</td>';
            $disabledTable .= '<td>' . $bucket->GetName() . '</td>';
            $disabledTable .= '<td><input type="checkbox" name="delete" id="enable_bucket_id_' . $bucket->GetId() . '"></td>';
            $disabledTable .= "</tr>";
          }
          $disabledTable .= "</table>";
          echo $disabledTable;
        }
      ?>

      <br><br>
      <button onclick="RenameBuckets(); DisableBuckets(); EnableBuckets(); location.reload();">APPLY</button>
    </center>
  </body>
</html>

