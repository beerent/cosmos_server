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

CREATE  TABLE `cosmos`.`missions` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `summary` TEXT NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) );

CREATE  TABLE `cosmos`.`stages` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `mission_id` INT NOT NULL ,
  `order` INT NOT NULL ,
  `bucket_id` INT NOT NULL ,
  `story` TEXT NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `order_UNIQUE` (`mission_id` ASC, `order` ASC) ,
  INDEX `stage_bucket_fk_idx` (`bucket_id` ASC) ,
  INDEX `stage_mission_fk_idx` (`mission_id` ASC) ,
  CONSTRAINT `stage_mission_fk`
    FOREIGN KEY (`mission_id` )
    REFERENCES `cosmos`.`missions` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `stage_bucket_fk`
    FOREIGN KEY (`bucket_id` )
    REFERENCES `cosmos`.`buckets` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

drop table `cosmos`.`sessions`;

CREATE  TABLE `cosmos`.`mission_queue` (
  `id` INT NOT NULL ,
  `mission_id` INT NOT NULL ,
  `order` INT NOT NULL AUTO_INCREMENT ,
  `completed` INT NOT NULL DEFAULT 0 ,
  `active` INT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `order_UNIQUE` (`order` ASC) ,
  UNIQUE INDEX `mission_id_UNIQUE` (`mission_id` ASC) ,
  UNIQUE INDEX `active_UNIQUE` (`active` ASC) ,
  CONSTRAINT `mission_queue_mission_id_fk`
    FOREIGN KEY (`mission_id` )
    REFERENCES `cosmos`.`missions` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `cosmos`.`missions` ADD COLUMN `title` VARCHAR(500) NOT NULL  AFTER `id` 
, ADD UNIQUE INDEX `title_UNIQUE` (`title` ASC) ;

ALTER TABLE `cosmos`.`missions` ADD COLUMN `added` DATETIME NOT NULL  AFTER `summary`;
ALTER TABLE `cosmos`.`stages` CHANGE COLUMN `order` `order` INT(11) NOT NULL  AFTER `story` , ADD COLUMN `title` VARCHAR(500) NOT NULL  AFTER `bucket_id` , ADD COLUMN `added` DATETIME NOT NULL  AFTER `order`;
ALTER TABLE `cosmos`.`stages` CHANGE COLUMN `order` `stage_order` INT(11) NOT NULL;

drop table `cosmos`.`mission_queue`;
ALTER TABLE `cosmos`.`missions` ADD COLUMN `order` INT(11) NOT NULL DEFAULT -1  AFTER `added` , ADD COLUMN `complete` INT(11) NOT NULL DEFAULT 0  AFTER `order` ;
ALTER TABLE `cosmos`.`missions` CHANGE COLUMN `order` `mission_order` INT(11) NOT NULL DEFAULT '-1';

ALTER TABLE `cosmos`.`missions` ADD COLUMN `enabled` INT(11) NOT NULL DEFAULT 1  AFTER `complete` ;

ALTER TABLE `cosmos`.`stages` DROP INDEX `order_UNIQUE` ;

ALTER TABLE `cosmos`.`challenge_answers` DROP FOREIGN KEY `challenge_answers_user_id_fk` ;
ALTER TABLE `cosmos`.`challenge_answers` DROP COLUMN `user_id` 
, DROP INDEX `challenge_answers_user_id_fk_idx` ;

insert into users (username, email, password_salt) values ("cosmic_bob", "nbarletta5@gmail.com", "brentsmells");
insert into users (username, email, password_salt) values ("meatbadnoeat", "idk@gmail.com", "wheatbread");
insert into users (username, email, password_salt) values ("pixietyger", "idk2@gmail.com", "orion");



UPDATE `cosmos`.`reviewer` SET `name`='cosmic_bob' WHERE `id`='1';





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


ALTER TABLE `cosmos`.`flagged_questions` CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT  ;

drop table `cosmos`.`question_reviews`;
drop table `cosmos`.`reviewer`;

CREATE  TABLE `cosmos`.`privileges_enum` (
  `privilege` VARCHAR(45) NOT NULL );

ALTER TABLE `cosmos`.`privileges_enum` ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT  FIRST 
, ADD PRIMARY KEY (`id`) ;

INSERT into privileges_enum (privilege) values ("ADMIN");

CREATE  TABLE `cosmos`.`user_privilege_map` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL ,
  `privilege_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `user_privilege_map_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `unique_entry` (`user_id` ASC, `privilege_id` ASC) ,
  INDEX `privileges_map_user_fk_idx` (`user_id` ASC) ,
  INDEX `privileges_map_privilege_fk_idx` (`privilege_id` ASC) ,
  CONSTRAINT `privileges_map_user_fk`
    FOREIGN KEY (`user_id` )
    REFERENCES `cosmos`.`users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `privileges_map_privilege_fk`
    FOREIGN KEY (`privilege_id` )
    REFERENCES `cosmos`.`privileges_enum` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `cosmos`.`user_privilege_map` (`id`, `user_id`, `privilege_id`) VALUES ('1', '1', '1');
INSERT INTO `cosmos`.`user_privilege_map` (`id`, `user_id`, `privilege_id`) VALUES ('2', '2', '1');

CREATE  TABLE `cosmos`.`question_reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT ,
  `question_id` INT NULL ,
  `user_id` INT NULL ,
  PRIMARY KEY (`review_id`) ,
  UNIQUE INDEX `unique_pair` (`question_id` ASC, `user_id` ASC) );
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



