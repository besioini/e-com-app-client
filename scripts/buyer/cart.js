/*
    review re.params and re.query
    addToCart and getCart functions 
*/

document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', function(event) {
            event.preventDefault();
            getCart();
        });
    }
});

const addToCart = async (productId) => {
    const quantity = parseInt(document.getElementById('product-quantity').value);
    console.log(quantity);
    const token = localStorage.getItem('authToken');
    const userId = getUserId(token);
    try {
        const response = await fetch(`http://localhost:5000/api/cart/addToCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, productId, quantity })
        });
        if (response.ok) {
            alert('Product added to cart');
            window.location.href = '../../pages/buyer/cart.html';
            // I need to update cart state on home page, so user can click it
        } else {
            alert('Failed adding product to cart');
        }
    } catch (error) {
        alert('Error adding product to cart:', error.message);
        console.log('Error adding product to cart:', error.message);
    }
};

const getCart = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            alert('No token found, session might be expired');
            return;
        }

        const userId = getUserId(token);
        if (!userId) {
            console.error('Unable to retrieve user ID from token');
            return;
        }

        const response = await fetch(`http://localhost:5000/api/cart/getCart/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const cart = await response.json();
            const cartItems = cart.items;
            console.log('Cart data:', cartItems); 
            displayCartItems(cartItems);
        } else {
            console.error("Failed to fetch cart items");
            alert("Failed to fetch cart items");
        }
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        alert('Error fetching cart:', error.message);
    }
};

const displayCartItems = (cartItems) => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const product = item.productId;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>Quantity:${item.quantity}</p>
                <p>Price: $${product.price * item.quantity}</p>
            </div>
            <div class="cart-item-actions">
            </div>
        `;

        cartContainer.appendChild(itemElement);
    });
};