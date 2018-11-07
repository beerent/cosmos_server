CREATE  TABLE `cosmos`.`challenge_attempts` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `challenge_attempts_user_id_fk_idx` (`user_id` ASC) ,
  CONSTRAINT `challenge_attempts_user_id_fk`
    FOREIGN KEY (`user_id` )
    REFERENCES `cosmos`.`users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);