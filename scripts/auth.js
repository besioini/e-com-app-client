/*
    Event listners: loginForm, registerForm & logout
    Register to hit baseURL/users/register route 
    Login to hit baseURL/users/login route
    logout to clear local storage tokens

    note: 
    review (data.success) if API res form:
        res.status(200).json({
            success: true,
            message: "Operation successful",
            token: "some-auth-token"
        });
*/
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logout');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event){
            event.preventDefault();
            login();
        });
    }
    if (registerForm) {
        registerForm.addEventListener('submit', function(event){
            event.preventDefault();
            register();
        });
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event){
            event.preventDefault();
            logout();
        });
    }

    if (document.getElementById('profile-container')) {
        getProfile();
    }

    if (updateButton) {
        updateButton.addEventListener('click', function(event){
            event.preventDefault();
            updateProfile();
        });
    }
    
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                deleteAccount();
            }
        });
    }
});

const register = async() => {
    const firstname = document.getElementById('register-firstname').value;
    const lastname = document.getElementById('register-lastname').value;
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const type = document.getElementById('register-type').value;

    try {
        const response = await fetch(`http://localhost:5000/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, username, email, password, type })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Successful Registration');
            window.location.href = '../pages/login.html';
        } else {
            console.error('Registration failed:', data.message);
        }
    } catch (error) {
        console.error('Error during registration:', error.message);
    }
}

const login = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`http://localhost:5000/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', data.token);

            if (data.userType === 'seller') {
                console.log("Redirecting to seller portal");
                window.location.href = '../pages/seller/home.html';
            } else {
                console.log("Redirecting to buyer portal");
                window.location.href = '../pages/buyer/index.html';
            }
        } else {
            alert('Login failed');
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        alert('Server error')
        console.error('Server error:', error.message);
    }
}


const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '../../pages/login.html';
}

const getProfile = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const userId = getUserId(token);
        const response = await fetch(`http://localhost:5000/api/users/getProfile/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            displayProfile(data);
        } else {
            console.error('Failed to fetch profile:', data.message);
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
};

const displayProfile = (userData) => {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = `
        <h2>User Profile</h2>
        <p><strong>First Name:</strong> ${userData.firstname}</p>
        <p><strong>Last Name:</strong> ${userData.lastname}</p>
        <p><strong>Username:</strong> ${userData.username}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
    `;
};

const updateProfile = async () => {
    let updatedFields = {};
    const firstname = document.getElementById('update-firstname').value;
    if (firstname) updatedFields.firstname = firstname;

    const lastname = document.getElementById('update-lastname').value;
    if (lastname) updatedFields.lastname = lastname;

    const username = document.getElementById('update-username').value;
    if (username) updatedFields.username = username;

    const email = document.getElementById('update-email').value;
    if (email) updatedFields.email = email;

    if (Object.keys(updatedFields).length === 0) {
        console.log('No changes detected. Please update at least one field.');
        alert('No changes detected. Please update at least one field.')
        return;
    }

    const token = localStorage.getItem('authToken');

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields)
    };

    try {
        const token = localStorage.getItem('authToken');
        const userId = getUserId(token);        
        const response = await fetch(`http://localhost:5000/api/users/updateProfile/${userId}`, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log('Profile updated successfully:', data);
            document.getElementById('updateForm').style.display = 'none';
            window.location.reload();
        } else {
            console.error('Failed to update profile:', data.message);
            alert('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
    }
};

const deleteAccount = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const userId = getUserId(token);
        const response = await fetch(`http://localhost:5000/api/users/deleteAccount/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Account deleted successfully');
            logout();
        } else {
            console.error('Failed to delete account:', data.message);
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
    }
};