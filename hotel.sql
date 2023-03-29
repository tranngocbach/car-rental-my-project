

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `admin` (
  `name` varchar(20) NOT NULL,
  `pass` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `admin` (`name`, `pass`) VALUES
('admin', 'admin');




CREATE TABLE `bookingstatus` (
  `email` varchar(40) NOT NULL,
  `category` varchar(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `carWant` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `bookingstatus` (`email`, `category`, `type`, `carWant`, `status`, `date`) VALUES
('iamsabit99@gmail.com', 'Business Class ', 'Single Bed', 21, 0, '2020-05-03');



CREATE TABLE `category` (
  `name` varchar(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `cost` int(11) NOT NULL,
  `available` int(11) NOT NULL,
  `img` varchar(100) NOT NULL,
  `dec` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



-- INSERT INTO `category` (`name`, `type`, `cost`, `available`, `img`, `dec`) VALUES
-- ('Business Class ', 'Double Bed', 1200, 11, '/assets/img/rooms/room1.jpg', 'Non AC Room'),
-- ('Business Class ', 'Double Bed', 2005, 9, '/assets/img/rooms/room2.jpg', 'AC Room'),
-- ('Business Class ', 'Single Bed', 800, 10, '/assets/img/rooms/room3.jpg', 'Non AC Room'),
-- ('Business Class ', 'Single Bed', 1200, 10, '/assets/img/rooms/room4.jpg', 'AC Room'),
-- ('First class', 'Double Bed', 1357, 24, '/assets/img/rooms/First classDouble Bed1357.png', 'This is a good room');



CREATE TABLE `user` (
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `bookingstatus`
  ADD PRIMARY KEY (`email`,`category`,`type`, `carWant`);


ALTER TABLE `category`
  ADD PRIMARY KEY (`name`,`type`,`cost`);


ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);
