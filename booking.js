/* booking.js */
document.addEventListener('DOMContentLoaded', function() {
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

    //example of changing availabilty.
    setTimeout(()=>{
        document.querySelectorAll('.room-item')[1].querySelector(".availability span").textContent = "Unavailable";
        document.querySelectorAll('.room-item')[1].querySelector(".availability span").classList.remove('available');
        document.querySelectorAll('.room-item')[1].querySelector(".availability span").classList.add('unavailable');
    }, 5000);
});