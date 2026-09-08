import JSZip from 'jszip';

export const PHP_CONFIG_DATABASE = `<?php
/**
 * Grofasto Digital Solution - Database Configuration
 * Hostinger Shared Hosting Compatible (PHP 8+ / MySQL / MariaDB)
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_grofasto_db'); // Replace with your Hostinger DB name
define('DB_USER', 'u123456789_grofasto_user'); // Replace with your Hostinger DB user
define('DB_PASSWORD', 'YourStrongPassword@2026'); // Replace with your Hostinger DB password

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
            // Log error internally; do not expose credentials to user
            error_log("Database connection failed: " . $e->getMessage());
            die(json_encode([
                'success' => false,
                'message' => 'Database connection failed. Please verify credentials in config/database.php'
            ]));
        }
    }
    return $pdo;
}
`;

export const SQL_DATABASE_SCHEMA = `-- Grofasto Digital Solution Database Schema
-- Compatible with MySQL 5.7+ / 8.0+ and MariaDB on Hostinger Shared Hosting

CREATE TABLE IF NOT EXISTS \`leads\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`full_name\` VARCHAR(150) NOT NULL,
  \`mobile\` VARCHAR(20) NOT NULL,
  \`business_name\` VARCHAR(200) NOT NULL,
  \`email\` VARCHAR(150) DEFAULT NULL,
  \`business_type\` VARCHAR(100) NOT NULL,
  \`purpose\` VARCHAR(150) NOT NULL,
  \`message\` TEXT DEFAULT NULL,
  \`utm_source\` VARCHAR(100) DEFAULT NULL,
  \`utm_medium\` VARCHAR(100) DEFAULT NULL,
  \`utm_campaign\` VARCHAR(100) DEFAULT NULL,
  \`utm_term\` VARCHAR(100) DEFAULT NULL,
  \`utm_content\` VARCHAR(100) DEFAULT NULL,
  \`gclid\` VARCHAR(255) DEFAULT NULL,
  \`landing_page\` VARCHAR(500) DEFAULT NULL,
  \`referrer\` VARCHAR(500) DEFAULT NULL,
  \`status\` ENUM('New', 'Contacted', 'Follow-up', 'Converted', 'Not Interested', 'Closed') DEFAULT 'New',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_mobile\` (\`mobile\`),
  INDEX \`idx_status\` (\`status\`),
  INDEX \`idx_created_at\` (\`created_at\`),
  INDEX \`idx_purpose\` (\`purpose\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Admin Account
-- Username: admin
-- Default Password: Grof@stoAdmin#2026 (hashed using PHP password_hash PASSWORD_BCRYPT)
INSERT INTO \`admins\` (\`username\`, \`password\`) 
VALUES ('admin', '$2y$10$w0954p9c9x1/wV46gM2Pte0p.Qv/uU1K1B8/XQv86YvO4f9W5s87W')
ON DUPLICATE KEY UPDATE \`username\` = \`username\`;
`;

export const HTACCESS_CONTENT = `# Hostinger Apache Configuration for Grofasto Digital Solution
Options -Indexes
RewriteEngine On

# Enforce HTTPS (Uncomment when SSL is active on Hostinger)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Clean URL Routing for Contact Page
RewriteRule ^contact/?$ contact.php [L,QSA]

# Clean URL Routing for Admin
RewriteRule ^admin/?$ admin/index.php [L,QSA]

# Security: Deny direct access to config files and SQL scripts
<FilesMatch "\\.(sql|log|ini|env)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Enable Browser Caching for Performance
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>
`;

