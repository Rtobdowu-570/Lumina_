import { pb, isAuthenticated } from '../api/pocketbase.js';

// prevent user from viewing dashboard if not logged in
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

async function displayUserData() {
    if (!isAuthenticated()) return;
    const userId = pb.authStore.model ? pb.authStore.model.id : null;
    if (!userId) return;

    try {
        const user = await pb.collection('users').getOne(userId);

        const output = `
                <div class="stat-img">
                    <img src="${user.avatar || '/assest/images/placeholder.jpg'}" alt="${user.name || ''}" class="user-avatar stat"></div>
                <div class="stat-content user-data">
                    <div class="stat-value">${user.name || ''} <span class="edit-profile-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                    </span></div>
                    <div class="stat-label">${user.email || ''}</div>
                </div>`;
        
        const container = document.querySelector('.user-stats');
        if (container) {
            container.innerHTML = output;
            console.log('User data rendered into:', container);
        } else {
            console.warn('No container found for user data');
        }
    } catch (err) {
        console.error('Failed to fetch current user:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    displayUsername();
    displayUserData();
});

export { logOut, getCurrentUser, checkAuth, displayUsername };