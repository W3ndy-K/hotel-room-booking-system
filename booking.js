document.addEventListener('DOMContentLoaded', function() {
    // User authentication and section switching
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Fill profile details from user object
    document.getElementById('profile-details').innerHTML = `
        <table>
            <tr><td><strong>Name:</strong></td><td>${user.first_name || user.name || ''} ${user.last_name || ''}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${user.email || ''}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${user.phone || ''}</td></tr>
        </table>
    `;
    document.getElementById('loyalty-points').textContent = user.loyalty_points || 0;

    // Section switching
    function showSection(section) {
        document.getElementById('bookings-section').style.display = section === 'bookings' ? 'block' : 'none';
        document.getElementById('profile-section').style.display = section === 'profile' ? 'block' : 'none';
        document.getElementById('loyalty-section').style.display = section === 'loyalty' ? 'block' : 'none';
        document.getElementById('support-section').style.display = section === 'support' ? 'block' : 'none';
    }
    showSection('bookings');

    document.getElementById('bookings-link').onclick = function(e) {
        e.preventDefault();
        showSection('bookings');
    };
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
        window.location.href = 'hotel.html';
    };

    // Booking logic
    const roomItems = document.querySelectorAll('.room-item');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    let cart = [];

    roomItems.forEach(room => {
        const addToCartButton = room.querySelector('.add-to-cart');
        const quantityInput = room.querySelector('input[type="number"]');
        const roomType = room.getAttribute('data-room-type');
        const price = parseInt(room.getAttribute('data-price'));

        addToCartButton.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                const existingItem = cart.find(item => item.type === roomType);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({ type: roomType, quantity: quantity, price: price });
                }
                updateCart();
                quantityInput.value = 0; // Reset quantity
            }
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.type} x${item.quantity} - $${item.price * item.quantity}`;
            cartItems.appendChild(listItem);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total;
    }

    checkoutButton.addEventListener('click', function() {
        if (cart.length > 0) {
            // Implement your checkout logic here (e.g., redirect to payment page)
            console.log('Checkout:', cart);
            alert('Checkout process initiated. Implement your backend logic.');
        } else {
            alert('Your cart is empty.');
        }
    });

    // Example of changing availability.
    setTimeout(() => {
        if (document.querySelectorAll('.room-item')[1]) {
            document.querySelectorAll('.room-item')[1].querySelector(".availability span").textContent = "Unavailable";
            document.querySelectorAll('.room-item')[1].querySelector(".availability span").classList.remove('available');
            document.querySelectorAll('.room-item')[1].querySelector(".availability span").classList.add('unavailable');
        }
    }, 5000);
});