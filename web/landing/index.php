<html>
  <head>
    <title>Know Your Cosmos</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel='shortcut icon' type='image/x-icon' href='https://www.knowyourcosmos.com/favicon.ico'/>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-E9RX775H6Y"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-E9RX775H6Y');
    </script>
    
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
          echo " <span class=\"badge badge-dark\">version</span><span class=\"badge badge-info\">$app_version</span>";

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
          echo "<br>";
          echo "Live Leaderboard";
          echo "<hr>";
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
          echo "<hr>";
          echo "</div>";
          echo "</center>";
        }

        DisplayLeaderboard();
      ?>

      <?php
        $include = $_SERVER['DOCUMENT_ROOT']; $include .= "/live/challenge/ChallengeManager.php"; include_once ($include);

        $challenge_manager = new ChallengeManager();

        function DisplayUsageStats() {
          global $challenge_manager;

          $leaderboard = $challenge_manager->GetLeaderboard();
          $totalUsers = $challenge_manager->GetTotalUsers();
          $totalAttempts = $challenge_manager->GetTotalAttempts();
          $mostDedicated = $challenge_manager->GetMostUserAttempts()[0];
          $biggestFan = $challenge_manager->GetBiggestFan()[0];
          $recentAttempts = $challenge_manager->GetRecentUser()[0];
          $totalCorrectAnswers = $challenge_manager->GetTotalCorrectAnswers();
          $totalWrongAnswers = $challenge_manager->GetTotalWrongAnswers();
          $totalChatsSent = $challenge_manager->GetTotalChatsSent();
          $chatCounts = $challenge_manager->GetChatCounts();
          $recentChatters = $challenge_manager->GetMostRecentChatVisitor();

          echo "<center>";
          echo "<div>";
          echo "<br>";
          echo "App Usage";
          echo "<hr>";
          echo "<table style=\"width: auto;\" class=\"table table-bordered table-sm\">";
          echo "<tbody>";

          echo "<tr>";
          echo "<td><font size='2'>Total Users</font></td>";
          echo "<td><center><font size='2'>" . $totalUsers . "</font></center></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Total Games Plays</font></td>";
          echo "<td><center><font size='2'>" . $totalAttempts . "</font></center></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Total Chats Sent</font></td>";
          echo "<td><center><font size='2'>". $totalChatsSent ."</font></center></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Total Times Correct</font></td>";
          echo "<td><center><font size='2'>" . $totalCorrectAnswers . "</font></center></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Total Times Incorrect</font></td>";
          echo "<td><center><font size='2'>" . $totalWrongAnswers . "</font></center></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Correct Answer Average</font></td>";
          echo "<td><center><font size='2'>" . round($totalWrongAnswers / $totalCorrectAnswers, 5) * 100 . "%</font></center></td>";
          echo "</tr>";

          echo "</tbody>";
          echo "</table>";

          echo "<table style=\"width: auto;\" class=\"table table-bordered table-sm\">";
          echo "<tbody>";

          echo "<tr>";
          echo "<td><font size='2'>Most Dedicated Player</font></td>";
          echo "<td><font size='2'>" . $mostDedicated->GetUsername() . " (" . $mostDedicated->GetAttempts() . " plays) </font></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Most Frequent Player</font></td>";
          echo "<td><font size='2'>" . $biggestFan->GetUsername() . " (" . $biggestFan->GetAttempts() . " days) </font></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Most Recent Player</font></td>";
          echo "<td><font size='2'>" . $recentAttempts->GetUsername() . " (" . $recentAttempts->GetAttempts() . " minutes) </font></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Most Active Chatter</font></td>";
          echo "<td><font size='2'>". $chatCounts[0]->GetUsername() ." (". $chatCounts[0]->GetAttempts() ." chats)</font></td>";
          echo "</tr>";

          echo "<tr>";
          echo "<td><font size='2'>Most Recent Chat Visitor</font></td>";
          echo "<td><font size='2'>". $recentChatters[0]->GetUsername() ." (". $recentChatters[0]->GetAttempts() ." minutes ago)</font></td>";
          echo "</tr>";

          echo "</tbody>";
          echo "</table>";
          echo "<hr>";
          echo "</div>";
          echo "</center>";
        }

        DisplayUsageStats();
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
        <a href="https://github.com/beerent/cosmos_server">Server Github</a> · <a href="https://github.com/beerent/cosmos_client">Client Github</a>
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
