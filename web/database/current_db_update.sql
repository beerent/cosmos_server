ALTER TABLE `cosmos`.`missions` ADD COLUMN `added` DATETIME NOT NULL  AFTER `summary`;
ALTER TABLE `cosmos`.`stages` CHANGE COLUMN `order` `order` INT(11) NOT NULL  AFTER `story` , ADD COLUMN `title` VARCHAR(500) NOT NULL  AFTER `bucket_id` , ADD COLUMN `added` DATETIME NOT NULL  AFTER `order`;
ALTER TABLE `cosmos`.`stages` CHANGE COLUMN `order` `stage_order` INT(11) NOT NULL;

#CHECK TO SEE IF ABOVE HAS BEEN APPLIED!
drop table `cosmos`.`mission_queue`;
ALTER TABLE `cosmos`.`missions` ADD COLUMN `order` INT(11) NOT NULL DEFAULT -1  AFTER `added` , ADD COLUMN `complete` INT(11) NOT NULL DEFAULT 0  AFTER `order` ;
ALTER TABLE `cosmos`.`missions` CHANGE COLUMN `order` `mission_order` INT(11) NOT NULL DEFAULT '-1';