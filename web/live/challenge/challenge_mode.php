<?php

  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeManager.php"; include_once($include);
  
  $challenge_manager = new ChallengeManager();

  function DisplayLeaderboard() {
  	global $challenge_manager;

  	$leaderboard = $challenge_manager->GetLeaderboard();

  	echo "<center>";
  	echo "<table border='1'>";
  	echo "<tr><td><b>Username</b></td><td><b>Points</b></td><td><b>Date</b></td></tr>";
  	foreach ($leaderboard as $entry) {
  		echo "<tr><td>". $entry->GetUsername() . "</td><td>" . $entry->GetPoints() . "</td><td>" . $entry->GetDate() . "</td></tr>";
  	}
  	echo "</table>";
  	echo "</center>";
  }

  function DisplayTotalAttempts() {
    global $challenge_manager;

    $totalAttempts = $challenge_manager->GetTotalAttempts();

    echo "<center>";
    echo "<table border='1'>";
    echo "<tr><td>" . $totalAttempts . "</td></tr>";
    echo "</table>";
    echo "</center>";
  }

  function DisplayRecentAttempts() {
    global $challenge_manager;

    $leaderboard = $challenge_manager->GetRecentAttempts();

    echo "<center>";
    echo "<table border='1'>";
    echo "<tr><td><b>Username</b></td><td><b>Points</b></td><td><b>Date</b></td></tr>";
    foreach ($leaderboard as $entry) {
      echo "<tr><td>". $entry->GetUsername() . "</td><td>" . $entry->GetPoints() . "</td><td>" . $entry->GetDate() . "</td></tr>";
    }
    echo "</table>";
    echo "</center>";
  }

  function DisplayQuickStats() {
    global $challenge_manager;

    $todaysPlays = $challenge_manager->GetPlayCount(0);
    $playsLast3Days = $challenge_manager->GetPlayCount(3);
    $playsLast7Days = $challenge_manager->GetPlayCount(7);
    $playsLast30Days = $challenge_manager->GetPlayCount(30);
    $playsLast60Days = $challenge_manager->GetPlayCount(60);
    $playsLast90Days = $challenge_manager->GetPlayCount(90);
    $totalPlays = $challenge_manager->GetPlayCount(10000);
    

    echo "<center>";
    echo "<table border='1'>";
    echo "<tr><td>Today's Plays</td><td>" . $todaysPlays . "</td></tr>";
    echo "<tr><td>Plays in last 3 Days</td><td>" . $playsLast3Days . "</td></tr>";
    echo "<tr><td>Plays in last 7 Days</td><td>" . $playsLast7Days . "</td></tr>";
    echo "<tr><td>Plays in last 30 Days</td><td>" . $playsLast30Days . "</td></tr>";
    echo "<tr><td>Plays in last 60 Days</td><td>" . $playsLast60Days . "</td></tr>";
    echo "<tr><td>Plays in last 90 Days</td><td>" . $playsLast90Days . "</td></tr>";
    echo "<tr><td>Total Plays</td><td>" . $totalPlays . "</td></tr>";
    echo "</table>";
    echo "</center>";
  }

  function DisplayMostWrongQuestions() {
  	global $challenge_manager;

  	$wrongAnswers = $challenge_manager->GetMostWrongQuestions();

  	echo "<center>";
  	echo "<table border='1'>";
  	echo "<tr><td><b>Question</b></td><td><b>Count</b></td></tr>";
  	foreach ($wrongAnswers as $entry) {
  		echo "<tr><td>". $entry->GetQuestion() . "</td><td>" . $entry->GetCount() . "</td></tr>";
  	}
  	echo "</table>";
  	echo "</center>";
  }

  function DisplayMostCorrectQuestions() {
  	global $challenge_manager;

  	$wrongAnswers = $challenge_manager->GetMostCorrectQuestions();

  	echo "<center>";
  	echo "<table border='1'>";
  	echo "<tr><td><b>Question</b></td><td><b>Count</b></td></tr>";
  	foreach ($wrongAnswers as $entry) {
  		echo "<tr><td>". $entry->GetQuestion() . "</td><td>" . $entry->GetCount() . "</td></tr>";
  	}
  	echo "</table>";
  	echo "</center>";
  }

  function DisplayMostWrongAnswers() {
  	global $challenge_manager;

  	$wrongAnswers = $challenge_manager->GetMostWrongAnswers();

  	echo "<center>";
  	echo "<table border='1'>";
  	echo "<tr><td><b>Question</b></td><td><b>Answer</b></td><td><b>Count</b></td></tr>";
  	foreach ($wrongAnswers as $entry) {
  		echo "<tr><td>". $entry->GetQuestion() . "</td><td>". $entry->GetAnswer() . "</td><td>" . $entry->GetCount() . "</td></tr>";
  	}
  	echo "</table>";
  	echo "</center>";
  }

  function DisplayMostCorrectAnswers() {
  	global $challenge_manager;

  	$correctAnswers = $challenge_manager->GetMostCorrectAnswers();

  	echo "<center>";
  	echo "<table border='1'>";
  	echo "<tr><td><b>Question</b></td><td><b>Answer</b></td><td><b>Count</b></td></tr>";
  	foreach ($correctAnswers as $entry) {
  		echo "<tr><td>". $entry->GetQuestion() . "</td><td>". $entry->GetAnswer() . "</td><td>" . $entry->GetCount() . "</td></tr>";
  	}
  	echo "</table>";
  	echo "</center>";
  }

  function DisplayNewUsers() {
    global $challenge_manager;

    $attempts = $challenge_manager->GetNewUsers();

    echo "<center>";
    echo "<table border='1'>";
    echo "<tr><td><b>Username</b></td><td><b>Days Old</b></td></tr>";
    foreach ($attempts as $entry) {
      echo "<tr><td>". $entry->GetUsername() . "</td><td>". $entry->GetDaysOld() . "</td></tr>";
    }
    echo "</table>";
    echo "</center>";
  }

  function DisplayMostUserAttempts() {
  	global $challenge_manager;

  	$attempts = $challenge_manager->GetMostUserAttempts();

  	echo "<center>";
  	echo "<table border='1'>";
  	echo "<tr><td><b>Username</b></td><td><b>Attempts</b></td></tr>";
  	foreach ($attempts as $entry) {
  		echo "<tr><td>". $entry->GetUsername() . "</td><td>". $entry->GetAttempts() . "</td></tr>";
  	}
  	echo "</table>";
  	echo "</center>";
  }








  echo "<br><br>";
  

  echo "<center><b>LEADERBOARD</b></center>";
  echo "<hr>";
  DisplayLeaderboard();
  echo "<hr><br><br>";

  echo "<center><b>TOTAL ATTEMPTS</b></center>";
  echo "<hr>";
  DisplayTotalAttempts();
  echo "<hr><br><br>";

  echo "<center><b>RECENT ATTEMPTS</b></center>";
  echo "<hr>";
  DisplayRecentAttempts();
  echo "<hr><br><br>";

  echo "<center><b>QUICK STATS</b></center>";
  echo "<hr>";
  DisplayQuickStats();
  echo "<hr><br><br>";

  echo "<center><b>MOST WRONG QUESTIONS</b></center>";
  echo "<hr>";
  DisplayMostWrongQuestions();
  echo "<hr><br><br>";

  echo "<center><b>MOST CORRECT QUESTIONS</b></center>";
  echo "<hr>";
  DisplayMostCorrectQuestions();
  echo "<hr><br><br>";

  echo "<center><b>MOST WRONG ANSWERS</b></center>";
  echo "<hr>";
  DisplayMostWrongAnswers();
  echo "<hr><br><br>";

  echo "<center><b>MOST CORRECT ANSWERS</b></center>";
  echo "<hr>";
  DisplayMostCorrectAnswers();
  echo "<hr><br><br>";

  echo "<center><b>NEW USERS</b></center>";
  echo "<hr>";
  DisplayNewUsers();
  echo "<hr><br><br>";

  echo "<center><b>MOST USER ATTEMPTS</b></center>";
  echo "<hr>";
  DisplayMostUserAttempts();
  echo "<hr><br><br>";
?>