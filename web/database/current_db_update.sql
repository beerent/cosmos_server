drop table flagged_questions;

CREATE TABLE `flagged_questions` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `resolved` varchar(1) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `flagged_questions_user_id_idx` (`user_id`),
  KEY `flagged_questions_question_id_idx` (`question_id`),
  CONSTRAINT `flagged_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `flagged_questions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;

ALTER TABLE `cosmos`.`users` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `password_salt` ;

ALTER TABLE `cosmos`.`stages` CHANGE COLUMN `added` `added` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`questions` CHANGE COLUMN `added` `added` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`question_bucket_map` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `bucket_id` ;

ALTER TABLE `cosmos`.`missions` CHANGE COLUMN `added` `added` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`challenge_attempts` ADD COLUMN `added` DATETIME NULL DEFAULT now()  AFTER `user_id` ;

ALTER TABLE `cosmos`.`challenge_answers` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `attempt_id` ;

ALTER TABLE `cosmos`.`buckets` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `enabled` ;

ALTER TABLE `cosmos`.`blogs` CHANGE COLUMN `date` `date` DATETIME NOT NULL DEFAULT now()  ;

ALTER TABLE `cosmos`.`answers` ADD COLUMN `added` DATETIME NOT NULL DEFAULT now()  AFTER `question_id` ;