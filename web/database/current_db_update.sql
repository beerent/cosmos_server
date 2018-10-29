drop table `cosmos`.`user_answers`;

CREATE  TABLE `cosmos`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(20) NOT NULL ,
  `email` VARCHAR(45) NOT NULL ,
  `password_salt` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) );

insert into users (username, email, password_salt) values ("beerent", "brentryczak@gmail.com", "turtle12");
