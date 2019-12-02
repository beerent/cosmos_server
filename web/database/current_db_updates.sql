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
