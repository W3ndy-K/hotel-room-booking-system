document.getElementById('customer-signup').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('signup-message');

    // Simple validation
    if (password !== confirmPassword) {
        messageDiv.textContent = "Passwords do not match.";
        messageDiv.style.color = "red";
        return;
    }

    // Send data to backend
    fetch('hotel_backend_php/customer_signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.textContent = "Account created successfully! Redirecting to login...";
            messageDiv.style.color = "green";
            setTimeout(() => window.location.href = "login.html", 2000);
        } else {
            messageDiv.textContent = data.message || "Sign up failed.";
            messageDiv.style.color = "red";
        }
    })
    .catch(() => {
        messageDiv.textContent = "Server error. Please try again later.";
        messageDiv.style.color = "red";
    });
});