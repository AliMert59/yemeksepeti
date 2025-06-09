-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: food_website
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chefs`
--

DROP TABLE IF EXISTS `chefs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chefs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `bio` text,
  `image_url` varchar(255) DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chefs`
--

LOCK TABLES `chefs` WRITE;
/*!40000 ALTER TABLE `chefs` DISABLE KEYS */;
INSERT INTO `chefs` VALUES (3,'Nilay Hirpara','Chef','Specialist in Indian cuisine.','assets/images/chef/c1.jpg',8,'2025-05-29 19:51:44'),(4,'Ravi Kumawat','Chef','Expert in continental dishes.','assets/images/chef/c2.jpg',7,'2025-05-29 19:51:44'),(5,'Navnit Kumar','Chef','Pastry and dessert chef.','assets/images/chef/c3.jpg',6,'2025-05-29 19:51:44'),(6,'Pranav Badgal','Chef','Grill and BBQ master.','assets/images/chef/c4.jpg',5,'2025-05-29 19:51:44'),(7,'Priyotosh Dey','Chef','Vegan and healthy food expert.','assets/images/chef/c5.jpg',4,'2025-05-29 19:51:44'),(28,'John Doe','Baş Şef','20 years experienced chef','assets/images/chef/c1.jpg',NULL,'2025-05-30 19:07:57'),(29,'Jane Smith','Sous Şef','Expert in French cuisine','assets/images/chef/c2.jpg',NULL,'2025-05-30 19:07:57'),(30,'Mike Johnson','Pastacı','Dessert and pastry expert','assets/images/chef/c3.jpg',NULL,'2025-05-30 19:07:57'),(31,'John Doe','Baş Şef','20 yıllık deneyimli şef','assets/images/chef/c1.jpg',NULL,'2025-05-30 19:50:32'),(32,'Jane Smith','Sous Şef','Fransız mutfağı uzmanı','assets/images/chef/c2.jpg',NULL,'2025-05-30 19:50:32'),(33,'Mike Johnson','Pastacı','Tatlı ve pasta uzmanı','assets/images/chef/c3.jpg',NULL,'2025-05-30 19:50:32');
/*!40000 ALTER TABLE `chefs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-01 16:13:21
