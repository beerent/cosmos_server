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
