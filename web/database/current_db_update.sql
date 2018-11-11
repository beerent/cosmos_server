CREATE  TABLE `cosmos`.`challenge_answers` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL ,
  `answer_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `challenge_answers_user_id_fk_idx` (`user_id` ASC) ,
  INDEX `challenge_answers_answer_id_fk_idx` (`answer_id` ASC) ,
  CONSTRAINT `challenge_answers_user_id_fk`
    FOREIGN KEY (`user_id` )
    REFERENCES `cosmos`.`users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `challenge_answers_answer_id_fk`
    FOREIGN KEY (`answer_id` )
    REFERENCES `cosmos`.`answers` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `cosmos`.`challenge_answers` ADD COLUMN `attempt_id` INT NOT NULL  AFTER `answer_id` , 
  ADD CONSTRAINT `challenge_answers_attempt_id_fk`
  FOREIGN KEY (`attempt_id` )
  REFERENCES `cosmos`.`challenge_attempts` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
, ADD INDEX `challenge_answers_attempt_id_fk_idx` (`attempt_id` ASC) ;
