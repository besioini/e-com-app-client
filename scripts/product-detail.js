/*
    fetch product details
*/

const baseURL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    console.log('Fetched Product ID from URL:', productId);
    if (productId) {
        fetchProductDetails(productId);
    }
});

const fetchProductDetails = async (productId) => {
    try {
        const url = `${baseURL}/products/getProduct/${productId}`;
        console.log(`Fetching from URL: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
            const product = await response.json();
            displayProductDetails(product);
        } else {
            console.error("Non-JSON response received:", response);
            alert('Product detail not found')
        }

    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

function displayProductDetails(product) {
    const container = document.getElementById('product-detail-container');
    container.innerHTML = '';

    const productDetailElement = document.createElement('div');
    productDetailElement.className = 'product-detail';

    let imagesHtml = '';

    if (product.imageUrl) {
        imagesHtml = product.imageUrl.map(url => `<img src="${url}" alt="${product.name}" style="max-width:300px; height:auto;">`).join('');
    } else {
        imagesHtml = `<img src="${product.imageUrl}" alt="${product.name}" style="max-width:300px; height:auto;">`;
    }

    productDetailElement.innerHTML = `
        <h2>Seller${product.seller}</h2>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.quantity} items left</p>
        ${imagesHtml}
        <p>Price: $${product.price}</p>
        <button id="addToCart">Add to cart</button>
    `;

    container.appendChild(productDetailElement);
}
