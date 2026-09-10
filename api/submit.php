<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -------------------------------------------------------------
// Hostinger Database Credentials (Configured)
// -------------------------------------------------------------
define('DB_HOST', 'localhost');
define('DB_USER', 'u481314904_info');
define('DB_PASS', 'Hariom@9452');
define('DB_NAME', 'u481314904_leads');
// -------------------------------------------------------------

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

// Form Data Catching
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$service = trim($data['service'] ?? $data['service_type'] ?? '');
$message = trim($data['message'] ?? $data['details'] ?? '');
$form_type = trim($data['form_type'] ?? 'lead');

if (empty($name) && empty($phone) && empty($email)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name, Phone or Email is required."]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO leads (name, email, phone, service, message, form_type, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $phone, $service, $message, $form_type]);

    echo json_encode(["status" => "success", "message" => "Data saved successfully!"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Insert failed: " . $e->getMessage()]);
}
?>
