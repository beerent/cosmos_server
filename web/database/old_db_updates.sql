ALTER TABLE `cosmos`.`question_bucket_map` DROP FOREIGN KEY `qbm2` , DROP FOREIGN KEY `qbm1` ;

ALTER TABLE `cosmos`.`question_bucket_map` 
DROP INDEX `question_id_UNIQUE` ;

ALTER TABLE `cosmos`.`question_bucket_map` 
  ADD CONSTRAINT `qbm1`
  FOREIGN KEY (`question_id` )
  REFERENCES `cosmos`.`questions` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION, 
  ADD CONSTRAINT `qbm2`
  FOREIGN KEY (`bucket_id` )
  REFERENCES `cosmos`.`buckets` (`id` )
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
, ADD INDEX `qbm1_idx` (`question_id` ASC) ;

ALTER TABLE `cosmos`.`blogs` ADD COLUMN `enabled` INT(1) NOT NULL DEFAULT 1  AFTER `date` ;

alter table question_bucket_map add constraint question_bucket_constraint unique (question_id, bucket_id);

ALTER TABLE `cosmos`.`questions` ADD COLUMN `added` DATETIME NULL  AFTER `enabled` ;

ALTER TABLE `cosmos`.`questions` ADD COLUMN `citation` VARCHAR(500) NULL  AFTER `question` ;

CREATE TABLE `reviewer` (`id` int(11) NOT NULL, `name` varchar(45) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `question_reviews` (
  `question_id` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  UNIQUE KEY `unique_` (`question_id`,`reviewer_id`) USING BTREE,
  KEY `review_fk_1_idx` (`question_id`),
  KEY `review_fk_2_idx` (`reviewer_id`),
  CONSTRAINT `review_fk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `review_fk_2` FOREIGN KEY (`reviewer_id`) REFERENCES `reviewer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;

insert into reviewer (id, name) values (0, "beerent");
insert into reviewer (id, name) values (1, "bob");

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