const pb = new PocketBase('http://127.0.0.1:8090');

// Disable SDK auto-cancellation of duplicated pending requests to avoid
// unexpected ClientResponseError when multiple list/fullList calls happen.
pb.autoCancellation(false);


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