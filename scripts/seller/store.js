document.addEventListener('DOMContentLoaded', () => {
    if (isAuthenticated()) {
        loadProducts();
    }
});

const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('You must be logged in to access this page.');
        window.location.href = '../../pages/login.html';
        return false;
    }
    return true;
};

const loadProducts = async () => {
    const token = localStorage.getItem('authToken');
    const sellerId = getUserId(token);

    if (!sellerId || !token) {
        console.log('Authentication failed: No seller ID or token found');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/products/getAllSellerProducts/${sellerId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
        } else {
            console.error('Failed to fetch products');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p id="price">$${product.price}</p>
            <img src="${product.imageUrl[0]}" style="width:150px; height:150px;">
            <h6>Stock Quantity: ${product.quantity}</h6>
        `;
        productElement.addEventListener('click', () => navigate(product._id));
        productList.appendChild(productElement);
    });
};

const navigate = (productId) => {
    window.location.href = `../../pages/seller/product-details.html?productId=${productId}`;
}

const postProduct = document.getElementById('post-product');
postProduct.addEventListener('click', () => {
    window.location.href = '../../pages/seller/post-product.html';
})

document.addEventListener('DOMContentLoaded', fetchProducts);
