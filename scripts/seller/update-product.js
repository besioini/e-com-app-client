
/*
    Review more the approach to send only the fields that were filled out in the form, without explicitly checking each field. This method involves iterating over all form elements, constructing an update object with only the fields that have values, and then sending this object in the fetch request.

    The FormData constructor uses the name attribute to populate keys in the updates object. If the name attributes are missing or incorrect, FormData entries will not be populated as expected.
    
    The condition if (value.trim() !== '') checks if the field value, after being trimmed of whitespace, is not empty. If a field contains only spaces, it will be considered empty and not added to the updates object. Ensure that when you fill out the form, the fields contain non-whitespace characters.

*/

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    const updateProductForm = document.getElementById('update-product-form');
    if (updateProductForm) {
        updateProductForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (productId) {
                updateProduct(productId);
            } else {
                console.error('Product ID is missing');
                alert('Product ID is missing. Unable to update product.');
            }
        });
    }
});


const updateProduct = async (productId) => {
    const token = localStorage.getItem('authToken');
    const form = document.getElementById('update-product-form');
    const formData = new FormData(form);
    const updates = {};

    for (let [key, value] of formData.entries()) {
        console.log(key, value);
        if (value.trim() !== '') {
            updates[key] = value;
        }
    }

    console.log(updates);

    if (Object.keys(updates).length === 0) {
        alert('No updates to be made. Please fill out at least one field.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/products/updateProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update the product');
        }

        alert('Product updated successfully');
        window.location.href = '../../pages/seller/store.html';
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product: ' + error.message);
    }
};


