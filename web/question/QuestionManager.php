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

		function GetAllEnabledQuestions() {
			return $this->GetAllQuestions(1);
		}

		function GetDisabledQuestions($bucketId) {
			return $this->GetQuestions($bucketId, 0);
		}

		function GetAllDisabledQuestions() {
			return $this->GetAllQuestions(0);
		}

		function EnableQuestion($questionId) {
			$sql = "update questions set enabled = 1 where id = '". $questionId ."';";
			$this->dbm->insert($sql);
		}

		function DisableQuestion($questionId) {
			$sql = "update questions set enabled = 0 where id = '". $questionId ."';";
			$this->dbm->insert($sql);
		}
		function GetAllQuestions($enabled) {
			$sql = "select questions.id from questions where enabled = " . $enabled . " order by questions.id desc";
			$results = $this->dbm->query($sql);

			$questions = array();
			while($row = $results->fetch_assoc()){
				$questionId = $row['id'];
				$question = $this->GetQuestion($questionId);
				array_push($questions, $question);
			}

			return $questions;			
		}

		function GetEnabledQuestionCount() {
			$sql = "select count(id) as count from questions where enabled = 1";
			$result = $this->dbm->query($sql);

			$row = $result->fetch_assoc();
			return $row['count'];
		}

		function GetToReviewCount($name) {

			$sql = "select count(questions.id) as count from questions join question_reviews on questions.id = question_reviews.question_id join reviewer on question_reviews.reviewer_id = reviewer.id where reviewer.name = '". $name ."' and questions.enabled = 1;";
			$result = $this->dbm->query($sql);
			$row = $result->fetch_assoc();
			$toReview = $row['count'];
			$totalEnabledCount = $this->GetEnabledQuestionCount();

			return intval($totalEnabledCount) - intval($toReview);
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

		function GetBucketlessQuestions($enabledToggle) {
			$sql = "select distinct questions.id from questions where questions.id not in (select distinct question_id from question_bucket_map) and questions.enabled = " . $enabledToggle . " order by questions.id desc";
			$results = $this->dbm->query($sql);

			$questions = array();
			while($row = $results->fetch_assoc()){
				$questionId = $row['id'];
				$question = $this->GetQuestion($questionId);
				array_push($questions, $question);
			}

			return $questions;	
		}

		function GetFlaggedQuestions() {
			$sql = "select distinct question_id as id, added from flagged_questions where resolved = '0' order by added desc";
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
			$sql = "select question, enabled, citation, subtime(added, '5:0:0') as added from questions where id = '". $questionId ."'";
			$questionResult = $this->dbm->query($sql);
			$questionRow = $questionResult->fetch_assoc();
			$questionText = $questionRow['question'];
			$questionEnabled = $questionRow['enabled'];
			$questionAdded = $questionRow['added'];
			$questionCitation = $questionRow['citation'];

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

			$question = new Question($questionId, $questionText, $questionCitation, $answers, $questionEnabled, $questionAdded);	
			return $question;		
		}

		function UpdateQuestion($questionId, $newValue) {
			$sql = "update questions set question = '". $this->dbm->GetEscapedString($newValue) ."' where id = '". $questionId ."';";
			$this->dbm->insert($sql);
		}

		function UpdateQuestionCitation($questionId, $newValue) {
			$sql = "update questions set citation = '". $this->dbm->GetEscapedString($newValue) ."' where id = '". $questionId ."';";
			$this->dbm->insert($sql);
		}

		function AddQuestion($proposedQuestion) {
			if (false == $proposedQuestion->MeetsNewQuestionRequirements()) {
				return;
			}

			$sql = "insert into questions (question, citation, added) values ('". $this->dbm->GetEscapedString($proposedQuestion->GetQuestion()) ."', '". $this->dbm->GetEscapedString($proposedQuestion->GetCitation()) ."', now())";
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

    	function AddBucketMapping($questionId, $bucketId) {
			$sql = "insert into question_bucket_map (question_id, bucket_id) values (". $questionId .", ". $bucketId .");";
			$this->dbm->insert($sql);
    	}

    	function DeleteBucketMapping($questionId, $bucketId) {
			$sql = "delete from question_bucket_map where question_id = ". $questionId ." and bucket_id = " . $bucketId;
			$this->dbm->insert($sql);
    	}

    	function UnflagQuestion($questionId) {
   			$sql = "update flagged_questions set resolved = '1', resolved_date = now() where question_id = ". $questionId;
			$this->dbm->insert($sql);	
    	}

	}
?>