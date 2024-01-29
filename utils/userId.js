
/*
<<<<<<< HEAD
    100% of this function copied and pasted
=======
    100% of this function is copied and pasted
>>>>>>> e1a9452 (Added update & remove cart functionality and some styling changes)
*/

const getUserId = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload).userId;
    } catch (e) {
        console.error('Error decoding token:', e);
        return null;
    }
};
