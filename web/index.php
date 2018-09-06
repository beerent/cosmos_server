
<?php
  include("./BucketManager.php");
  $bucket_manager = new BucketManager();
  $buckets = $bucket_manager->GetBuckets();
?>

<html lang="en">
  <head>
    <title>Question Buckets</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="./setInnerHTML.js"></script>
  </head>

  <body>
    <center>
      <h1>Question Buckets</h1>
      <br><br><br><br>

      <table border="1">
        <tr>
          <td><b><center>ID</center></b></td>
          <td><b><center>Bucket</center></b></td>
          <td><b><center>Rename</center></b></td>
          <td><b><center>Delete</center></b></td>
        </tr>

      <?php
        foreach ($buckets as $bucket) {
          echo "<tr>";
          echo '<td>' . $bucket->GetId() . '</td>';
          echo '<td>' . $bucket->GetName() . '</td>';
          echo '<td><input type="text" name="rename" id="rename_bucket_id_$bucket->GetId()"></td>';
          echo '<td><center><input type="checkbox" name="delete" id="delete_bucket_id_$bucket->GetId()"></center></td>';
          echo "</tr>";
        }
      ?>

      </table>

      <br><br>

      <input type="text" name="add_bucket" id="add_bucket">
      <button onclick="AddBucket(GetValue('add_bucket'));">Add Bucket</button>
      


      <br><br>
      <button>APPLY</button>
    </center>
  </body>
</html>

