<?php
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeLeaderboardEntry.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/SelectedAnswer.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/ChallengeUserAttempts.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/QuestionCount.php"; include_once($include);
  $include = $_SERVER['DOCUMENT_ROOT']; $include .="/live/challenge/NewUser.php"; include_once($include);

	class ChallengeManager {
		function __construct(){
			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function GetSecondsPerQuestion($attempt_id) {
			$sql = "select TIME_TO_SEC(timediff ((select added from challenge_answers where attempt_id = $attempt_id order by added desc limit 1), (select added from challenge_answers where attempt_id = $attempt_id order by added asc limit 1))) / (select count(*) from challenge_answers where attempt_id = $attempt_id) as seconds_per_question;";

			$results = $this->dbm->query($sql);

			if($row = $results->fetch_assoc()){
				return $row['seconds_per_question'];
			}

			return "0";
		}

		function GetLeaderboard() {
			$sql = "select users.username, challenge_answers.attempt_id as attempt_id, count(challenge_answers.id) as points, date(challenge_attempts.added) as date from challenge_answers";
			$sql .= " join answers on challenge_answers.answer_id = answers.id";
			$sql .= " join challenge_attempts on challenge_answers.attempt_id = challenge_attempts.id and date(challenge_attempts.added) > date((select value from config where `key` = 'challenge_mode_leaderboard_cutoff_date'))";
			$sql .= " join users on challenge_attempts.user_id = users.id";
			$sql .= " where answers.correct = 1";
			$sql .= " group by challenge_attempts.id order by points desc, challenge_attempts.id limit 10;";

			$results = $this->dbm->query($sql);

			$leaderboard = array();
			while($row = $results->fetch_assoc()){
				$seconds_per_question = $this->GetSecondsPerQuestion($row['attempt_id']);
				$entry = new ChallengeLeaderboardEntry($row['username'], $row['points'], $seconds_per_question, $row['date']);
				array_push($leaderboard, $entry);
			}

			return $leaderboard;
		}

		function GetFullLeaderboard() {
			$sql = "select users.username, challenge_answers.attempt_id as attempt_id, count(challenge_answers.id) as points, date(challenge_attempts.added) as date from challenge_answers";
			$sql .= " join answers on challenge_answers.answer_id = answers.id";
			$sql .= " join challenge_attempts on challenge_answers.attempt_id = challenge_attempts.id and date(challenge_attempts.added) > date((select value from config where `key` = 'challenge_mode_leaderboard_cutoff_date'))";
			$sql .= " join users on challenge_attempts.user_id = users.id";
			$sql .= " where answers.correct = 1";
			$sql .= " group by challenge_attempts.id order by points desc, challenge_attempts.id;";

			$results = $this->dbm->query($sql);

			$leaderboard = array();
			while($row = $results->fetch_assoc()){
				$seconds_per_question = $this->GetSecondsPerQuestion($row['attempt_id']);
				$entry = new ChallengeLeaderboardEntry($row['username'], $row['points'], $seconds_per_question, $row['date']);
				array_push($leaderboard, $entry);
			}

			return $leaderboard;
		}

		function GetTotalUsers() {
			$sql = "select count(*) as count from users;";

			$results = $this->dbm->query($sql);

			if($row = $results->fetch_assoc()){
				return $row['count'];
			}

			return "0";
		}

		function GetTotalAttempts() {
			$sql = "select count(*) as count from challenge_attempts;";

			$results = $this->dbm->query($sql);

			if($row = $results->fetch_assoc()){
				return $row['count'];
			}

			return "0";
		}

		function GetTotalChatsSent() {
			$sql = "select count(*) as count from cosmos_live_chat;";

			$results = $this->dbm->query($sql);

			if($row = $results->fetch_assoc()){
				return $row['count'];
			}

			return "0";
		}

		function GetTotalCorrectAnswers() {
			$sql = "select count(*) as count from challenge_answers join answers a on challenge_answers.answer_id = a.id where correct = 1;";

			$results = $this->dbm->query($sql);

			if($row = $results->fetch_assoc()){
				return $row['count'];
			}

			return "0";
		}

		function GetTotalWrongAnswers() {
			$sql = "select count(*) as count from challenge_answers join answers a on challenge_answers.answer_id = a.id where correct = 0;";

			$results = $this->dbm->query($sql);

			if($row = $results->fetch_assoc()){
				return $row['count'];
			}

			return "0";
		}

		function GetRecentAttempts() {
			$sql = "select users.username, challenge_answers.attempt_id, count(challenge_answers.id) - 1 as points, date(challenge_attempts.added) as date from challenge_answers";
			$sql .= " join answers on challenge_answers.answer_id = answers.id";
			$sql .= " join challenge_attempts on challenge_answers.attempt_id = challenge_attempts.id";
			$sql .= " join users on challenge_attempts.user_id = users.id";
			$sql .= " where date(challenge_attempts.added) > CURDATE() - 6";
			$sql .= " group by challenge_attempts.id order by challenge_attempts.id desc;";

			$results = $this->dbm->query($sql);

			$leaderboard = array();
			while($row = $results->fetch_assoc()){
				$seconds_per_question = $this->GetSecondsPerQuestion($row['attempt_id']);
				$entry = new ChallengeLeaderboardEntry($row['username'], $row['points'], $seconds_per_question, $row['date']);
				array_push($leaderboard, $entry);
			}

			return $leaderboard;
		}

		function GetPlayCount($daysBack) {
			$sql = "select count(*) as count from challenge_attempts where added > CURDATE() - INTERVAL $daysBack DAY;";
			$results = $this->dbm->query($sql);

			if ($row = $results->fetch_assoc()) {
				return $row['count'];
			}

			return "0";
		}

		function GetMostWrongQuestions() {
			$sql = "select count(questions.id) as times, questions.question from challenge_answers join answers on challenge_answers.answer_id = answers.id join challenge_attempts on challenge_attempts.id = challenge_answers.attempt_id join questions on answers.question_id = questions.id where answers.correct = 0 group by questions.id order by times desc limit 15";
			$results = $this->dbm->query($sql);

			$questions = array();
			while($row = $results->fetch_assoc()){
				$entry = new QuestionCount($row['question'], $row['times']);
				array_push($questions, $entry);
			}

			return $questions;			
		}

		function GetMostCorrectQuestions() {
			$sql = "select count(questions.id) as times, questions.question from challenge_answers join answers on challenge_answers.answer_id = answers.id join challenge_attempts on challenge_attempts.id = challenge_answers.attempt_id join questions on answers.question_id = questions.id where answers.correct = 1 group by questions.id order by times desc limit 15";
			$results = $this->dbm->query($sql);

			$questions = array();
			while($row = $results->fetch_assoc()){
				$entry = new QuestionCount($row['question'], $row['times']);
				array_push($questions, $entry);
			}

			return $questions;			
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
			$sql = "select distinct username, count(*) as attempts from challenge_attempts join users u on challenge_attempts.user_id = u.id group by username order by attempts desc limit 1;";
			$results = $this->dbm->query($sql);
			
			$attempts = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeUserAttempts($row['username'], $row['attempts']);
				array_push($attempts, $entry);
			}

			return $attempts;
		}

		function GetBiggestFan() {
			$sql = "select username, count(added) count from (select distinct username, date(challenge_attempts.added) added from challenge_attempts join users u on challenge_attempts.user_id = u.id)c where username not in ('beerent', 'Cosmic_Bob') group by username order by count desc limit 1;";
			$results = $this->dbm->query($sql);
			
			$attempts = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeUserAttempts($row['username'], $row['count']);
				array_push($attempts, $entry);
			}

			return $attempts;			
		}

		function GetRecentUser() {
			$sql = "select username, round(time_to_sec(timediff(utc_timestamp(), challenge_attempts.added))/60) as minutes from challenge_attempts join users u on challenge_attempts.user_id = u.id order by challenge_attempts.added desc limit 1;";
			$results = $this->dbm->query($sql);
			
			$attempts = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeUserAttempts($row['username'], $row['minutes']);
				array_push($attempts, $entry);
			}

			return $attempts;			
		}

		function GetChatCounts() {
			$sql = "select username, count(*) as count from cosmos_live_chat join users u on cosmos_live_chat.user_id = u.id group by user_id order by count desc;";
			$results = $this->dbm->query($sql);
			
			$attempts = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeUserAttempts($row['username'], $row['count']);
				array_push($attempts, $entry);
			}

			return $attempts;			
		}

		function GetMostRecentChatter() {
			$sql = "select username, round(TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP, cosmos_live_chat.added))/60) minutes from cosmos_live_chat join users u on cosmos_live_chat.user_id = u.id order by cosmos_live_chat.added desc limit 1;";
			$results = $this->dbm->query($sql);
			
			$attempts = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeUserAttempts($row['username'], $row['minutes']);
				array_push($attempts, $entry);
			}

			return $attempts;			
		}

		function GetMostRecentChatVisitor() {
			$sql = "select username, round(TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP, ping))/60) minutes from cosmos_live_ping join users u on cosmos_live_ping.user_id = u.id order by ping desc limit 1;";
			$results = $this->dbm->query($sql);
			
			$attempts = array();
			while($row = $results->fetch_assoc()){
				$entry = new ChallengeUserAttempts($row['username'], $row['minutes']);
				array_push($attempts, $entry);
			}

			return $attempts;			
		}

		function GetNewUsers() {
			$sql = "select distinct username, datediff(CURDATE(), added) + 1 as daysOld from users where added > CURDATE() - 6;";
			$results = $this->dbm->query($sql);
			
			$newUsers = array();
			while($row = $results->fetch_assoc()){
				$entry = new NewUser($row['username'], $row['daysOld']);
				array_push($newUsers, $entry);
			}

			return $newUsers;
		}
	}
?>