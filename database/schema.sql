-- ============================================================================
-- GROFASTO DIGITAL SOLUTION - MYSQL DATABASE SCHEMA (FOR PHPMYADMIN / HOSTINGER)
-- File: database/schema.sql
-- Compatible with Hostinger Shared Hosting (MySQL 5.7+ / 8.0+ / MariaDB)
-- ============================================================================

SET NAMES utf8mb4;
SET time_zone = '+05:30';

-- 1. Create or Update Leads / Inquiries Table
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `form_type` ENUM('Appointment', 'Contact', 'Lead', 'Demo') NOT NULL DEFAULT 'Lead' COMMENT 'Type of submission',
  `name` VARCHAR(150) NOT NULL COMMENT 'Customer or Business contact full name',
  `email` VARCHAR(150) DEFAULT NULL COMMENT 'Contact email address',
  `phone` VARCHAR(20) NOT NULL COMMENT '10-digit mobile number',
  `business_name` VARCHAR(200) DEFAULT NULL COMMENT 'School / Clinic / Shop / Enterprise name',
  `service` VARCHAR(150) DEFAULT NULL COMMENT 'Selected service or website category',
  `appointment_date` DATE DEFAULT NULL COMMENT 'Requested appointment date',
  `appointment_time` VARCHAR(50) DEFAULT NULL COMMENT 'Preferred appointment slot or time',
  `message` TEXT DEFAULT NULL COMMENT 'Specific requirements, inquiries or notes',
  `status` ENUM('New', 'Contacted', 'Follow-up', 'Converted', 'Not Interested', 'Closed') NOT NULL DEFAULT 'New' COMMENT 'CRM Lead Workflow Status',
  `utm_source` VARCHAR(100) DEFAULT NULL COMMENT 'Marketing tracking source (e.g. google, facebook)',
  `utm_medium` VARCHAR(100) DEFAULT NULL COMMENT 'Marketing medium (e.g. cpc, organic)',
  `utm_campaign` VARCHAR(100) DEFAULT NULL COMMENT 'Ad campaign name',
  `utm_term` VARCHAR(100) DEFAULT NULL COMMENT 'Search keyword',
  `utm_content` VARCHAR(100) DEFAULT NULL COMMENT 'Ad content identifier',
  `gclid` VARCHAR(255) DEFAULT NULL COMMENT 'Google Click ID',
  `landing_page` VARCHAR(500) DEFAULT NULL COMMENT 'Landing URL visited',
  `referrer` VARCHAR(500) DEFAULT NULL COMMENT 'HTTP Referrer',
  `ip_address` VARCHAR(45) DEFAULT NULL COMMENT 'Client IP address',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Submission timestamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last updated timestamp',
  INDEX `idx_phone` (`phone`),
  INDEX `idx_form_type` (`form_type`),
  INDEX `idx_status` (`status`),
  INDEX `idx_service` (`service`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Grofasto Customer Inquiries & Appointment Leads';

-- 2. Optional Sample Data (To verify phpMyAdmin display immediately)
INSERT INTO `leads` (`form_type`, `name`, `email`, `phone`, `business_name`, `service`, `appointment_date`, `appointment_time`, `message`, `status`)
VALUES 
('Lead', 'Dr. Alok Verma', 'dr.alok@gmail.com', '9897123456', 'Verma Dental & Heart Clinic', 'Doctor / Clinic Website', NULL, NULL, 'Need online doctor appointment booking and Google Maps profile ranking in Meerut.', 'Contacted'),
('Appointment', 'Rajesh Singhal', 'singhal.supermart@gmail.com', '9457612345', 'Singhal Supermart', 'Retail Business', '2026-04-15', '11:30 AM', 'Want to schedule a consultation call to discuss e-commerce catalog with WhatsApp orders.', 'New')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- ============================================================================
-- Instructions for Hostinger phpMyAdmin:
-- 1. Log in to Hostinger hPanel -> Databases -> phpMyAdmin
-- 2. Select your database (e.g. u123456789_grofasto_db)
-- 3. Click on the "SQL" tab at top navigation
-- 4. Paste this entire script and click "Go" (Execute)
-- ============================================================================
