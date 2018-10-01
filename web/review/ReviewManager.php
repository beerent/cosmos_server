<?php
	class ReviewManager {
		function __construct(){
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/database/DatabaseManager.php"; include_once($include);
			$include = $_SERVER['DOCUMENT_ROOT']; $include .="/review/Reviews.php"; include_once($include);

			$this->dbm = new DatabaseManager();
			$this->dbm->connect();
		}

		function GetReviews($questionId) {
			$sql = "select reviewer.name as name from question_reviews join reviewer on question_reviews.reviewer_id = reviewer.id where question_reviews.question_id = " . $questionId;
			$results = $this->dbm->query($sql);

			$beerentReviewed = false;
			$bobReviewed = false;
			while($row = $results->fetch_assoc()){
				$reviewerName = $row['name'];
				if ($reviewerName == "beerent") {
					$beerentReviewed = true;
				}

				else if($reviewerName == "bob") {
					$bobReviewed = true;
				}
			}

			return new Reviews($beerentReviewed, $bobReviewed);
		}

		function AddReview($questionId, $reviewerId) {
			$sql = "insert into question_reviews (question_id, reviewer_id) values (". $questionId .", ". $reviewerId .")";
			$this->dbm->insert($sql);
		}

		function RemoveReview($questionId, $reviewerId) {
			$sql = "delete from question_reviews where question_id = " . $questionId . " and reviewer_id = " . $reviewerId;
			echo $sql;
			$this->dbm->insert($sql);	
		}
	}
?>