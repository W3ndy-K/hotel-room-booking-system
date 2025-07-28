<?php
$conn = new mysqli('localhost', 'root', '', 'hotel_booking');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reports</title>
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
      background-color: #6c757d;
      color: white;
      text-transform: uppercase;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    .top-nav {
      text-align: right;
      margin-bottom: 20px;
    }

    .btn {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 5px;
    }

    .btn:hover {
      background-color: #0056b3;
    }

    .no-data {
      text-align: center;
      font-style: italic;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-nav">
      <a href="/hotel-room-booking-system/hotel_backend_php/admin_dashboard.html" class="btn">← Back to Dashboard</a>
    </div>
    <h2>Stored Reports</h2>
    <?php
    $query = "SELECT room_type, total_bookings, total_rooms_booked, generated_on FROM reports ORDER BY generated_on DESC";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        echo "<table>
                <tr>
                    <th>Room Type</th>
                    <th>Total Bookings</th>
                    <th>Total Rooms Booked</th>
                    <th>Generated On</th>
                </tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['room_type']}</td>
                    <td>{$row['total_bookings']}</td>
                    <td>{$row['total_rooms_booked']}</td>
                    <td>{$row['generated_on']}</td>
                  </tr>";
        }
        echo "</table>";
    } else {
        echo "<p class='no-data'>No reports available.</p>";
    }

    $conn->close();
    ?>
  </div>
</body>
</html>