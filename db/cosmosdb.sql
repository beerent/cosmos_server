-- MySQL dump 10.13  Distrib 5.7.16, for osx10.11 (x86_64)
--
-- Host: localhost    Database: cosmos
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(150) NOT NULL DEFAULT '',
  `correct` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `answers_questions_question_id_idx` (`question_id`),
  CONSTRAINT `answers_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog` text NOT NULL,
  `author` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buckets`
--

DROP TABLE IF EXISTS `buckets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buckets` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `enabled` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bucket_id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buckets`
--

LOCK TABLES `buckets` WRITE;
/*!40000 ALTER TABLE `buckets` DISABLE KEYS */;
/*!40000 ALTER TABLE `buckets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_bucket_map`
--

DROP TABLE IF EXISTS `question_bucket_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question_bucket_map` (
  `question_id` int(11) NOT NULL,
  `bucket_id` int(11) NOT NULL,
  UNIQUE KEY `question_id_UNIQUE` (`question_id`),
  KEY `qbm2_idx` (`bucket_id`),
  CONSTRAINT `qbm1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `qbm2` FOREIGN KEY (`bucket_id`) REFERENCES `buckets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_bucket_map`
--

LOCK TABLES `question_bucket_map` WRITE;
/*!40000 ALTER TABLE `question_bucket_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_bucket_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(150) NOT NULL,
  `enabled` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `question_UNIQUE` (`question`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=305 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (173,'brent',NULL),(174,'kek',NULL),(175,'kek',NULL),(176,'Norm',NULL),(177,'Norm',NULL),(178,'Norm',NULL),(179,'Matthew',NULL),(180,'TheGoodDogGirl',NULL),(181,'TheGoodDogGirl',NULL),(182,'Laura',NULL),(183,'Laura',NULL),(184,'brent',NULL),(185,'Brent',NULL),(186,'Brent',NULL),(187,'Brent',NULL),(188,'brent',NULL),(189,'brent',NULL),(190,'brent',NULL),(191,'brent',NULL),(192,'brent',NULL),(193,'brent',NULL),(194,'brent',NULL),(195,'brent',NULL),(196,'brnet',NULL),(197,'Brent',NULL),(198,'test',NULL),(199,'test',NULL),(200,'test',NULL),(201,'test',NULL),(202,'test',NULL),(203,'test',NULL),(204,'test',NULL),(205,'test',NULL),(206,'test',NULL),(207,'test',NULL),(208,'test',NULL),(209,'test',NULL),(210,'k',NULL),(211,'k',NULL),(212,'test23',NULL),(213,'test23',NULL),(214,'test',NULL),(215,'test',NULL),(216,'k',NULL),(217,'k',NULL),(218,'j',NULL),(219,'brent',NULL),(220,'brent',NULL),(221,'test',NULL),(222,'brent',NULL),(223,'test',NULL),(224,'brent',NULL),(225,'brent',NULL),(226,'fsf',NULL),(227,'kk',NULL),(228,'brent',NULL),(229,'kkk',NULL),(230,'kkk',NULL),(231,'kkk',NULL),(232,'kkk',NULL),(233,'lkj',NULL),(234,'test',NULL),(235,'test',NULL),(236,'test',NULL),(237,'test',NULL),(238,'k',NULL),(239,'j',NULL),(240,'hj',NULL),(241,'kjh',NULL),(242,'brent',NULL),(243,'brent',NULL),(244,'lkj',NULL),(245,';lkj',NULL),(246,';lkj',NULL),(247,';lkj',NULL),(248,'lkj',NULL),(249,';lk',NULL),(250,'lkj',NULL),(251,'lkj',NULL),(252,'lkj',NULL),(253,'lkj',NULL),(254,'lkj',NULL),(255,'lkj',NULL),(256,'brent',NULL),(257,'trdt',NULL),(258,'trt',NULL),(259,'trt',NULL),(260,'trt',NULL),(261,'trt',NULL),(262,'trt',NULL),(263,'trt',NULL),(264,'trdt',NULL),(265,'trdt',NULL),(266,'trdt',NULL),(267,'trdt',NULL),(268,'test',NULL),(269,'datetimetest','2017-08-17 17:58:20'),(270,'bren!','2017-08-17 18:02:38'),(271,'btet@','2017-08-17 18:03:05'),(272,'test4','2017-08-17 18:03:28'),(273,'test22','2017-08-17 18:03:43'),(274,'lkj','2017-08-17 23:38:45'),(275,'lkj','2017-08-17 18:40:03'),(276,'brent13','2017-08-17 18:40:13'),(277,'lkj','2017-08-17 18:40:46'),(278,'jkkkk','2017-08-17 18:41:45'),(279,'jjjjjj','2017-08-17 18:42:21'),(280,'jjkkjj','2017-08-17 18:43:33'),(281,'jjjjj','2017-08-17 18:43:54'),(282,'lkjklj','2017-08-17 18:44:48'),(283,'lkj','2017-08-17 18:46:52'),(284,'k','2017-08-17 18:51:03'),(285,'lkj','2017-08-18 21:53:25'),(286,'lkj','2017-08-18 21:54:00'),(287,'lkj','2017-08-18 21:54:56'),(288,'kl','2017-08-18 21:55:32'),(289,'kl','2017-08-18 21:55:53'),(290,'jk','2017-08-18 21:58:20'),(291,'jk','2017-08-18 22:00:24'),(292,'j','2017-08-18 22:04:07'),(293,'j','2017-08-18 22:04:23'),(294,'k','2017-08-18 22:06:28'),(295,'k','2017-08-18 22:07:49'),(296,'k','2017-08-18 22:22:27'),(297,'lkj','2017-08-18 22:40:58'),(298,'kkk','2017-08-18 22:42:27'),(299,'j','2017-08-18 22:57:50'),(300,'j','2017-08-18 23:08:47'),(301,'k','2017-08-18 23:08:52'),(302,'j','2017-08-18 23:09:16'),(303,'k','2017-08-18 23:09:35'),(304,'k','2017-08-18 23:09:56');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attempt_id` int(11) DEFAULT NULL,
  `answer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_attempts_attempts_id_idx` (`attempt_id`),
  KEY `user_attempts_answer_id_idx` (`answer_id`),
  CONSTRAINT `user_attempts_answer_id` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_attempts_attempts_id` FOREIGN KEY (`attempt_id`) REFERENCES `sessions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answers`
--

LOCK TABLES `user_answers` WRITE;
/*!40000 ALTER TABLE `user_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_answers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-08 19:41:28
