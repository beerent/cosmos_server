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
