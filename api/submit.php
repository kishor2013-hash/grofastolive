<?php
/**
 * Grofasto Digital Solution - MySQL Lead & Appointment Submission API
 * File Path: api/submit.php
 * Compatible with Hostinger Shared Hosting (PHP 7.4 / 8.0 / 8.1 / 8.2 / 8.3 + MySQL/MariaDB)
 */

// 1. Set JSON response and CORS headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Preflight OK']);
    exit;
}

// Only POST requests are allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// ============================================================================
// 2. DATABASE CONFIGURATION (Enter your Hostinger MySQL details below)
// ============================================================================
define('DB_HOST', 'localhost');                  // Usually 'localhost' on Hostinger
define('DB_USER', 'u123456789_grofasto_user');  // Your Hostinger MySQL Username
define('DB_PASS', 'YourStrongPassword@2026');   // Your Hostinger MySQL Password
define('DB_NAME', 'u123456789_grofasto_db');    // Your Hostinger MySQL Database Name

// ============================================================================
// 3. PARSE INPUT (Supports both JSON body and standard Form POST)
// ============================================================================
$rawInput = file_get_contents('php://input');
$data = [];

if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $data = $decoded;
    }
}

// Fallback to $_POST if JSON body was empty
if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}

// 4. Anti-spam honeypot check
if (!empty($data['website_url_check']) || !empty($data['honeypot'])) {
    http_response_code(200); // Silent drop for bots
    echo json_encode([
        'status' => 'error',
        'message' => 'Spam submission detected.'
    ]);
    exit;
}

// ============================================================================
// 5. EXTRACT & SANITIZE FORM FIELDS
// ============================================================================
// Form Type: 'Appointment', 'Contact', 'Lead', 'google_ads_lead', 'demo_request' (Default: 'Lead')
$form_type = trim($data['form_type'] ?? 'Lead');
$allowed_form_types = ['Appointment', 'Contact', 'Lead', 'Demo', 'google_ads_lead', 'demo_request', 'Google Ads'];
if (!in_array($form_type, $allowed_form_types)) {
    // Keep sanitized alphanumeric with underscore/hyphen if provided, else default to 'Lead'
    $clean_type = preg_replace('/[^a-zA-Z0-9_\-]/', '', $form_type);
    $form_type = !empty($clean_type) ? substr($clean_type, 0, 50) : 'Lead';
}

// Name & Phone (Required)
$name = trim($data['name'] ?? $data['full_name'] ?? '');
$phone = preg_replace('/\D/', '', $data['phone'] ?? $data['mobile'] ?? '');

// Email (Optional)
$raw_email = trim($data['email'] ?? '');
$email = filter_var($raw_email, FILTER_VALIDATE_EMAIL) ? $raw_email : null;

// Business Name (Optional)
$business_name = trim($data['business_name'] ?? '');

// Service / Category / Purpose
$service = trim($data['service'] ?? $data['purpose'] ?? $data['business_type'] ?? 'Website Development');

// Appointment Specific Fields
$appointment_date = !empty($data['appointment_date']) ? trim($data['appointment_date']) : null;
$appointment_time = !empty($data['appointment_time']) ? trim($data['appointment_time']) : null;

// Message / Details
$message = trim($data['message'] ?? $data['details'] ?? '');

// Tracking & Attribution
$utm_source   = substr(trim($data['utm_source'] ?? ''), 0, 100);
$utm_medium   = substr(trim($data['utm_medium'] ?? ''), 0, 100);
$utm_campaign = substr(trim($data['utm_campaign'] ?? ''), 0, 100);
$utm_term     = substr(trim($data['utm_term'] ?? ''), 0, 100);
$utm_content  = substr(trim($data['utm_content'] ?? ''), 0, 100);
$gclid        = substr(trim($data['gclid'] ?? ''), 0, 255);
$landing_page = substr(trim($data['landing_page'] ?? ''), 0, 500);
$referrer     = substr(trim($data['referrer'] ?? ''), 0, 500);

// Client IP & User Agent
$ip_address = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip_address = substr(trim($ip_address), 0, 45);

// ============================================================================
// 6. VALIDATION
// ============================================================================
if (empty($name)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide your full name.'
    ]);
    exit;
}

