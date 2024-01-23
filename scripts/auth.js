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
});

const register = async() => {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const type = document.getElementById('register-type').value;

    try {
        const response = await fetch(`http://localhost:5000/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, type })
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
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error('Error during login:', error.message);
    }
}


const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '../../pages/login.html';
}