INSERT INTO `cosmos`.`privileges_enum` (`id`, `privilege`) VALUES ('2', 'MEMBER');
INSERT INTO `cosmos`.`privileges_enum` (`id`, `privilege`) VALUES ('3', 'GUEST');

DROP TABLE `cosmos`.`user_privilege_map`;

ALTER TABLE `cosmos`.`users` 
ADD COLUMN `access_level` INT(11) NULL AFTER `password_salt`;

UPDATE `cosmos`.`users` SET `access_level` = '1' WHERE (`id` = '1');
UPDATE `cosmos`.`users` SET `access_level` = '1' WHERE (`id` = '2');
UPDATE `cosmos`.`users` SET `access_level` = '3' WHERE (`id` = '3');
UPDATE `cosmos`.`users` SET `access_level` = '3' WHERE (`id` = '4');

ALTER TABLE `cosmos`.`users` 
CHANGE COLUMN `access_level` `access_level` INT(11) NOT NULL ,
ADD INDEX `users_access_fk_1_idx` (`access_level` ASC);
;
ALTER TABLE `cosmos`.`users` 
ADD CONSTRAINT `users_access_fk_1`
  FOREIGN KEY (`access_level`)
  REFERENCES `cosmos`.`privileges_enum` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `cosmos`.`users` 
ADD UNIQUE INDEX `user_access_unique` (`username` ASC, `access_level` ASC),
DROP INDEX `username_UNIQUE` ;
;

INSERT INTO `cosmos`.`users` (`username`, `email`, `password_salt`, `access_level`) VALUES ('beerent', 'guest', 'guest', '3');
create table health
(
	id int auto_increment,
	health_string varchar(200) not null,
	constraint health_pk
		primary key (id)
);

insert into health (health_string) values ('gaga X ari');
create table config
(
	id int auto_increment,
	`key` varchar(50) not null,
	value varchar(50) not null,
	constraint config_pk
		primary key (id)
);

create unique index config_key_uindex
	on config (`key`);

insert into config (`key`, `value`) values ("challenge_mode_timer_length", "10");

insert into config(`key`, value) values ("challenge_mode_leaderboard_cutoff_date", "2020-12-02");
insert into config (`key`, value) values ("ios_app_version", "1.1.1");
create table messages
(
	id int auto_increment,
	message varchar(300) not null,
	start datetime not null,
	expire datetime not null,
	constraint messages_pk
		primary key (id)
);


rename table cosmos.blogs to release_notes;
alter table cosmos.release_notes change author version text not null;
alter table cosmos.release_notes change blog notes text not null;
update release_notes set enabled = 0;