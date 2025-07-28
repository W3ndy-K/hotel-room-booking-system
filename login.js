// filepath: /opt/lampp/htdocs/hotel-room-booking-system/login.js
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('login-message');

    fetch('hotel_backend_php/customer_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.textContent = "Login successful! Redirecting...";
            messageDiv.style.color = "green";
            // Save user info to localStorage if needed
            localStorage.setItem('user', JSON.stringify(data.user));
            setTimeout(() => window.location.href = "user-dashboard.html", 1500);
        } else {
            messageDiv.textContent = data.message || "Login failed.";
            messageDiv.style.color = "red";
        }
    })
    .catch(() => {
        messageDiv.textContent = "Server error. Please try again later.";
        messageDiv.style.color = "red";
    });
});