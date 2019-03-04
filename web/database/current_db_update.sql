CREATE  TABLE `cosmos`.`flagged_questions` (
  `id` INT NOT NULL ,
  `question_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `question_id_UNIQUE` (`question_id` ASC) ,
  INDEX `flagged_questions_user_id_idx` (`user_id` ASC) ,
  CONSTRAINT `flagged_questions_question_id`
    FOREIGN KEY (`question_id` )
    REFERENCES `cosmos`.`questions` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `flagged_questions_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `cosmos`.`users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `cosmos`.`flagged_questions` DROP FOREIGN KEY `flagged_questions_question_id` ;
ALTER TABLE `cosmos`.`flagged_questions` DROP COLUMN `question_id` 
, DROP INDEX `question_id_UNIQUE` ;

ALTER TABLE `cosmos`.`flagged_questions` ADD COLUMN `question_id` INT(11) NOT NULL  AFTER `id` , ADD COLUMN `resolved` VARCHAR(1) NOT NULL DEFAULT 0  AFTER `question_id` , 
  ADD CONSTRAINT `flagged_questions_question_id`
  FOREIGN KEY (`question_id` )
  REFERENCES `cosmos`.`questions` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
, ADD INDEX `flagged_questions_question_id_idx` (`question_id` ASC) ;

ALTER TABLE `cosmos`.`flagged_questions` ADD COLUMN `question_id` INT(11) NOT NULL  AFTER `id` , ADD COLUMN `resolved` VARCHAR(1) NOT NULL DEFAULT 0  AFTER `question_id` , 
  ADD CONSTRAINT `flagged_questions_question_id`
  FOREIGN KEY (`question_id` )
  REFERENCES `cosmos`.`questions` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
, ADD INDEX `flagged_questions_question_id_idx` (`question_id` ASC) ;

ALTER TABLE `cosmos`.`flagged_questions` ADD COLUMN `datetime` DATETIME NOT NULL DEFAULT now()  AFTER `user_id` ;

ALTER TABLE `cosmos`.`users` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `password_salt` ;

ALTER TABLE `cosmos`.`stages` CHANGE COLUMN `added` `added` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`questions` CHANGE COLUMN `added` `added` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`question_bucket_map` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `bucket_id` ;

ALTER TABLE `cosmos`.`missions` CHANGE COLUMN `added` `added` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`flagged_questions` CHANGE COLUMN `datetime` `added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP  ;

ALTER TABLE `cosmos`.`challenge_attempts` ADD COLUMN `added` DATETIME NULL DEFAULT now()  AFTER `user_id` ;

ALTER TABLE `cosmos`.`challenge_answers` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `attempt_id` ;

ALTER TABLE `cosmos`.`buckets` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `enabled` ;

ALTER TABLE `cosmos`.`blogs` CHANGE COLUMN `date` `date` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`answers` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `question_id` ;

ALTER TABLE `cosmos`.`flagged_questions` ADD COLUMN `resolved_date` DATETIME NULL DEFAULT NULL  AFTER `added` ;

