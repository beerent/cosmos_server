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
