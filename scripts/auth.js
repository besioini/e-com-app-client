/*
    Event listners: loginForm, registerForm & logout
    Register to hit baseURL/users/register route 
    Login to hit baseURL/users/login route
    logout to clear local storage tokens
*/
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logout');

    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
        console.log('Cliked');
    }
});

const baseURL = 'http://localhost:5000/api';

const register = async(event) => {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${baseURL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
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

const login = async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            console.log("Redirecting to index.html");
            window.location.href = '../pages/index.html';
            console.log(data);
        } else {
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error('Error during login:', error.message);
    }
}


const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = '../pages/login.html';
}


//note: 
// I can also use if (data.success) if API res form:

//res.status(200).json({
//     success: true,
//     message: "Operation successful",
//     token: "some-auth-token", // Optional, depending on the operation
//     // ... other data ...
// });