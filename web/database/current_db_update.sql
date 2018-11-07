ALTER TABLE `cosmos`.`challenge_attempts` DROP FOREIGN KEY `challenge_user_id_fk` ;
ALTER TABLE `cosmos`.`challenge_attempts` CHANGE COLUMN `user_id` `user_id` INT(11) NOT NULL  , 
  ADD CONSTRAINT `challenge_user_id_fk`
  FOREIGN KEY (`user_id` )
  REFERENCES `cosmos`.`users` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
