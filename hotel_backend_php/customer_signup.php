<?php
// filepath: /opt/lampp/htdocs/hotel-room-booking-system/hotel_backend_php/customer_signup.php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (
    empty($data['firstName']) ||
    empty($data['lastName']) ||
    empty($data['email']) ||
    empty($data['phone']) ||
    empty($data['password'])
) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Database connection
$conn = new mysqli('localhost', 'root', '', 'hotel_booking');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit;
}

// Check if email already exists
$email = $conn->real_escape_string($data['email']);
$check = $conn->query("SELECT id FROM customers WHERE email='$email'");
if ($check && $check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered.']);
    $conn->close();
    exit;
}

// Insert new customer
$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName']);
$phone = $conn->real_escape_string($data['phone']);
$passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO customers (first_name, last_name, email, phone, password) VALUES ('$firstName', '$lastName', '$email', '$phone', '$passwordHash')";

if ($conn->query($sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed.']);
}
$conn->close();
?>