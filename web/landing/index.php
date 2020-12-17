<html>
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="shortcut icon" href="https://www.knowyourcosmos.com/resources/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body { 
        background-image: url('./resources/logo_10.png');
        background-size: 60%;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        padding-bottom: 70px;
      }
      .footer {
        padding-top: 13px;
        padding-bottom: 5px;
      }
      .jumbotron {
        background: none
      }
      .right{
          float:right;
      }
      .left{
          float:left;
      }
      #wrapper{
          text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="jumbotron">
      <center>
        <h1>Know Your Cosmos</h1>
      </center>
      <hr class="my-4">

      <?php
        $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/live/challenge/ChallengeManager.php"; include_once ($include);
        $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/config/ConfigDataManager.php"; include_once ($include);

        $challenge_manager = new ChallengeManager();
        $config_data_manager = new ConfigDataManager();

        function ServerIsHealthy() {
          $url = "https://knowyourcosmos.com:13213/health";
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
          curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
          $result = curl_exec($ch);
          curl_close($ch);

          return strpos($result, "gaga X ari") !== false;
        }

        function DisplayServerBadges() {
          global $config_data_manager;

          echo "<div>";
          echo "<center>";

          $serverIsHealthy = ServerIsHealthy();
          if ($serverIsHealthy) {
            echo "<span class=\"badge badge-dark\">server status</span><span class=\"badge badge-success\">live</span>";
          } else {
            echo "<span class=\"badge badge-dark\">server status</span><span class=\"badge badge-danger\">down</span>";
          }

          $app_version = $config_data_manager->GetConfigValue('ios_app_version');
          echo "<span class=\"badge badge-dark\">version</span><span class=\"badge badge-info\">$app_version</span>";

          echo "</center>";
          echo "<br>";
          echo "</div>";
        }

        DisplayServerBadges();
      ?>

      <center>
        <p class="lead"><a href="https://apps.apple.com/us/app/know-your-cosmos/id1451492400"><img style="size: 40%" src="./resources/download.png" alt="Download Know Your Cosmos"/></a></p>
        <hr class="my-4">
      </center>

      <?php
        $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/live/challenge/ChallengeManager.php"; include_once ($include);

        $challenge_manager = new ChallengeManager();

        function DisplayLeaderboard() {
          global $challenge_manager;

          $leaderboard = $challenge_manager->GetLeaderboard();

          echo "<center>";
          echo "<div>";
          echo "Live Leaderboard";
          echo "<table style=\"width: auto;\" class=\"table table-bordered table-sm\">";
          echo "<thead>";
          echo "<tr>";
          echo "<th scope='col'>Place</th>";
          echo "<th scope='col'>Username</th>";
          echo "<th scope='col'>Points</th>";
          echo "</tr>";
          echo "</thead>";
          echo "<tbody>";
          $count = 1;
          foreach ($leaderboard as $entry)
          {
            echo "<tr>";
            echo "<td><center><font size='2'>" . $count++ . "</font></center></td>";
            echo "<td><font size='2'>" . $entry->GetUsername() . "</font></td>";
            echo "<td><center><font size='2'>" . $entry->GetPoints() * 10 . "</font></center></td>";
            echo "</tr>";
          }
          echo "</tbody>";
          echo "</table>";
          echo "</div>";
          echo "</center>";
        }

        DisplayLeaderboard();
      ?>

      <?php
        function DisplayReleaseNotes() {
          echo "<br>";
          echo "<center>Release Notes</center>";
          echo "<hr>";

          echo "<div class='overflow-auto' style='width:85%; height:150px; margin:auto;' id='release_notes_wrapper'>";

          $include = $_SERVER['DOCUMENT_ROOT']; $include .="/release_notes/ReleaseNotesManager.php"; include_once($include);
          $releaseNotesManager = new ReleaseNotesManager();

          $first = true;
          $releaseNotes = $releaseNotesManager->GetEnabledReleaseNotes();
          foreach ($releaseNotes as $releaseNote) {
            $notes = $releaseNote->GetNotes();
            $version = $releaseNote->GetVersion();
            $id = $releaseNote->GetId();
            $date = $releaseNote->GetDate();

            $paragraph  = "<p style='white-space: pre-wrap;'>";
            if ($first) {
              $paragraph .= "<hr style='height:2px;border-width:0; color:gray; background-color:gray'>";
              $first = false;
            }

            $paragraph .= "<p><span class=\"left\"><font size='1'><b>version ". $version ."</b></font></span><span class=\"right\"><font size='1'>". explode(" ", $date)[0] ."</font></span></p>";
            $paragraph .= "<br>";

            $paragraph .= "<p><font size='2'>" . $notes . "</font></p>";
            $paragraph .= "<hr style='height:2px; border-width:0; color:gray; background-color:gray'>";
            $paragraph .= "</p>";

            echo $paragraph;        
          }

          echo "</div>";
          echo "<hr>";          
        }

        DisplayReleaseNotes();
      ?>
      <div>
      <center>
        <a href="https://trello.com/b/fpAUlCsp/know-your-cosmos">Trello</a><br>
        <a href="https://github.com/beerent/cosmos_server">Server Github</a><br>
        <a href="https://github.com/beerent/cosmos_client">Client Github</a>
      </center>
      </div>
    </div>

    <div class="fixed-bottom bg-light text-dark footer">
    <center>
      <h6><small><a href="https://www.brentryczak.com" target="_top">Brent Ryczak</a> · <a href="https://www.linkedin.com/in/nabarletta/" target="_top">Nick Barletta</a></small></h6>
    </center>
    </div>
  </body>
</html>
