<html>
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style>
      body { 
        background-image: url('./resources/logo_10.png');
        background-size: 60%;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center; 
      }
      
      .footer {
         position: fixed;
         left: 0;
         bottom: 0;
         width: 100%;
         text-align: center;
      }

    </style>
  </head>

  <body>

    <div class="p-5 text-center">
      <h1 class="mb-3">Know Your Cosmos</h1>
      <a href="https://apps.apple.com/us/app/know-your-cosmos/id1451492400"><img style="size: 40%" src="./resources/download.png" alt="Download Know Your Cosmos"/></a>
    </div>

    <?php
      $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeManager.php"; include_once($include);
      
      $challenge_manager = new ChallengeManager();

      function DisplayLeaderboard() {
        global $challenge_manager;

        $leaderboard = $challenge_manager->GetLeaderboard();

        echo "<center>";
        echo "  <b>Know Your Cosmos Live Leaderboard</b>";
        echo "  <div style='width: 25%'>";
        echo "  <table class='table table-bordered table-sm'>";
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

      DisplayLeaderboard();
    ?>

    <div>
      <center>
        <a href="https://github.com/beerent/cosmos_server">Server Github</a><br>
        <a href="https://github.com/beerent/cosmos_client">Client Github</a><br>
        <a href="https://view.monday.com/881326551-b9ad11ee494417fc500faa9b032c975d">Monday.com</a>
      </center>
    </div>

    <div class="footer">
      <hr>
      <p>Brent Ryczak · https://www.brentryczak.com · Nick Barletta</p>
    </div>

  </body>
</html>
