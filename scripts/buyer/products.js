
const fetchProducts = async() => {
    try {
        const response = await fetch(`http://localhost:5000/api/products/getAllProducts`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p id="price">$${product.price}</p>
            <img src="${product.imageUrl[0]}">
        `;
        productsContainer.appendChild(productElement);
        productElement.addEventListener('click', () => navigate(product._id));
    });
}

const navigate = (productId) => {
    window.location.href = `../../pages/buyer/product-details.html?productId=${productId}`;
}


document.addEventListener('DOMContentLoaded', fetchProducts);

