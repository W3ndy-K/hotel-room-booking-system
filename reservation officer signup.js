/* reservation-officer-signup.js */
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('reservation-officer-signup');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const employeeId = document.getElementById('employeeId').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic password matching validation
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Add more robust client-side validation here (e.g., email format, password strength)
        // Then, send the data to your backend for processing.

        // Example: Sending data to a backend API (replace with your actual API endpoint)
        fetch('/api/reservation-officer-signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                employeeId: employeeId,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Signup successful! Please login.');
                window.location.href = '/reservation-officer-login'; // Redirect to login page
            } else {
                alert('Signup failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during signup.');
        });
    });
});