
const fetchProducts = async() => {
    try {
        const response = await fetch(`${baseURL}/products/getAllProducts`);
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
            <p class='price'>$${product.price}</p>
            <img src="${product.imageUrl[0]}" style="width:150px; height:150px;">
        `;
        productsContainer.appendChild(productElement);
        productElement.addEventListener('click', () => navigate(product._id));
    });
}

const navigate = (productId) => {
    window.location.href = `../pages/product-detail.html?productId=${productId}`;
}


document.addEventListener('DOMContentLoaded', fetchProducts);