export const API_SUBMIT_LEAD = `<?php
/**
 * Grofasto Lead Submission API
 * Hostinger PHP 8+ / MySQL
 */
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// 1. Anti-spam Honeypot check
if (!empty($_POST['website_url_check'])) {
    echo json_encode(['success' => false, 'message' => 'Spam detected']);
    exit;
}

// 2. Submission timing check
$submit_time = isset($_POST['form_time']) ? (int)$_POST['form_time'] : 0;
if ($submit_time > 0 && (time() - $submit_time) < 1) {
    echo json_encode(['success' => false, 'message' => 'Form submitted too quickly']);
    exit;
}

// 3. Collect and sanitize input
$full_name = trim($_POST['full_name'] ?? '');
$mobile = preg_replace('/\\D/', '', $_POST['mobile'] ?? '');
$business_name = trim($_POST['business_name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL) ?: null;
$business_type = trim($_POST['business_type'] ?? 'Business / Service');
$purpose = trim($_POST['purpose'] ?? 'Free Demo Website');
$message = trim($_POST['message'] ?? '');

$utm_source = substr(trim($_POST['utm_source'] ?? ''), 0, 100);
$utm_medium = substr(trim($_POST['utm_medium'] ?? ''), 0, 100);
$utm_campaign = substr(trim($_POST['utm_campaign'] ?? ''), 0, 100);
$utm_term = substr(trim($_POST['utm_term'] ?? ''), 0, 100);
$utm_content = substr(trim($_POST['utm_content'] ?? ''), 0, 100);
$gclid = substr(trim($_POST['gclid'] ?? ''), 0, 255);
$landing_page = substr(trim($_POST['landing_page'] ?? ''), 0, 500);
$referrer = substr(trim($_POST['referrer'] ?? ''), 0, 500);

// 4. Validate Indian mobile number (10 digits starting with 6, 7, 8, 9)
if (!preg_match('/^[6-9]\\d{9}$/', $mobile)) {
    echo json_encode(['success' => false, 'message' => 'Please provide a valid 10-digit Indian mobile number.']);
    exit;
}

if (empty($full_name) || empty($business_name)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

try {
    $pdo = getDBConnection();
    $sql = "INSERT INTO leads (
        full_name, mobile, business_name, email, business_type, purpose, message,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid,
        landing_page, referrer, status
    ) VALUES (
        :full_name, :mobile, :business_name, :email, :business_type, :purpose, :message,
        :utm_source, :utm_medium, :utm_campaign, :utm_term, :utm_content, :gclid,
        :landing_page, :referrer, 'New'
    )";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':full_name' => $full_name,
        ':mobile' => $mobile,
        ':business_name' => $business_name,
        ':email' => $email,
        ':business_type' => $business_type,
        ':purpose' => $purpose,
        ':message' => $message,
        ':utm_source' => $utm_source,
        ':utm_medium' => $utm_medium,
        ':utm_campaign' => $utm_campaign,
        ':utm_term' => $utm_term,
        ':utm_content' => $utm_content,
        ':gclid' => $gclid,
        ':landing_page' => $landing_page,
        ':referrer' => $referrer
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your request has been received successfully. Our team will contact you shortly.',
        'lead_id' => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    error_log("Lead save error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to save lead. Please call us directly.']);
}
`;

export const PHP_ADMIN_LOGIN = `<?php
/**
 * Grofasto Admin Login
 */
session_start();
require_once __DIR__ . '/../config/database.php';

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    // Hardened verification with database
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = :username LIMIT 1");
    $stmt->execute([':username' => $username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password'])) {
        session_regenerate_id(true);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $admin['username'];
        header('Location: index.php');
        exit;
    } else {
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | Grofasto Digital Solution</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="bg-navy text-white min-h-screen flex items-center justify-center p-4">
    <div class="card max-w-md w-full p-8 border-slate">
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold">GROFASTO ADMIN</h2>
            <p class="text-slate-400 text-xs">Sign in to manage leads</p>
        </div>
        <?php if ($error): ?>
            <div class="bg-red-900 border border-red-500 text-red-200 p-3 rounded mb-4 text-xs">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>
        <form method="POST">
            <div class="mb-4">
                <label class="block text-xs uppercase font-bold mb-1 text-slate-300">Username</label>
                <input type="text" name="username" required class="input w-full p-3 rounded bg-slate-900 border border-slate-700 text-white">
            </div>
            <div class="mb-6">
                <label class="block text-xs uppercase font-bold mb-1 text-slate-300">Password</label>
                <input type="password" name="password" required class="input w-full p-3 rounded bg-slate-900 border border-slate-700 text-white">
            </div>
            <button type="submit" class="btn-primary w-full py-3 rounded font-bold uppercase text-xs">Sign In</button>
        </form>
    </div>
</body>
</html>
`;

