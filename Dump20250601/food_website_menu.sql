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
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (3,'Fresh Chicken Veggies','120 calories, Type: Non Veg, Persons: 2',499.00,'dinner','assets/images/dish/1.png',1,'2025-05-29 19:51:44'),(4,'Grilled Chicken','80 calories, Type: Non Veg, Persons: 1',359.00,'dinner','assets/images/dish/2.png',1,'2025-05-29 19:51:44'),(23,'Panner Noodles','100 calories, Type: Veg, Persons: 2',149.00,'lunch','assets/images/dish/3.png',1,'2025-05-29 20:04:53'),(24,'Chicken Noodles','120 calories, Type: Non Veg, Persons: 2',379.00,'lunch','assets/images/dish/4.png',1,'2025-05-29 20:04:53'),(25,'Bread Boiled Egg','120 calories, Type: Non Veg, Persons: 2',99.00,'breakfast','assets/images/dish/5.png',1,'2025-05-29 20:04:53'),(26,'Immunity Dish','120 calories, Type: Veg, Persons: 2',159.00,'breakfast','assets/images/dish/6.png',1,'2025-05-29 20:04:53'),(39,'Fresh Chicken Veggies','Taze sebzelerle hazırlanmış tavuk yemeği',120.00,'lunch','assets/images/dish/1.png',1,'2025-05-30 19:50:32'),(40,'Grilled Chicken','Izgara tavuk',80.00,'dinner','assets/images/dish/2.png',1,'2025-05-30 19:50:32'),(41,'Panner Noodles','Paneer peyniri ile hazırlanmış noodle',100.00,'lunch','assets/images/dish/3.png',1,'2025-05-30 19:50:32'),(42,'Chicken Noodles','Tavuklu noodle',120.00,'dinner','assets/images/dish/4.png',1,'2025-05-30 19:50:32'),(43,'Bread Boiled Egg','Ekmek ve haşlanmış yumurta',120.00,'breakfast','assets/images/dish/5.png',1,'2025-05-30 19:50:32'),(44,'Immunity Dish','Bağışıklık güçlendirici yemek',159.00,'breakfast','assets/images/dish/6.png',1,'2025-05-30 19:50:32');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
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
