/*
SQLyog Enterprise v12.4.1 (64 bit)
MySQL - 5.7.28 : Database - time_tracker
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`time_tracker` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `time_tracker`;

/*Table structure for table `author` */

DROP TABLE IF EXISTS `author`;

CREATE TABLE `author` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `author_name` varchar(50) NOT NULL,
  `author_email` varchar(50) DEFAULT NULL,
  `author_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

/*Data for the table `author` */

insert  into `author`(`author_id`,`author_name`,`author_email`,`author_date`,`author_status`) values 
(1,'Addy11','addy@gmail.com1','2022-04-06 12:42:02',1),
(2,'Gupta','gupta@gmail.com','2022-04-06 12:42:14',1),
(3,'Addy','addy@gmail.com','2022-04-06 23:27:05',1),
(4,'Addy','addy@gmail.com','2022-04-06 23:27:29',1),
(5,'Addy','addy@gmail.com','2022-04-06 23:28:15',1),
(22,'asAS','asAS','2022-04-07 01:08:34',0),
(23,'asASs','asASS','2022-04-07 01:08:39',1),
(24,'Sas','ASas','2022-04-07 01:08:45',0),
(25,'xAX','axAXA','2022-04-07 01:08:53',0),
(26,'XaxAX','aXA','2022-04-07 01:09:01',0),
(27,'XaxAXX','aXAxax','2022-04-07 01:09:05',0),
(28,'axdvg','dfsfsdfsdfsd','2022-04-07 01:14:20',0),
(29,'asd','asdasd','2022-04-07 01:15:37',0),
(30,'Xx','Xx','2022-04-07 01:17:06',0),
(31,'xasx','assa','2022-04-07 01:17:39',0),
(32,'Name:','Email:','2022-04-07 01:20:01',0),
(33,'sss','sss','2022-04-07 01:20:29',0),
(34,'Author Name','Author Email','2022-04-07 01:20:55',0),
(35,'1111','2222','2022-04-07 08:44:40',0),
(36,'rrrr','4444','2022-04-07 08:53:41',0),
(37,'6666','6666','2022-04-07 08:54:45',0),
(38,'7777','7777','2022-04-07 08:55:44',0),
(39,'888','8887','2022-04-07 08:56:29',0),
(40,'434','555','2022-04-07 08:57:21',0),
(41,'121342325','8888','2022-04-07 08:57:49',0),
(42,'adasd','asdasd','2022-04-07 09:12:25',0),
(43,'asdasd','asdas','2022-04-07 09:13:58',0),
(44,'asdasda','sdas','2022-04-07 09:14:20',0),
(45,'asd','asd','2022-04-07 09:29:26',0),
(46,'asd','asd1111a','2022-04-07 09:32:34',0),
(48,'qqq','sss','2022-04-07 09:47:02',0),
(49,'dddd','dddd','2022-04-07 09:47:26',0),
(50,'121342325','8888s','2022-04-07 09:55:27',0),
(51,'asd','asaaaaaaaaaaa','2022-04-07 09:58:20',0),
(52,'asdasd','asdas','2022-04-07 10:07:19',0),
(53,'121342325','88889999','2022-04-07 10:08:18',1),
(54,'aaaaaa','sssssss1','2022-04-07 10:19:56',1);

/*Table structure for table `task` */

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(50) DEFAULT NULL,
  `task_desc` varchar(500) DEFAULT NULL,
  `task_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `task_status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `task` */

insert  into `task`(`task_id`,`task_name`,`task_desc`,`task_date`,`task_status`) values 
(2,'Back1','Create database for entering user data from query form.1','2022-04-06 12:44:55',1),
(3,'Task11','This is task','2022-04-07 10:42:17',1),
(4,'Task22','Create user query form which include name, email & mobile1.','2022-04-07 10:42:44',1),
(6,'TAsk 123``','This is a dummy task','2022-04-08 11:47:32',1);

/*Table structure for table `timer` */

DROP TABLE IF EXISTS `timer`;

CREATE TABLE `timer` (
  `timer_id` int(11) NOT NULL AUTO_INCREMENT,
  `timer_name` varchar(50) NOT NULL,
  `timer_auth_id` int(11) NOT NULL,
  `timer_task_id` int(11) NOT NULL,
  `timer_tot_time` time NOT NULL DEFAULT '00:00:00',
  `timer_status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`timer_id`),
  KEY `timer_auth_id` (`timer_auth_id`),
  KEY `timer_task_id` (`timer_task_id`),
  CONSTRAINT `timer_ibfk_1` FOREIGN KEY (`timer_auth_id`) REFERENCES `author` (`author_id`),
  CONSTRAINT `timer_ibfk_2` FOREIGN KEY (`timer_task_id`) REFERENCES `task` (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `timer` */

insert  into `timer`(`timer_id`,`timer_name`,`timer_auth_id`,`timer_task_id`,`timer_tot_time`,`timer_status`) values 
(1,'Timmm',1,3,'00:00:13',0),
(2,'asdasd',54,4,'00:00:17',0),
(3,'ASas123',53,4,'00:00:17',1),
(4,'asdSD',53,3,'00:00:11',1),
(5,'ASD',53,3,'00:00:00',1),
(6,'ASDAS11',53,2,'00:00:04',1),
(7,'Adarsh',53,4,'00:00:17',1),
(8,'xsx11112aaa',4,2,'00:00:15',1),
(9,'Adarsh GuptaLucknow',3,6,'00:00:00',1),
(10,'asdasd',53,4,'00:00:00',1);

/*Table structure for table `view_timer` */

DROP TABLE IF EXISTS `view_timer`;

/*!50001 DROP VIEW IF EXISTS `view_timer` */;
/*!50001 DROP TABLE IF EXISTS `view_timer` */;

/*!50001 CREATE TABLE  `view_timer`(
 `timer_id` int(11) ,
 `timer_name` varchar(50) ,
 `timer_tot_time` time ,
 `timer_auth_id` int(11) ,
 `timer_task_id` int(11) ,
 `timer_status` tinyint(4) ,
 `author_name` varchar(50) ,
 `task_name` varchar(50) 
)*/;

/*View structure for view view_timer */

/*!50001 DROP TABLE IF EXISTS `view_timer` */;
/*!50001 DROP VIEW IF EXISTS `view_timer` */;

/*!50001 CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_timer` AS (select `timer`.`timer_id` AS `timer_id`,`timer`.`timer_name` AS `timer_name`,`timer`.`timer_tot_time` AS `timer_tot_time`,`timer`.`timer_auth_id` AS `timer_auth_id`,`timer`.`timer_task_id` AS `timer_task_id`,`timer`.`timer_status` AS `timer_status`,`author`.`author_name` AS `author_name`,`task`.`task_name` AS `task_name` from ((`timer` left join `author` on((`timer`.`timer_auth_id` = `author`.`author_id`))) left join `task` on((`timer`.`timer_task_id` = `task`.`task_id`))) order by `timer`.`timer_id` desc) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
