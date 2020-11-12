<?php

  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/top.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeManager.php"; include_once($include);
  
  $challenge_manager = new ChallengeManager();

  function DisplayLeaderboard() {
  	global $challenge_manager;

  	$leaderboard = $challenge_manager->GetLeaderboard();

  	echo "<center>";
  	echo "<table border='1'>";
  	echo "<tr><td><b>Username</b></td><td><b>Points</b></td></tr>";
  	foreach ($leaderboard as $entry) {
  		echo "<tr><td>". $entry->GetUsername() . "</td><td>" . $entry->GetPoints() . "</td></tr>";
  	}
  	echo "</table>";
  	echo "</center>";
  }

    function DisplayQuickStats() {
    global $challenge_manager;

    $todaysPlays = $challenge_manager->GetTodaysPlayCount();
    #$thisWeeksPlays = $challenge_manager->GetThisWeeksPlayCount();
    #$thisMonthsPlays = $challenge_manager->GetThisMonthsPlayCount();

    echo "<center>";
    echo "<table border='1'>";
    echo "<tr><td>Today's Plays</td><td>" . $todaysPlays . "</td></tr>";
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

  echo "<center><b>MOST USER ATTEMPTS</b></center>";
  echo "<hr>";
  DisplayMostUserAttempts();
  echo "<hr><br><br>";
?>