"use strict";

var _pocketbase = require("./pocketbase.js");

function alertMessage(message) {
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.remove();
  }, 2000);
}

function login() {
  var email, password;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = document.getElementById('loginEmail').value;
          password = document.getElementById('loginPassword').value;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('users').authWithPassword(email, password));

        case 5:
          alertMessage('Login successful');

          if ((0, _pocketbase.isAuthenticated)()) {
            window.location.href = '/public/products.html';
          }

          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          alertMessage(_context.t0.message);
          console.error(_context.t0.data);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}

function signup() {
  var firstName, lastName, email, password, passwordConfirm, name, signupData;
  return regeneratorRuntime.async(function signup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          firstName = document.getElementById('firstName').value.trim();
          lastName = document.getElementById('lastName').value.trim();
          email = document.getElementById('signupEmail').value.trim();
          password = document.getElementById('signupPassword').value;
          passwordConfirm = document.getElementById('confirmPassword').value;
          name = "".concat(firstName, " ").concat(lastName);

          if (!(!email || !password || !passwordConfirm)) {
            _context2.next = 9;
            break;
          }

          alertMessage('Please fill in all fields');
          return _context2.abrupt("return");

        case 9:
          if (!(password.length < 8)) {
            _context2.next = 12;
            break;
          }

          alertMessage('Password must be at least 8 characters');
          return _context2.abrupt("return");

        case 12:
          if (!(password !== passwordConfirm)) {
            _context2.next = 15;
            break;
          }

          alertMessage('Passwords do not match');
          return _context2.abrupt("return");

        case 15:
          signupData = {
            "email": email,
            "emailVisibility": true,
            "name": name,
            "password": password,
            "passwordConfirm": passwordConfirm
          };
          _context2.prev = 16;
          _context2.next = 19;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('users').create(signupData));

        case 19:
          _context2.next = 21;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('users').authWithPassword(email, password));

        case 21:
          alertMessage('Signup successful');
          window.location.href = '/public/products.html';
          _context2.next = 29;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](16);
          alertMessage(_context2.t0.message);
          console.error(_context2.t0.data);

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[16, 25]]);
} // Event Listeners


var loginForm = document.getElementById('loginForm');
var signupForm = document.getElementById('signupForm');
var showSignup = document.getElementById('showSignup');
var showLogin = document.getElementById('showLogin');
showSignup.addEventListener('click', function (e) {
  e.preventDefault();
  loginForm.classList.remove('active');
  signupForm.classList.add('active');
});
showLogin.addEventListener('click', function (e) {
  e.preventDefault();
  signupForm.classList.remove('active');
  loginForm.classList.add('active');
});
var loginButton = document.getElementById('loginBtn');
loginButton.addEventListener('click', function (e) {
  e.preventDefault();
  login();
});
var signupButton = document.getElementById('signupBtn');
signupButton.addEventListener('click', function (e) {
  e.preventDefault();
  signup();
});
var show = document.getElementById('showPassword');
var hide = document.getElementById('hidePassword');
var password = document.getElementById('signupPassword');
var confirmPassword = document.getElementById('confirmPassword');
hide.style.display = 'none';
show.addEventListener('click', function () {
  password.type = 'text';
  confirmPassword.type = 'text';
  hide.style.display = 'block';
  show.style.display = 'none';
});
hide.addEventListener('click', function () {
  password.type = 'password';
  confirmPassword.type = 'password';
  show.style.display = 'block';
  hide.style.display = 'none';
});
//# sourceMappingURL=auth.dev.js.map
