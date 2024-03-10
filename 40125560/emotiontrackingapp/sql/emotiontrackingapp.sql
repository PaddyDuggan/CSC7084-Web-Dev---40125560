-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2024 at 10:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emotiontrackingapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `emotions`
--

CREATE TABLE `emotions` (
  `emotion_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `enjoyment` int(11) NOT NULL,
  `sadness` int(11) NOT NULL,
  `anger` int(11) NOT NULL,
  `contempt` int(11) NOT NULL,
  `disgust` int(11) NOT NULL,
  `fear` int(11) NOT NULL,
  `surprise` int(11) NOT NULL,
  `triggers` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emotions`
--

INSERT INTO `emotions` (`emotion_id`, `user_id`, `enjoyment`, `sadness`, `anger`, `contempt`, `disgust`, `fear`, `surprise`, `triggers`, `date`, `time`) VALUES
(109, 22, 99, 0, 76, 14, 21, 67, 61, 'Sleep', '2024-02-03', '16:49:00'),
(131, 22, 93, 27, 18, 31, 26, 62, 32, 'Education', '2024-02-05', '10:31:00'),
(133, 22, 37, 56, 35, 63, 41, 31, 19, 'Social Interaction', '2024-02-09', '10:58:00'),
(136, 22, 27, 52, 0, 20, 70, 46, 50, 'None', '2024-02-19', '11:55:00'),
(138, 22, 100, 50, 50, 50, 50, 50, 50, 'Physical Activity', '2024-03-02', '11:55:00'),
(140, 22, 69, 20, 18, 28, 28, 60, 7, 'Work', '2024-03-03', '09:50:00'),
(147, 22, 50, 50, 50, 50, 50, 50, 50, 'Social Media', '2024-03-06', '19:09:00'),
(151, 22, 81, 86, 42, 31, 66, 73, 62, 'Sleep', '2024-03-10', '10:57:00'),
(153, 36, 50, 50, 50, 50, 50, 50, 50, 'None', '2024-03-10', '20:26:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email_address` varchar(355) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email_address`, `user_password`) VALUES
(22, 'Bobby', 'Bob', 'bob123@bob.com', '$2b$10$MSYHqZvOKJB99m.M4Hpji.aCLXGDTEMP35r72g.OPifSHGKezaroG'),
(36, 'Jim', 'Jimmy', 'jim@jim.com', '$2b$10$7zve/MJ2m4fenZ4Zy.jckeM5N/X8D4oR76ErD0D2L1rqYGpdsisru'),
(37, 'Post', 'Man', 'postman@email.com', '$2b$10$MSYHqZvOKJB99m.M4Hpji.aCLXGDTEMP35r72g.OPifSHGKezaroG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emotions`
--
ALTER TABLE `emotions`
  ADD PRIMARY KEY (`emotion_id`),
  ADD KEY `FK_emotion_user_user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emotions`
--
ALTER TABLE `emotions`
  MODIFY `emotion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emotions`
--
ALTER TABLE `emotions`
  ADD CONSTRAINT `FK_emotion_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
