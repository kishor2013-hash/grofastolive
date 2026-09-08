<?php
/**
 * Grofasto Digital Solution - Hostinger Database Configuration
 * Compatible with PHP 8+ and MySQL / MariaDB on Hostinger Shared Hosting
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_grofasto_db');        // Hostinger Database Name
define('DB_USER', 'u123456789_grofasto_user');      // Hostinger Database Username
define('DB_PASSWORD', 'YourStrongPassword@2026');   // Hostinger Database Password

define('SITE_URL', 'https://www.grofasto.com');
define('WHATSAPP_NUMBER', '+919457690255');
define('BUSINESS_PHONE', '+919457690255');
define('BUSINESS_EMAIL', 'info.grofasto@gmail.com');

function getDBConnection() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASSWORD, $options);
        } catch (PDOException $e) {
            error_log("Grofasto DB Error: " . $e->getMessage());
            die(json_encode([
                'success' => false,
                'message' => 'Database connection failed. Please verify credentials in config/database.php'
            ]));
        }
    }
    return $pdo;
}
