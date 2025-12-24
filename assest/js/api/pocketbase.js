const pb = new PocketBase('http://127.0.0.1:8090'); 


function isAuthenticated() {
    return pb.authStore.isValid;
}

function getCurrentUser() {
    return pb.authStore.model;
}

function requireAuth(redirectPath = '/auth/login.html') {
    if (!isAuthenticated()) {
        window.location.href = redirectPath;
        return false;
    }
    return true;
}

export { pb, isAuthenticated, getCurrentUser, requireAuth };