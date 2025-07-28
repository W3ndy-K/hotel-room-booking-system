document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Profile details
    document.getElementById('profile-details').innerHTML = `
        <table>
            <tr><td><strong>Name:</strong></td><td>${user.name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${user.email}</td></tr>
            <tr><td><strong>Username:</strong></td><td>${user.username}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${user.phone}</td></tr>
        </table>
    `;
    document.getElementById('loyalty-points').textContent = user.loyalty_points || 0;
    document.getElementById('member-since').textContent = user.member_since || '2024';
    document.getElementById('account-status').textContent = user.status || 'Active';

    // Section switching
    function showSection(section) {
        document.getElementById('profile-section').style.display = section === 'profile' ? 'block' : 'none';
        document.getElementById('loyalty-section').style.display = section === 'loyalty' ? 'block' : 'none';
        document.getElementById('support-section').style.display = section === 'support' ? 'block' : 'none';
    }
    showSection('profile');

    document.getElementById('profile-link').onclick = function(e) {
        e.preventDefault();
        showSection('profile');
    };
    document.getElementById('loyalty-link').onclick = function(e) {
        e.preventDefault();
        showSection('loyalty');
    };
    document.getElementById('support-link').onclick = function(e) {
        e.preventDefault();
        showSection('support');
    };
    document.getElementById('logout-btn').onclick = function(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    };
});