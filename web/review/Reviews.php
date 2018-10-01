<?php
	class Reviews {
		function __construct($beerentReviewed, $bobReviewed) {
			$this->beerentReviewed = $beerentReviewed;
			$this->bobReviewed = $bobReviewed;
		}

		function IsReviewComplete() {
			return $this->BeerentReviewed() && $this->BobReviewed();
		}

		function BeerentReviewed() {
			return $this->beerentReviewed;
		}

		function BobReviewed() {
			return $this->bobReviewed;
		}
	}
?>