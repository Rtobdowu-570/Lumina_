import  { pb } from './pocketbase.js';

function alertMessage(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
    toast.remove();
    }, 2000);
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    pb.collection('users').authWithPassword(email, password).then(() => {
        alertMessage('Login successful');
        window.location.href = '/products.html';
    }).catch((error) => {
        alertMessage(error.message);
    });
}

async function signup() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('confirmPassword').value;
    const name = `${firstName} ${lastName}`;

    const signupData = {
        "email": email,
        "emailVisibility": true,
        "name": name,
        "password": password,
        "passwordConfirm": passwordConfirm
    }

    if(!email || !password || !passwordConfirm) {
        alertMessage('Please fill in all fields');
        return;
    }

    if (password.length < 8) {
        alertMessage('Password must be at least 8 characters');
        return;
    }

    if (password !== passwordConfirm) {
        alertMessage('Passwords do not match');
        return;
    }

    pb.collection('users').create({ signupData }).then(() => {
        alertMessage('Signup successful');
        window.location.href = '/products.html';
    }).catch((error) => {
        alertMessage(error.message);
    });
}


// Event Listeners
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');

        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });

        const loginButton = document.getElementById('loginBtn');
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            login();
        });

        const signupButton = document.getElementById('signupBtn');
        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            signup();
        });