if (empty($phone) || strlen($phone) < 10) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid 10-digit phone number.'
    ]);
    exit;
}

// Indian mobile validation (10 digits starting with 6,7,8,9)
if (!preg_match('/^[6-9]\d{9}$/', $phone) && strlen($phone) === 10) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid Indian mobile number starting with 6, 7, 8, or 9.'
    ]);
    exit;
}

// ============================================================================
// 7. DATABASE INSERTION VIA PDO PREPARED STATEMENTS
// ============================================================================
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

    // Auto-create table if not exists (fail-safe for initial deployment)
    $createTableSql = "CREATE TABLE IF NOT EXISTS `leads` (
        `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `form_type` ENUM('Appointment', 'Contact', 'Lead', 'Demo') NOT NULL DEFAULT 'Lead',
        `name` VARCHAR(150) NOT NULL,
        `email` VARCHAR(150) DEFAULT NULL,
        `phone` VARCHAR(20) NOT NULL,
        `business_name` VARCHAR(200) DEFAULT NULL,
        `service` VARCHAR(150) DEFAULT NULL,
        `appointment_date` DATE DEFAULT NULL,
        `appointment_time` VARCHAR(50) DEFAULT NULL,
        `message` TEXT DEFAULT NULL,
        `status` ENUM('New', 'Contacted', 'Follow-up', 'Converted', 'Not Interested', 'Closed') NOT NULL DEFAULT 'New',
        `utm_source` VARCHAR(100) DEFAULT NULL,
        `utm_medium` VARCHAR(100) DEFAULT NULL,
        `utm_campaign` VARCHAR(100) DEFAULT NULL,
        `utm_term` VARCHAR(100) DEFAULT NULL,
        `utm_content` VARCHAR(100) DEFAULT NULL,
        `gclid` VARCHAR(255) DEFAULT NULL,
        `landing_page` VARCHAR(500) DEFAULT NULL,
        `referrer` VARCHAR(500) DEFAULT NULL,
        `ip_address` VARCHAR(45) DEFAULT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX `idx_phone` (`phone`),
        INDEX `idx_form_type` (`form_type`),
        INDEX `idx_status` (`status`),
        INDEX `idx_created_at` (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    
    $pdo->exec($createTableSql);

    // Insert prepared statement
    $insertSql = "INSERT INTO `leads` (
        `form_type`, `name`, `email`, `phone`, `business_name`,
        `service`, `appointment_date`, `appointment_time`, `message`,
        `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`,
        `gclid`, `landing_page`, `referrer`, `ip_address`, `status`
    ) VALUES (
        :form_type, :name, :email, :phone, :business_name,
        :service, :appointment_date, :appointment_time, :message,
        :utm_source, :utm_medium, :utm_campaign, :utm_term, :utm_content,
        :gclid, :landing_page, :referrer, :ip_address, 'New'
    )";

    $stmt = $pdo->prepare($insertSql);
    $stmt->execute([
        ':form_type'        => $form_type,
        ':name'             => $name,
        ':email'            => $email,
        ':phone'            => $phone,
        ':business_name'    => $business_name,
        ':service'          => $service,
        ':appointment_date' => $appointment_date,
        ':appointment_time' => $appointment_time,
        ':message'          => $message,
        ':utm_source'       => $utm_source,
        ':utm_medium'       => $utm_medium,
        ':utm_campaign'     => $utm_campaign,
        ':utm_term'         => $utm_term,
        ':utm_content'      => $utm_content,
        ':gclid'            => $gclid,
        ':landing_page'     => $landing_page,
        ':referrer'         => $referrer,
        ':ip_address'       => $ip_address,
    ]);

    $leadId = (int)$pdo->lastInsertId();

    // Success response
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you! Your request has been received. Our team will contact you shortly.',
        'lead_id' => $leadId,
        'form_type' => $form_type
    ]);

} catch (PDOException $e) {
    error_log("Database Error in api/submit.php: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection or query error. Please check DB credentials in api/submit.php.',
        'error_detail' => (defined('DEBUG') && DEBUG) ? $e->getMessage() : null
    ]);
}
