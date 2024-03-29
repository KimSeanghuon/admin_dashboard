-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 29, 2024 at 10:47 AM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sabay_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `img` text NOT NULL,
  `order` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `title`, `img`, `order`, `status`) VALUES
(1, 'Coffee', '521567-1711648121.png', 1, 1),
(2, 'Fast food', '806009-1711648137.jpg', 2, 1),
(3, 'Donate', '312472-1711648153.jpg', 3, 1),
(4, 'Drink', '121562-1711648229.jpg', 4, 1),
(5, 'Test', '245877-1711648468.png', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_item`
--

DROP TABLE IF EXISTS `tbl_item`;
CREATE TABLE IF NOT EXISTS `tbl_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cateID` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `des` text NOT NULL,
  `img` text NOT NULL,
  `location` int NOT NULL,
  `clicked` int NOT NULL,
  `userID` int NOT NULL,
  `order` int NOT NULL,
  `status` int NOT NULL,
  `nameLink` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_item`
--

INSERT INTO `tbl_item` (`id`, `cateID`, `title`, `des`, `img`, `location`, `clicked`, `userID`, `order`, `status`, `nameLink`, `createdAt`) VALUES
(1, 1, 'Hot cappuccino', 'Hot cappuccino description', '900107-1711648510.png', 1, 1, 1, 1, 2, 'testLink', 'Friday-March-2024 12:55:13am'),
(2, 2, 'Pizza', 'Pizza description', '983866-1711648579.jpg', 2, 1, 1, 2, 2, 'testLink', 'Friday-March-2024 12:56:21am'),
(3, 3, 'Red donate', 'Red donate description', '973388-1711648812.png', 1, 1, 1, 3, 1, 'testLink', 'Friday-March-2024 01:00:14am'),
(4, 1, 'Hot latte', 'Hot latte description', '899910-1711648941.png', 1, 1, 1, 4, 1, 'testLink', 'Friday-March-2024 01:02:23am');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
