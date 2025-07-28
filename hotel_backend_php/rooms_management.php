<?php
// rooms_management.php
$conn = new mysqli('localhost', 'root', '', 'hotel_booking');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Room Management</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: #fff;
      padding: 30px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #007bff;
      color: white;
      text-transform: uppercase;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    button {
      padding: 6px 12px;
      margin-right: 5px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #0056b3;
    }

    .editable {
      background-color: #fff3cd;
    }

    .top-nav {
      text-align: right;
      margin-bottom: 20px;
    }

    .btn {
      background-color: #28a745;
      color: white;
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 5px;
    }

    .btn:hover {
      background-color: #218838;
    }
  </style>
  <script>
    function saveRoom(id) {
      const row = document.querySelector(`tr[data-id='${id}']`);
      const room_type = row.querySelector("[data-field='room_type']").innerText;
      const price = row.querySelector("[data-field='price']").innerText;
      const availability = row.querySelector("[data-field='availability']").innerText;

      fetch('update_room.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, room_type, price, availability })
      })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => alert('Error updating room'));
    }

    function deleteRoom(id) {
      if (!confirm('Are you sure you want to delete this room?')) return;

      fetch('delete_room.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          document.querySelector(`tr[data-id='${id}']`).remove();
          alert('Room deleted successfully');
        } else {
          alert('Error deleting room');
        }
      });
    }
  </script>
</head>
<body>
  <div class="container">
    <div class="top-nav">
      <a href="/hotel-room-booking-system/hotel_backend_php/admin_dashboard.html" class="btn">← Back to Dashboard</a>
    </div>
    <h2>Manage Rooms</h2>
    <?php
    $result = $conn->query("SELECT * FROM rooms");

    if ($result->num_rows > 0) {
        echo "<table><tr><th>ID</th><th>Type</th><th>Price</th><th>Availability</th><th>Actions</th></tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr data-id='{$row['id']}'>
                <td>{$row['id']}</td>
                <td contenteditable='true' class='editable' data-field='room_type'>{$row['room_type']}</td>
                <td contenteditable='true' class='editable' data-field='price'>{$row['price']}</td>
                <td contenteditable='true' class='editable' data-field='availability'>{$row['availability']}</td>
                <td>
                    <button onclick='saveRoom({$row['id']})'>Save</button>
                    <button onclick='deleteRoom({$row['id']})'>Delete</button>
                </td>
            </tr>";
        }
        echo "</table>";
    } else {
        echo "<p>No rooms found.</p>";
    }

    $conn->close();
    ?>
  </div>
</body>
</html>
