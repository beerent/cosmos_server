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