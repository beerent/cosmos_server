<html lang="en">
  <head>
    <title>Admin Panel</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="/base.js"></script>
  </head>

  <body>
    <?php  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include($include); ?>

    <center>
      <h1>Admin Panel</h1>
      <hr>
      <br><br>

      <button onclick="if(confirm('Update HQ Website?')){UpdateHQWebsite()}">Update HQ Website</button><br><br>
      <button onclick="if(confirm('Update HQ Database?')){UpdateHQDatabase()}">Update HQ Database</button><br><br>

      <br><br>

      <button onclick="if(confirm('Update HQ Website?')){UpdateHQWebsite()}">Update Staging Database</button><br><br>
      <button onclick="if(confirm('Update HQ Website?')){UpdateHQWebsite()}">Sync Staging Database</button><br><br>

      <button>Update Staging Questions</button><br><br>

    </center>
  </body>
</html>