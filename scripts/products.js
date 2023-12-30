
const productsURL = 'http://localhost:5000/api/products';

const fetchProducts = async() => {
    try {
        const response = await fetch(productsURL);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('productsContainer');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p id='price'>$${product.price}</p>
            <!-- Add more product details here -->
        `;
        productsContainer.appendChild(productElement);
    });

    productsContainer.addEventListener('click', navigate)  
}

const navigate = () => {
    window.location.href = '../pages/product-detail.html';
}

document.addEventListener('DOMContentLoaded', fetchProducts);
