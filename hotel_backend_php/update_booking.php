<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$field = $data['field'];
$value = $data['value'];

$allowed = ['room_id', 'user_name', 'check_in', 'check_out', 'quantity'];
if (!in_array($field, $allowed)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid field']);
    exit;
}

$stmt = $conn->prepare("UPDATE bookings SET $field = ? WHERE id = ?");
$stmt->bind_param("si", $value, $id);
$stmt->execute();

echo json_encode(['success' => true]);
