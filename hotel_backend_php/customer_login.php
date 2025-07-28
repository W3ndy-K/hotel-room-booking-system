<?php
// filepath: /opt/lampp/htdocs/hotel-room-booking-system/hotel_backend_php/customer_login.php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['email']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Email and password required.']);
    exit;
}

$conn = new mysqli('localhost', 'root', '', 'hotel_booking');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit;
}

$email = $conn->real_escape_string($data['email']);
$result = $conn->query("SELECT * FROM customers WHERE email='$email' LIMIT 1");

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($data['password'], $user['password'])) {
        // Remove password before sending user data
        unset($user['password']);
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Email not found.']);
}
$conn->close();
?>