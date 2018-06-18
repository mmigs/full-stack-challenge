# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.22)
# Database: paytm
# Generation Time: 2018-06-18 08:45:02 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table EmployeeReviews
# ------------------------------------------------------------

DROP TABLE IF EXISTS `EmployeeReviews`;

CREATE TABLE `EmployeeReviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeId` int(11) NOT NULL,
  `reviewerId` int(11) NOT NULL,
  `review` text,
  `status` enum('ASSIGNED','PENDING','APPROVED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_reviews_employee_id_reviewer_id` (`employeeId`,`reviewerId`),
  KEY `reviewerId` (`reviewerId`),
  CONSTRAINT `employeereviews_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employeereviews_ibfk_2` FOREIGN KEY (`reviewerId`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `EmployeeReviews` WRITE;
/*!40000 ALTER TABLE `EmployeeReviews` DISABLE KEYS */;

INSERT INTO `EmployeeReviews` (`id`, `employeeId`, `reviewerId`, `review`, `status`, `createdAt`, `updatedAt`)
VALUES
	(1,7,9,'great guy','APPROVED','2018-06-17 13:10:14','2018-06-17 13:10:14'),
	(22,7,16,'Jim is a good guy','APPROVED','2018-06-17 20:23:58','2018-06-17 20:37:45'),
	(25,5,7,'Hello','APPROVED','2018-06-17 21:01:05','2018-06-17 22:45:18');

/*!40000 ALTER TABLE `EmployeeReviews` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Employees
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Employees`;

CREATE TABLE `Employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;

INSERT INTO `Employees` (`id`, `firstName`, `lastName`, `email`, `phone`, `password`, `admin`, `startDate`, `createdAt`, `updatedAt`)
VALUES
	(1,'Admin','User','admin@example.com','123123123123','$2a$10$G8Jwjr9KVJ/vzx4272W6k.DsJODYxVZWCKeEE41QLDJaSZ51y41yC',1,'2018-01-01 00:00:00','2018-06-17 03:44:35','2018-06-18 07:56:18'),
	(5,'John','Smith','jsmith@example.com','41612345267','$2a$10$ja127SZuF27ZKDDEzWPTKuIrEVRwY3Sld130qloK.3YEWI9kCGz7q',0,'2018-01-01 00:00:00','2018-06-17 15:04:37','2018-06-17 15:04:37'),
	(7,'Jack','Jones','jjones@example.com','4161234567','$2a$10$nzJduq/4h3vBO1j5ghPDtuHysGfjNgm/a.RF/eSRUsOcCAXfV3YFu',0,'2018-01-01 00:00:00','2018-06-17 15:06:58','2018-06-17 15:29:05'),
	(9,'jim','beam','jack@example.com','4161234567','$2a$10$5dl9bd5P2LyVKsZSVdHTG.Oh6zpk1AsrsomvKIhYarXKJkCVof06K',0,'2018-01-01 00:00:00','2018-06-17 15:25:58','2018-06-17 17:29:13'),
	(16,'User16','User','asdfasfd@asdfasdfasdf.com','4161234567','$2a$10$JVyLllpBVlBlqS4k8JDPZuLxa5LZeBhJ8ROT2uaRgvF1r4l2ck3qu',0,'2018-01-01 00:00:00','2018-06-17 19:35:42','2018-06-18 07:50:50'),
	(19,'John','Smith','asdfasfd@example.com','4161234567','$2a$10$wyjQVUvYDMCIteGmpgkp5.MCYnacwDaGW5LhuPIxkW2e29LoTl9G.',1,'2018-01-01 00:00:00','2018-06-18 07:55:01','2018-06-18 07:55:01'),
	(20,'John','Smith','example1@example.com','4161234567','$2a$10$EoKvemyMfFsrO406dCJiduQxQHO2/WlKugafmNWC2dLe913SxmBP6',1,'2018-01-01 00:00:00','2018-06-18 08:09:12','2018-06-18 08:09:12');

/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
