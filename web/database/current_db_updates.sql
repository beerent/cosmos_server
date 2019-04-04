CREATE  TABLE `cosmos`.`question_reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT ,
  `question_id` INT NULL ,
  `user_id` INT NULL ,
  PRIMARY KEY (`review_id`) ,
  UNIQUE INDEX `unique_pair` (`question_id` ASC, `user_id` ASC) );