<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$response = ['success' => false];

if ($email && $password) {
    $stmt = $conn->prepare("SELECT * FROM customers WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $response['success'] = true;
            // Optionally send user info except password
            unset($user['password']);
            $response['user'] = $user;
        } else {
            $response['message'] = 'Incorrect password.';
        }
    } else {
        $response['message'] = 'Email not found.';
    }
    $stmt->close();
}

echo json_encode($response);
?>