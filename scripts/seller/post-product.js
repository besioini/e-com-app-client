document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addProduct();
        });
    }
});

const addProduct = async () => {
    const token = localStorage.getItem('authToken');
    
    const seller = getUserId(token);
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const category = document.getElementById('product-category').value;
    const quantity = document.getElementById('product-quantity').value;
    const imageUrl = document.getElementById('product-image-url').value;

    try {
        const response = await fetch(`http://localhost:5000/api/products/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ seller, name, description, price, category, quantity, imageUrl })
        });

        if (response.ok) {
            console.log('Product added successfully');
            alert('Product added successfully');
            window.location.href = '../../pages/seller/store.html'
        } else {
            console.log('Failed to add product');
            alert('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error.message);
    }
};
