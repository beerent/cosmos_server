ALTER TABLE `cosmos`.`question_reviews` 
  ADD CONSTRAINT `q_r_q_id`
  FOREIGN KEY (`question_id` )
  REFERENCES `cosmos`.`questions` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION, 
  ADD CONSTRAINT `q_r_u_id`
  FOREIGN KEY (`user_id` )
  REFERENCES `cosmos`.`users` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
, ADD INDEX `q_r_q_id_idx` (`question_id` ASC) 
, ADD INDEX `q_r_u_id_idx` (`user_id` ASC) ;
