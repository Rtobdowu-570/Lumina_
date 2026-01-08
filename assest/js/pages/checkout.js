import { pb, isAuthenticated } from '../api/pocketbase.js';

function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/public/auth/auth.html';
    }
}

function displayUsername() {
    const user =  getCurrentUser()
    const userName = document.querySelector('.user-name');

    if (isAuthenticated()) {
      if(user.name) {
        userName.textContent = user.name;
      } else {
        userName.textContent = user.user_name;
      }
    }
    else {
      userName.textContent = "Guest";
}
}

function getCurrentUser() {
    return pb.authStore.model;
}

function logOut() {
    pb.authStore.clear(); 
    window.location.href = '/auth/login.html';
}

document.addEventListener('DOMContentLoaded',  () => {
    checkAuth();
    displayUsername();
});

const logOutBtn = document.querySelector('.log-out');
logOutBtn.addEventListener('click', () => {
    logOut();
});

const multiTabs = document.querySelectorAll('.payment-option, .shipping-option');
multiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabType = tab.classList.contains('payment-option') ? 'payment-option' : 'shipping-option';
        document.querySelectorAll('.' + tabType).forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});