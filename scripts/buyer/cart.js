/*
    addToCart and getCart functions 
    review re.params and re.query
*/

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
        } else {
            alert('Failed adding product to cart');
        }
    } catch (error) {
        alert('Error adding product to cart:', error.message);
        console.log('Error adding product to cart:', error.message);
    }
};

const getCart = async () => {
    const token = localStorage.getItem('authToken');
    const userId = getUserId(token); 
    if (!token || !userId) {
        console.error('No token found or unable to retrieve user ID');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/cart/getCart/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const cart = await response.json();
            displayCartItems(cart.items);
        } else {
            console.error("Failed to fetch cart items");
        }
    } catch (error) {
        console.error('Error fetching cart:', error.message);
    }
};

const displayCartItems = (cartItems) => {
    const cartContainer = document.getElementById('cart-container');
    const cartCheckout = document.getElementById('cart-checkout');
    if (!cartContainer) {
        console.error('Cart container not found');
        return;
    }
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const product = item.productId;
        const quantity = item.quantity;
        const itemElement = document.createElement('div');
        const checkoutElement = document.createElement('div');

        itemElement.className = 'cart-item';
        // checkoutElement.className = 'cart-checkout';

        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>Quantity: ${quantity}</p> <!-- Quantity display can be adjusted as needed -->
                <p>Price: $${product.price * quantity}</p>
                <button class="remove-btn">Remove</button>
                <button class="update-btn">Update Quantity</button>
            </div>
        `;
        checkoutElement.innerHTML = `<button>Checkout</button>`;
        
        cartContainer.appendChild(itemElement);
        // cartCheckout.appendChild(checkoutElement);

        itemElement.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(product._id));
        itemElement.querySelector('.update-btn').addEventListener('click', function() {
            showUpdateQuantityUI(this.parentElement, product._id, quantity);
        });
    });
};

const removeFromCart = async (productId) => {
    if (!confirm("Are you sure you want to remove this item from the cart?")) {
        return;
    }

    const token = localStorage.getItem('authToken');
    const userId = getUserId(token);
    try {
        const response = await fetch(`http://localhost:5000/api/cart/removeFromCart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, productId })
        });

        if (response.ok) {
            alert('Item removed from cart');
            location.reload();
        } else {
            alert('Failed to remove item from cart');
        }
    } catch (error) {
        alert('Error removing item from cart:', error.message);
    }
};

const showUpdateQuantityUI = (parentElement, productId, currentQuantity) => {
    parentElement.innerHTML = `
        <input type="number" value="${currentQuantity}" min="1" class="quantity-input">
        <button class="confirm-update-btn">Confirm</button>
    `;

    parentElement.querySelector('.confirm-update-btn').addEventListener('click', () => {
        const newQuantity = parentElement.querySelector('.quantity-input').value;
        updateCartItem(productId, newQuantity);
    });
};

const updateCartItem = async (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity");
        return;
    }

    const token = localStorage.getItem('authToken');
    const userId = getUserId(token);
    try {
        const response = await fetch(`http://localhost:5000/api/cart/updateCartItem`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, productId, quantity })
        });

        if (response.ok) {
            alert('Cart updated');
            location.reload();
        } else {
            alert('Failed to update cart');
        }
    } catch (error) {
        alert('Error updating cart:', error.message);
    }
};

document.addEventListener('DOMContentLoaded', getCart());
