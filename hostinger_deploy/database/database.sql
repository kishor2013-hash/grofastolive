-- ====================================================
-- GROFASTO DIGITAL SOLUTION - DATABASE DEFINITION
-- Hostinger Shared Hosting (PHP 8+ / MariaDB / MySQL)
-- ====================================================

SET NAMES utf8mb4;
SET time_zone = '+05:30';

-- 1. Leads Table
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `business_name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `business_type` VARCHAR(100) NOT NULL,
  `purpose` VARCHAR(150) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `utm_source` VARCHAR(100) DEFAULT NULL,
  `utm_medium` VARCHAR(100) DEFAULT NULL,
  `utm_campaign` VARCHAR(100) DEFAULT NULL,
  `utm_term` VARCHAR(100) DEFAULT NULL,
  `utm_content` VARCHAR(100) DEFAULT NULL,
  `gclid` VARCHAR(255) DEFAULT NULL,
  `landing_page` VARCHAR(500) DEFAULT NULL,
  `referrer` VARCHAR(500) DEFAULT NULL,
  `status` ENUM('New', 'Contacted', 'Follow-up', 'Converted', 'Not Interested', 'Closed') NOT NULL DEFAULT 'New',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_mobile` (`mobile`),
  INDEX `idx_status` (`status`),
  INDEX `idx_business_type` (`business_type`),
  INDEX `idx_purpose` (`purpose`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Initial Default Admin Record
-- Username: admin
-- Initial Password: Grof@stoAdmin#2026
-- Password hash generated using password_hash('Grof@stoAdmin#2026', PASSWORD_BCRYPT)
INSERT INTO `admins` (`id`, `username`, `password`, `created_at`)
VALUES (1, 'admin', '$2y$10$w0954p9c9x1/wV46gM2Pte0p.Qv/uU1K1B8/XQv86YvO4f9W5s87W', NOW())
ON DUPLICATE KEY UPDATE `username` = VALUES(`username`);
