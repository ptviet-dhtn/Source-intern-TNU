-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2022 at 08:04 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Cà phê'),
(2, 'Trà Sữa'),
(3, 'Sữa Chua'),
(4, 'Kem Cuộn'),
(5, 'Trà'),
(60, 'Nước Ép');

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `id` bigint(20) NOT NULL,
  `address` text DEFAULT NULL,
  `commune` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `checkout_id` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`id`, `address`, `commune`, `district`, `province`, `total_price`, `user_id`, `checkout_id`, `phone`, `created_at`, `updated_at`, `status`) VALUES
(1, 'test', 'test', 'test', 'test', 52000, 1, 'TESTID', '0123456789', '2022-04-07 10:22:24', '2022-04-04 10:22:28', 0),
(10, 'ABC', 'EaTam', 'BMT', 'Dak Lak', 895, 4, '5a3a65fb-7064-454e-8688-6197087cf168', '0972727272', '2022-04-13 10:33:44', '2022-04-12 10:33:48', 0),
(11, 'ABCererre', 'EaTam', 'BMT', 'Dak Lak', 895, 4, '8e41ecd3-1f60-4355-a0a5-cf89b04526f7', '0972727272', '2022-04-12 10:33:51', '2022-04-19 10:33:54', 0),
(12, 'ABCererre', 'EaTam', 'BMT', 'Dak Lak', 895, 4, 'd7982894-c496-4609-b7c4-2840d4f04848', '0972727272', '2022-04-13 10:33:57', '2022-04-20 10:33:59', 0),
(13, 'ABC', 'EaTam', 'BMT', 'Dak Lak', 110, 4, 'd3b795d4-c556-4d8e-bf5d-ec1073000bcd', '0972727272', '2022-04-11 10:34:01', '2022-04-20 10:34:03', 1),
(14, 'kokoko', 'EaTam', 'BMT', 'Dak Lak', 250, 4, 'd88bff84-2f63-446c-b6b3-af590e4049fe', '0204141414', '2022-04-11 10:34:05', '2022-04-20 10:34:07', 1),
(15, '08 Tô Ngọc Vân', 'EaTam', 'BMT', 'Dak Lak', 573, 4, '11e8b8e3-9656-4eba-a0d2-c3b42992f615', '01231566488', '2022-04-04 10:34:10', '2022-04-05 10:34:13', 0),
(16, '09 D8', 'EaTam', 'BMT', 'Dak Lak', 634, 4, 'b9f5228b-f724-4713-9868-459bef11b973', '01149848', '2022-04-03 10:34:14', '2022-04-05 10:34:17', 1),
(17, '08 D9', 'EaTam', 'BMT', 'Dak Lak', 336, 4, 'ead41d7f-7deb-4355-82a2-789d2bc8c04a', '0144849878', '2022-04-12 10:34:20', '2022-04-19 10:34:22', 0),
(18, 'ádds', 'EaTam', 'BMT', 'Dak Lak', 192, 4, 'a77d9d51-27bc-4784-a210-012d8327198a', '2424242424', '2022-04-03 10:34:24', '2022-04-14 10:34:26', 0),
(19, 'ABC', 'EaTam', 'BMT', 'Dak Lak', 107, 7, 'c8516d78-f32b-4041-aa71-d57b57fa03b1', '0972727272', '2022-04-17 10:21:31', '2022-04-17 10:21:31', 0),
(20, '59 akakka', 'EaTam', 'BMT', 'Dak Lak', 182, 4, '063b7d82-5d8f-443f-a1a2-10d51bc5dc39', '0124445786', '2022-04-28 20:56:21', '2022-04-28 20:56:21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `checkout_products`
--

CREATE TABLE `checkout_products` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `checkout_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkout_products`
--

INSERT INTO `checkout_products` (`id`, `quantity`, `checkout_id`, `product_id`) VALUES
(1, 2, 1, 35),
(3, 1, 1, 54),
(4, 1, 10, 54),
(5, 6, 10, 51),
(6, 6, 10, 62),
(7, 6, 10, 63),
(8, 1, 10, 50),
(9, 1, 10, 48),
(10, 1, 11, 54),
(11, 6, 11, 51),
(12, 6, 11, 62),
(13, 6, 11, 63),
(14, 1, 11, 50),
(15, 1, 11, 48),
(16, 1, 12, 54),
(17, 6, 12, 51),
(18, 6, 12, 62),
(19, 6, 12, 63),
(20, 1, 12, 50),
(21, 1, 12, 48),
(22, 1, 13, 33),
(23, 1, 13, 35),
(24, 1, 13, 37),
(25, 2, 14, 33),
(26, 3, 14, 35),
(27, 2, 14, 37),
(28, 1, 15, 48),
(29, 2, 15, 49),
(30, 3, 15, 50),
(31, 3, 15, 47),
(32, 1, 15, 53),
(33, 1, 15, 52),
(34, 1, 15, 56),
(35, 2, 16, 33),
(36, 2, 16, 35),
(37, 2, 16, 37),
(38, 2, 16, 40),
(39, 2, 16, 63),
(40, 2, 16, 62),
(41, 2, 16, 59),
(42, 2, 17, 35),
(43, 2, 17, 37),
(44, 3, 17, 40),
(45, 1, 18, 47),
(46, 1, 18, 48),
(47, 1, 18, 49),
(48, 1, 18, 50),
(49, 1, 19, 40),
(50, 1, 19, 37),
(51, 2, 20, 37),
(52, 1, 20, 35),
(53, 1, 20, 40);

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(64);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `created_at`, `description`, `price`, `title`, `image`, `category_id`) VALUES
(33, '2022-03-27 22:40:53', 'Thức uống giải khát', 35, 'Latte Đá', '96012f31-e116-42ea-937e-9903bc97f31d9.jpg', 1),
(35, '2022-03-27 22:42:00', 'Giàu Dinh Dưỡng', 30, 'Sữa Chua Việt Quất', '1f5e38ff-a970-4c17-8fe7-ae8ff3e21a0d32.jpg', 3),
(37, '2022-03-27 22:43:44', 'Thức uống năng lượng', 45, 'Capuchino', '8ecaf126-ca31-4189-9e27-61c4e3dbcd3f10.jpg', 1),
(40, '2022-03-30 13:04:52', 'Thức uống giải khát', 62, 'Trà Hoa Đậu Biếc Hạt Chia', 'b0019513-082f-4b99-9586-68804c149ae39.jpg', 5),
(47, '2022-04-01 16:18:53', 'Thức uống giải khát', 54, 'Latte Đá', 'a0224f9a-6a7c-4709-b4f7-6deaa8001c4d40.jpg', 2),
(48, '2022-04-01 16:20:33', 'Thức uống giải khát', 55, 'Trà Sữa Hạt Sen', 'c00d6257-cbd0-4dff-896a-1e2abd55687a20.jpg', 2),
(49, '2022-04-01 16:22:38', 'Thức uống năng lượng', 48, 'Cà Phê Kem Trứng', '571a01a8-659e-4feb-9701-0e7265bcf31d24.jpg', 1),
(50, '2022-04-01 16:23:00', 'Thức uống năng lượng', 35, 'Bạc Xỉu Đá', '39affea0-6b67-47f2-9a67-8c5d33d1c9c911.jpg', 1),
(51, '2022-04-01 16:23:26', 'Thức uống giải khát', 45, 'Trà Astiso Đỏ Hạt Chia', 'fc340d8a-96ea-4a5c-9afa-df653c610f6f14.jpg', 5),
(52, '2022-04-01 16:24:54', 'Thức uống giải khát', 45, 'Trà Nhiệt Đới', '795bace5-1c95-40c9-b714-fc2f73f4c34a21.jpg', 5),
(53, '2022-04-01 16:25:44', 'Thức uống năng lượng', 65, 'Nước Ép Cam Hạt Chia', '109e2fc7-156c-49e0-b6e3-62087b2e299d52.jpg', 5),
(54, '2022-04-01 16:26:22', 'Thức uống năng lượng', 55, 'Cà Phê Sữa Dừa Đá Xay', 'd8e04c06-870b-41ee-910b-5b26d6f6ed1228.jpg', 1),
(56, '2022-04-01 16:27:39', 'Thức uống năng lượng', 45, 'Sữa Tươi Hoa Đậu Biếc', '6a77fadf-d6e6-473d-9aef-3273279f456f37.jpg', 2),
(57, '2022-04-01 16:28:08', 'Thức uống năng lượng', 65, 'Sinh Tố Dâu', '0486832e-b663-4eb4-bfc7-8f210948636b40.jpg', 2),
(58, '2022-04-01 16:29:05', 'Thích Hợp Giảm Cân', 75, 'Kem Cuộn Cam', '344efb52-ab0b-4bce-91ec-d15ab90df9f144.jpg', 4),
(59, '2022-04-01 16:29:32', 'Thích Hợp Giảm Cân', 65, 'Kem Cuộn Chocolate', '3b88530c-770e-49ef-8034-e9abb7d4284d43.jpg', 4),
(62, '2022-04-13 11:04:26', 'Thức uống năng lượng', 35, 'Trà Sữa Bạc Hà', 'd5b619c8-b293-4210-9dbf-4c65595eeba053.jpg', 2),
(63, '2022-04-13 11:04:46', 'Thức uống năng lượng', 45, 'Nước Ép Dâu ', 'aa19ff55-77b8-42f8-be05-ef4dbaf8b3a926.jpg', 60);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`) VALUES
(1, 'test@test.com', '$2a$10$RZVMo.ighvXrGkYKD7DoCec40VfNKRULR8Rv04EqjYNvmA.UhgyNK', 'Test'),
(2, 'viet123@gmail.com', '$2a$10$tjjYTNLZUVCf/81Tv63QHu4pZOdJk0lUlJMq08xMKlND0XQev38/O', 'viet123'),
(3, 'viet1234@gmail.com', '$2a$10$ydMfQuRvyNMn2woQgEO33uQ47BW9J6WA66zXbooyRwhPD3f0gHADW', 'viet1234'),
(4, 'viet11@gmail.com', '$2a$10$3fNolujL57v1HDbB1sSsW.JWRJbfYLFr26I1KIJnjcxosCdo1ZOmG', 'viet1'),
(5, 'viet123433@gmail.com', '$2a$10$6zHpxQzj/4M2gBNVFn56F.Gu0WU/.dXZG9X0Av8jwVpsAGY/9PFfS', 'viet44'),
(6, 'tunglete@gom', '$2a$10$mvO73Qo2Mt1l/ikXzjYXXuVJM5BfjQEWvUmwDwQPepLZitI6fot.K', 'tungson'),
(7, 'adminorder@gmail.com', '$2a$10$LC6Razd2YG.ibofQbbkVcenn3s7ooI/XDsWap6kp5Z8i7xhd0gLn.', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(6, 1),
(7, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5euvb0r4pm0p3bb3t8rc232iu` (`user_id`);

--
-- Indexes for table `checkout_products`
--
ALTER TABLE `checkout_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfagkw64jw9g8fkchbttm0t0to` (`checkout_id`),
  ADD KEY `FK634v9bfp5bxknwogkh5qa4lxx` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1cf90etcu98x1e6n9aks3tel3` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `checkout_products`
--
ALTER TABLE `checkout_products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `FK5euvb0r4pm0p3bb3t8rc232iu` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `checkout_products`
--
ALTER TABLE `checkout_products`
  ADD CONSTRAINT `FK634v9bfp5bxknwogkh5qa4lxx` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKfagkw64jw9g8fkchbttm0t0to` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK1cf90etcu98x1e6n9aks3tel3` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
