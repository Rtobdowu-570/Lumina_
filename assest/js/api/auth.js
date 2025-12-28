import  { pb , isAuthenticated } from './pocketbase.js';

function alertMessage(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
    toast.remove();
    }, 2000);
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await pb.collection('users').authWithPassword(email, password);
        alertMessage('Login successful');
        if(isAuthenticated()) {
            window.location.href = '/public/products.html';
        }
    } catch (error) {
        alertMessage(error.message);
        console.error(error.data);
    }
}

async function signup() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('confirmPassword').value;
    const name = `${firstName} ${lastName}`;

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

    const signupData = {
        "email": email,
        "emailVisibility": true,
        "name": name,
        "password": password,
        "passwordConfirm": passwordConfirm
    };

    try {
        await pb.collection('users').create(signupData);
        await pb.collection('users').authWithPassword(email, password);
        alertMessage('Signup successful');
        window.location.href = '/public/products.html';
    } catch (error) {
        alertMessage(error.message);
        console.error(error.data);
    }
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

const show = document.getElementById('showPassword');
const hide = document.getElementById('hidePassword');
const password = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
hide.style.display = 'none';

show.addEventListener('click', () => {
  password.type = 'text';
  confirmPassword.type = 'text';
  hide.style.display = 'block';
  show.style.display = 'none';
});

hide.addEventListener('click', () => {
  password.type = 'password';
  confirmPassword.type = 'password';
  show.style.display = 'block';
  hide.style.display = 'none';
});