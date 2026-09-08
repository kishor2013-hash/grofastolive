<?php
/**
 * Grofasto Digital Solution - Lead Submission API
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

// 2. Timing check
$submit_time = isset($_POST['form_time']) ? (int)$_POST['form_time'] : 0;
if ($submit_time > 0 && (time() - $submit_time) < 1) {
    echo json_encode(['success' => false, 'message' => 'Submitted too quickly']);
    exit;
}

// 3. Collect and sanitize input
$full_name = trim($_POST['full_name'] ?? '');
$mobile = preg_replace('/\D/', '', $_POST['mobile'] ?? '');
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

// 4. Validate Indian mobile number
if (!preg_match('/^[6-9]\d{9}$/', $mobile)) {
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
