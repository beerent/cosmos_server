<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeLeaderboardEntry.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/SelectedAnswer.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeUserAttempts.php"; include_once($include);

	class ChallengeManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function GetLeaderboard() {
			$sql = "select users.username, challenge_answers.attempt_id, count(challenge_answers.id) as points from challenge_answers";
			$sql .= " join answers on challenge_answers.answer_id = answers.id";
			$sql .= " join challenge_attempts on challenge_answers.attempt_id = challenge_attempts.id";
			$sql .= " join users on challenge_attempts.user_id = users.id";
			$sql .= " where answers.correct = 1";
			$sql .= " group by challenge_attempts.id order by points desc, challenge_attempts.id limit 10;";

			$results = $this->dbm->query($sql);

			$leaderboard = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeLeaderboardEntry($row['username'], $row['points']);
				array_push($leaderboard, $entry);
			}

			return $leaderboard;
		}

		function GetWorldRankings() {

		}

		function GetRecentGames() {
			$sql = "select users.username, questions.question, answers.answer, answers.correct, challenge_answers.id from challenge_attempts join users on challenge_attempts.user_id = users.id join challenge_answers on challenge_answers.attempt_id = challenge_attempts.id join answers on challenge_answers.answer_id = answers.id join questions on questions.id = answers.question_id order by challenge_attempts.id desc, challenge_answers.id desc;";

			$results = $this->dbm->query($sql);
		}

		function GetMostWrongAnswers() {
			$sql = "select count(answers.id) as times, questions.question, answers.answer from challenge_answers join answers on challenge_answers.answer_id = answers.id join challenge_attempts on challenge_attempts.id = challenge_answers.attempt_id join questions on answers.question_id = questions.id where answers.correct = 0 group by answers.id order by times desc, answers.id desc limit 15";
			$results = $this->dbm->query($sql);

			$answers = array();
			while($row = $results->fetch_assoc()){
				$entry = new SelectedAnswer($row['question'], $row['answer'], $row['times']);
				array_push($answers, $entry);
			}

			return $answers;
		}

		function GetMostCorrectAnswers() {
			$sql = "select count(answers.id) as times, questions.question, answers.answer from challenge_answers join answers on challenge_answers.answer_id = answers.id join challenge_attempts on challenge_attempts.id = challenge_answers.attempt_id join questions on answers.question_id = questions.id where answers.correct = 1 group by answers.id order by times desc, answers.id desc limit 15";
			$results = $this->dbm->query($sql);

			$answers = array();
			while($row = $results->fetch_assoc()){
				$entry = new SelectedAnswer($row['question'], $row['answer'], $row['times']);
				array_push($answers, $entry);
			}

			return $answers;
		}

		function GetMostUserAttempts() {
			$sql = "select username, count(user_id) as attempts from challenge_attempts join users on users.id = challenge_attempts.user_id group by user_id;";
			$results = $this->dbm->query($sql);
			
			$attempts = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeUserAttempts($row['username'], $row['attempts']);
				array_push($attempts, $entry);
			}

			return $attempts;

		}
	}
?>