"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;
exports.getCurrentUser = getCurrentUser;
exports.requireAuth = requireAuth;
exports.pb = void 0;
var pb = new PocketBase('http://127.0.0.1:8090'); // Disable SDK auto-cancellation of duplicated pending requests to avoid
// unexpected ClientResponseError when multiple list/fullList calls happen.

exports.pb = pb;
pb.autoCancellation(false);

function isAuthenticated() {
  return pb.authStore.isValid;
}

function getCurrentUser() {
  return pb.authStore.model;
}

function requireAuth() {
  var redirectPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/auth/login.html';

  if (!isAuthenticated()) {
    window.location.href = redirectPath;
    return false;
  }

  return true;
}
//# sourceMappingURL=pocketbase.dev.js.map
