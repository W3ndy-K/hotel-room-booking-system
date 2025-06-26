/* dashboard.js */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            dashboardSections.forEach(section => section.classList.remove('active-section'));
            document.getElementById(sectionId).classList.add('active-section');

            // Example data fetching (replace with your backend API calls)
            if (sectionId === 'bookings') {
                fetchBookings();
            } else if (sectionId === 'profile') {
                fetchProfile();
            } else if (sectionId === 'loyalty') {
                fetchLoyalty();
            } else if (sectionId === 'overview'){
                fetchOverView();
            }
        });
    });

    // Example functions to fetch data (replace with your actual API calls)
    function fetchBookings() {
        // Fetch and display bookings
        document.getElementById('bookings-list').innerHTML = '<p>Loading bookings...</p>';
        // Replace with your API call and data rendering
        setTimeout(() => {
            document.getElementById('bookings-list').innerHTML = '<p>Booking 1: Room 101, Check-in: 2024-12-25</p><p>Booking 2: Suite 202, Check-in: 2025-01-10</p>';
        }, 500);
    }

    function fetchProfile() {
        // Fetch and display profile
        document.getElementById('profile-details').innerHTML = '<p>Loading profile...</p>';
        // Replace with your API call and data rendering
        setTimeout(() => {
            document.getElementById('profile-details').innerHTML = '<p>Name: John Doe</p><p>Email: john.doe@example.com</p>';
        }, 500);
    }

    function fetchLoyalty() {
        // Fetch and display loyalty details
        document.getElementById('loyalty-details').innerHTML = '<p>Loading loyalty details...</p>';
        // Replace with your API call and data rendering
        setTimeout(() => {
            document.getElementById('loyalty-details').innerHTML = '<p>Tier: Gold</p><p>Points: 1500</p>';
        }, 500);
    }

    function fetchOverView() {
        document.getElementById('upcoming-bookings-count').textContent = '2';
        document.getElementById('loyalty-points').textContent = '1500';
    }
    //Initial load
    fetchOverView();
});