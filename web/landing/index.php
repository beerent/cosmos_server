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

    </style>
  </head>

  <body>
<div class="jumbotron">
  <center>
  <h1>Know Your Cosmos</h1>
  <hr class="my-4">
  <p class="lead"><a href="https://apps.apple.com/us/app/know-your-cosmos/id1451492400"><img style="size: 40%" src="./resources/download.png" alt="Download Know Your Cosmos"/></a></p>
  </center>
</div>

    <?php
      $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeManager.php"; include_once($include);
      
      $challenge_manager = new ChallengeManager();

      function DisplayLeaderboard() {
        global $challenge_manager;

        $leaderboard = $challenge_manager->GetLeaderboard();

        echo "<center>";
        echo "  <div>";
        echo "  <table style=\"width: auto;\" class=\"table table-bordered table-sm\">";
        echo "    <thead>";
        echo "      <tr>";
        echo "        <th scope='col'>Place</th>";
        echo "        <th scope='col'>Username</th>";
        echo "        <th scope='col'>Points</th>";
        echo "      </tr>";
        echo "    </thead>";
        echo "    <tbody>";
        $count = 1;
        foreach ($leaderboard as $entry) {
          echo "      <tr>";
          echo "        <td>". $count++ . "</td>";
          echo "        <td>". $entry->GetUsername() . "</td>";
          echo "        <td>" . $entry->GetPoints() * 10 . "</td>";
          echo "      </tr>";
        }
        echo "      </tbody>";
        echo "    </table>";
        echo "  </div>";
        echo "</center>";
      }

      function ServerIsHealthy() {
        $url = "https://knowyourcosmos.com:13213/health";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,  2);
        $result = curl_exec($ch);
        curl_close($ch);

        return strpos($result, "gaga X ari") !== false;        
      }

      function DisplayServerBadges() {
        echo "<div>";
        echo "  <center>";

        $serverIsHealthy = ServerIsHealthy();
        if ($serverIsHealthy) {
          echo "<span class=\"badge badge-dark\">server status</span><span class=\"badge badge-success\">live</span>";
        } else {
          echo "<span class=\"badge badge-dark\">server status</span><span class=\"badge badge-danger\">down</span>";
        }
        echo " <span class=\"badge badge-dark\">version</span><span class=\"badge badge-info\">1.1.1</span>";

        echo "  </center>";
        echo "  <br>";
        echo "</div>";
      }

      DisplayLeaderboard();
      DisplayServerBadges();
    ?>

    <div>
      <center>
        <a href="https://github.com/beerent/cosmos_server">Server Github</a><br>
        <a href="https://github.com/beerent/cosmos_client">Client Github</a><br>
        <a href="https://view.monday.com/881326551-b9ad11ee494417fc500faa9b032c975d">Monday.com</a>
      </center>
    </div>

    <div class="fixed-bottom bg-light text-dark footer">
      <center><h6><small>Brent Ryczak · brentryczak@gmail.com · www.brentryczak.com</small></h6></center>
    </div>
  </body>
</html>