export const PHP_ADMIN_INDEX = `<?php
/**
 * Grofasto Admin Dashboard
 */
session_start();
require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

$pdo = getDBConnection();

// Fetch metrics
$total = $pdo->query("SELECT COUNT(*) FROM leads")->fetchColumn();
$new = $pdo->query("SELECT COUNT(*) FROM leads WHERE status = 'New'")->fetchColumn();
$contacted = $pdo->query("SELECT COUNT(*) FROM leads WHERE status = 'Contacted'")->fetchColumn();
$followup = $pdo->query("SELECT COUNT(*) FROM leads WHERE status = 'Follow-up'")->fetchColumn();
$converted = $pdo->query("SELECT COUNT(*) FROM leads WHERE status = 'Converted'")->fetchColumn();
$closed = $pdo->query("SELECT COUNT(*) FROM leads WHERE status IN ('Closed', 'Not Interested')")->fetchColumn();
$today = $pdo->query("SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURDATE()")->fetchColumn();

// Search & Filter
$search = trim($_GET['search'] ?? '');
$status_filter = trim($_GET['status'] ?? '');

$sql = "SELECT * FROM leads WHERE 1=1";
$params = [];

if (!empty($search)) {
    $sql .= " AND (full_name LIKE :s1 OR mobile LIKE :s2 OR business_name LIKE :s3)";
    $term = "%$search%";
    $params[':s1'] = $term;
    $params[':s2'] = $term;
    $params[':s3'] = $term;
}

if (!empty($status_filter) && $status_filter !== 'All') {
    $sql .= " AND status = :status";
    $params[':status'] = $status_filter;
}

$sql .= " ORDER BY created_at DESC LIMIT 100";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$leads = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Grofasto Digital Solution</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="bg-navy text-slate-100 min-h-screen">
    <header class="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
        <h1 class="font-extrabold text-lg text-white">GROFASTO CRM DASHBOARD</h1>
        <div class="flex items-center gap-4">
            <a href="../" target="_blank" class="text-xs text-slate-400 hover:text-white">View Site</a>
            <a href="logout.php" class="text-xs text-red-400 hover:underline">Logout</a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <!-- Stats Row -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div class="card p-3 text-center"><span class="text-[10px] text-slate-400 block">TOTAL</span><span class="text-xl font-bold"><?= $total ?></span></div>
            <div class="card p-3 text-center border-blue-500"><span class="text-[10px] text-blue-400 block">NEW</span><span class="text-xl font-bold text-blue-400"><?= $new ?></span></div>
            <div class="card p-3 text-center border-yellow-500"><span class="text-[10px] text-yellow-400 block">CONTACTED</span><span class="text-xl font-bold text-yellow-400"><?= $contacted ?></span></div>
            <div class="card p-3 text-center border-sky-500"><span class="text-[10px] text-sky-400 block">FOLLOW-UP</span><span class="text-xl font-bold text-sky-400"><?= $followup ?></span></div>
            <div class="card p-3 text-center border-lime-500"><span class="text-[10px] text-lime-400 block">CONVERTED</span><span class="text-xl font-bold text-lime-400"><?= $converted ?></span></div>
            <div class="card p-3 text-center"><span class="text-[10px] text-slate-400 block">CLOSED</span><span class="text-xl font-bold"><?= $closed ?></span></div>
            <div class="card p-3 text-center border-lime-500"><span class="text-[10px] text-lime-400 block">TODAY</span><span class="text-xl font-bold text-lime-400"><?= $today ?></span></div>
        </div>

        <!-- Leads Table -->
        <div class="card overflow-hidden">
            <table class="w-full text-xs text-left">
                <thead class="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                        <th class="p-3">ID</th>
                        <th class="p-3">NAME</th>
                        <th class="p-3">MOBILE</th>
                        <th class="p-3">BUSINESS</th>
                        <th class="p-3">PURPOSE</th>
                        <th class="p-3">STATUS</th>
                        <th class="p-3">DATE</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                    <?php foreach ($leads as $l): ?>
                    <tr>
                        <td class="p-3 font-mono text-slate-400">#<?= $l['id'] ?></td>
                        <td class="p-3 font-bold text-white"><?= htmlspecialchars($l['full_name']) ?></td>
                        <td class="p-3 text-lime-400 font-mono"><a href="tel:+91<?= $l['mobile'] ?>">+91 <?= $l['mobile'] ?></a></td>
                        <td class="p-3"><?= htmlspecialchars($l['business_name']) ?></td>
                        <td class="p-3 text-blue-300"><?= htmlspecialchars($l['purpose']) ?></td>
                        <td class="p-3 font-bold"><?= htmlspecialchars($l['status']) ?></td>
                        <td class="p-3 text-slate-400"><?= date('d M Y', strtotime($l['created_at'])) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </main>
</body>
</html>
`;

export async function downloadHostingerZip(): Promise<void> {
  const zip = new JSZip();

  // Root files
  zip.file('.htaccess', HTACCESS_CONTENT);
  zip.file('robots.txt', `User-agent: *\nAllow: /\nSitemap: https://www.grofasto.com/sitemap.xml\n`);
  zip.file('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.grofasto.com/</loc><priority>1.0</priority></url>
  <url><loc>https://www.grofasto.com/contact</loc><priority>0.9</priority></url>
  <url><loc>https://www.grofasto.com/privacy.php</loc><priority>0.3</priority></url>
  <url><loc>https://www.grofasto.com/terms.php</loc><priority>0.3</priority></url>
</urlset>`);

  // Config folder
  const config = zip.folder('config');
  config?.file('database.php', PHP_CONFIG_DATABASE);

  // API folder
  const api = zip.folder('api');
  api?.file('submit-lead.php', API_SUBMIT_LEAD);

  // Database folder
  const database = zip.folder('database');
  database?.file('database.sql', SQL_DATABASE_SCHEMA);

  // Admin folder
  const admin = zip.folder('admin');
  admin?.file('index.php', PHP_ADMIN_INDEX);
  admin?.file('login.php', PHP_ADMIN_LOGIN);
  admin?.file('logout.php', `<?php session_start(); session_destroy(); header('Location: login.php'); exit; ?>`);

  // Readme
  zip.file('README.md', `# Grofasto Digital Solution - Hostinger Shared Hosting Deployment Guide

1. Upload all files into public_html
2. Create MySQL Database in Hostinger hPanel -> Databases -> MySQL
3. Import database/database.sql via phpMyAdmin
4. Update config/database.php with your DB credentials
5. Open https://yourdomain.com/admin/
   Username: admin
   Password: Grof@stoAdmin#2026
`);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = window.URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grofasto-hostinger-deployment.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
