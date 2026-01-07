"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logOut = logOut;
exports.getCurrentUser = getCurrentUser;
exports.checkAuth = checkAuth;
exports.displayUsername = displayUsername;

var _pocketbase = require("../api/pocketbase.js");

// prevent user from viewing dashboard if not logged in
function checkAuth() {
  if (!(0, _pocketbase.isAuthenticated)()) {
    window.location.href = '/public/auth/auth.html';
  }
}

function displayUsername() {
  var user = getCurrentUser();
  var userName = document.querySelector('.user-name');

  if ((0, _pocketbase.isAuthenticated)()) {
    if (user.name) {
      userName.textContent = user.name;
    } else {
      userName.textContent = user.user_name;
    }
  } else {
    userName.textContent = "Guest";
  }
}

function getCurrentUser() {
  return _pocketbase.pb.authStore.model;
}

function logOut() {
  _pocketbase.pb.authStore.clear();

  window.location.href = '/auth/login.html';
}

function displayUserData() {
  var userId, user, output, container;
  return regeneratorRuntime.async(function displayUserData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if ((0, _pocketbase.isAuthenticated)()) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          userId = _pocketbase.pb.authStore.model ? _pocketbase.pb.authStore.model.id : null;

          if (userId) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('users').getOne(userId));

        case 8:
          user = _context.sent;
          output = "\n                <div class=\"stat-img\">\n                    <img src=\"".concat(user.avatar || '/assest/images/placeholder.jpg', "\" alt=\"").concat(user.name || '', "\" class=\"user-avatar stat\"></div>\n                <div class=\"stat-content user-data\">\n                    <div class=\"stat-value\">").concat(user.name || '', " <span class=\"edit-profile-btn\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FF5C5C\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path d=\"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z\"></path>\n                    </svg>\n                    </span></div>\n                    <div class=\"stat-label\">").concat(user.email || '', "</div>\n                </div>");
          container = document.querySelector('.user-stats');

          if (container) {
            container.innerHTML = output;
            console.log('User data rendered into:', container);
          } else {
            console.warn('No container found for user data');
          }

          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](5);
          console.error('Failed to fetch current user:', _context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 14]]);
}

document.addEventListener('DOMContentLoaded', function () {
  checkAuth();
  displayUsername();
  displayUserData();
});
//# sourceMappingURL=dashboard.dev.js.map
