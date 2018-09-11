<?php
	class QuestionManager {
		function __construct(){
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/ProposedQuestion.php"; include_once($include);
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/question/Question.php"; include_once($include);
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/answer/Answer.php"; include_once($include);

			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function GetEnabledQuestions($bucketId) {
			return $this->GetQuestions($bucketId, 1);
		}

		function GetDisabledQuestions($bucketId) {
			return $this->GetQuestions($bucketId, 0);
		}

		function EnableQuestion($questionId) {
			$sql = "update questions set enabled = 1 where id = '". $questionId ."';";
			$this->dbm->insert($sql);
		}

		function DisableQuestion($questionId) {
			$sql = "update questions set enabled = 0 where id = '". $questionId ."';";
			$this->dbm->insert($sql);
		}

		function GetAllQuestions($bucketId) {
			$sql = "select questions.id from questions join question_bucket_map on question_bucket_map.question_id = questions.id where bucket_id = '" . $bucketId . "' order by questions.id desc";
			$results = $this->dbm->query($sql);

			$questions = array();
			while($row = $results->fetch_assoc()){
				$questionId = $row['id'];
				$question = $this->GetQuestion($questionId);
				array_push($questions, $question);
			}

			return $questions;			
		}

		function GetQuestions($bucketId, $enabledToggle) {
			$sql = "select questions.id from questions join question_bucket_map on question_bucket_map.question_id = questions.id where bucket_id = '" . $bucketId . "' and questions.enabled = " . $enabledToggle . " order by questions.id desc";
			$results = $this->dbm->query($sql);

			$questions = array();
			while($row = $results->fetch_assoc()){
				$questionId = $row['id'];
				$question = $this->GetQuestion($questionId);
				array_push($questions, $question);
			}

			return $questions;
		}

		function GetQuestion($questionId) {
			$sql = "select question, enabled from questions where id = '". $questionId ."'";
			$questionResult = $this->dbm->query($sql);
			$questionRow = $questionResult->fetch_assoc();
			$questionText = $questionRow['question'];
			$questionEnabled = $questionRow['enabled'];

			$sql = "select * from answers where question_id = '". $questionId ."'";
			$answerResults = $this->dbm->query($sql);
			$answers = array();
			$answerCount = 1;
			while($answerRow = $answerResults->fetch_assoc()){
				$answerId = $answerRow['id'];
				$answerText = $answerRow['answer'];
				$answerCorrect = $answerRow['correct'];

				$answer = new Answer($answerId, $answerText, $answerCorrect);
				$answerCount = $answerCount + 1;
				array_push($answers, $answer);					
			}

			$question = new Question($questionId, $questionText, $answers, $questionEnabled);	
			return $question;		
		}

		function UpdateQuestion($questionId, $newValue) {
			$sql = "update questions set question = '". $this->dbm->GetEscapedString($newValue) ."' where id = '". $questionId ."';";
			echo $sql;
			$this->dbm->insert($sql);
		}

		function UpdateQuestionBucket($questionId, $newValue) {
			$sql = "update question_bucket_map set bucket_id = '". $this->dbm->GetEscapedString($newValue) ."' where question_id = '". $questionId ."';";
			$this->dbm->insert($sql);
		}

		function AddQuestion($proposedQuestion) {
			if (false == $proposedQuestion->MeetsNewQuestionRequirements()) {
				return;
			}

			$sql = "insert into questions (question) values ('". $this->dbm->GetEscapedString($proposedQuestion->GetQuestion()) ."')";
			echo $sql;
			$questionId = $this->dbm->insert($sql);

			$sql = "insert into answers (answer, correct, question_id) values ('". $this->dbm->GetEscapedString($proposedQuestion->GetCorrectAnswer()) ."', '1', '". $questionId ."')";
			$this->dbm->insert($sql);

			foreach ($proposedQuestion->GetWrongAnswers() as $wrongAnswer) {
				$sql = "insert into answers (answer, correct, question_id) values ('". $this->dbm->GetEscapedString($wrongAnswer) ."', '0', '". $questionId ."')";
				$this->dbm->insert($sql);
			}

			foreach ($proposedQuestion->GetbucketIds() as $bucketId) {
				$sql = "insert into question_bucket_map (question_id, bucket_id) values ('". $questionId ."', '". $bucketId ."')";
				$this->dbm->insert($sql);
			}
		}

	}
?>