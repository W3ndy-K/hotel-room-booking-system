<?php
session_start();
header('Content-Type: application/json');
include 'db.php'; // This file must define: $conn = new mysqli(...)

$data = json_decode(file_get_contents('php://input'), true);

// Sanitize input
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');
$response = ['success' => false];

if (empty($email) || empty($password)) {
    $response['message'] = 'Email and password are required.';
    echo json_encode($response);
    exit;
}

// === 1. Check for Admin in `users` table ===
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $admin = $result->fetch_assoc();
    if (password_verify($password, $admin['password'])) {
        $_SESSION['admin'] = $admin['email']; // or $admin['id']
        $response['success'] = true;
        $response['role'] = 'admin';
        $response['redirect'] = 'admin_dashboard.html';
        echo json_encode($response);
        $stmt->close();
        $conn->close();
        exit;
    }
}
$stmt->close();

// === 2. Check for Normal User in `customers` table ===
$stmt = $conn->prepare("SELECT * FROM customers WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['email'];
        $response['success'] = true;
        $response['role'] = 'user';
        $response['redirect'] = 'user_dashboard.html';
    } else {
        $response['message'] = 'Incorrect password.';
    }
} else {
    $response['message'] = 'User not found.';
}

$stmt->close();
$conn->close();
echo json_encode($response);
?>
