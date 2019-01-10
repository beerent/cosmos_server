ALTER TABLE `cosmos`.`stages` DROP INDEX `order_UNIQUE` ;

ALTER TABLE `cosmos`.`challenge_answers` DROP FOREIGN KEY `challenge_answers_user_id_fk` ;
ALTER TABLE `cosmos`.`challenge_answers` DROP COLUMN `user_id` 
, DROP INDEX `challenge_answers_user_id_fk_idx` ;