<?php
// CORS & Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials
$host = "localhost";
$db_user = "u481314904_info";
$db_pass = "Hariom@9452";
$db_name = "u481314904_leads";

// Connect to Database
$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Read JSON Input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Fallback to $_POST if not JSON
$name      = $data['name'] ?? $_POST['name'] ?? '';
$phone     = $data['phone'] ?? $_POST['phone'] ?? '';
$email     = $data['email'] ?? $_POST['email'] ?? '';
$service   = $data['service'] ?? $_POST['service'] ?? '';
$message   = $data['message'] ?? $_POST['message'] ?? '';
$form_type = $data['form_type'] ?? $_POST['form_type'] ?? 'direct_lead';

if (empty($name) && empty($phone)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name and Phone are required."]);
    exit();
}

// Insert into leads table
$stmt = $conn->prepare("INSERT INTO leads (name, phone, email, service, message, form_type) VALUES (?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    // If table structure doesn't have form_type, fallback to basic insert
    $stmt = $conn->prepare("INSERT INTO leads (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $phone, $email, $service, $message);
} else {
    $stmt->bind_param("ssssss", $name, $phone, $email, $service, $message, $form_type);
}

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Lead saved successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
