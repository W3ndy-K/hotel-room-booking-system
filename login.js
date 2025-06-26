/* auth.js */
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Example Login Submission (replace with your actual backend logic)
    document.getElementById('login-form-submit').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // Add your login logic here
        console.log('Login:', email, password);
        //Example of redirecting to a new page
        //window.location.href = "/dashboard";
    });

    // Example Signup Submission (replace with your actual backend logic)
    document.getElementById('signup-form-submit').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        // Add your signup logic here, including password validation
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log('Signup:', name, email, password);
        //example of redirecting to login.
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});