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
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  _pocketbase.pb.collection('users').authWithPassword(email, password).then(function () {
    alertMessage('Login successful');
    window.location.href = '/products.html';
  })["catch"](function (error) {
    alertMessage(error.message);
  });
}

function signup() {
  var firstName, lastName, email, password, passwordConfirm, name, signupData;
  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          firstName = document.getElementById('firstName').value;
          lastName = document.getElementById('lastName').value;
          email = document.getElementById('signupEmail').value;
          password = document.getElementById('signupPassword').value;
          passwordConfirm = document.getElementById('confirmPassword').value;
          name = "".concat(firstName, " ").concat(lastName);
          signupData = {
            "email": email,
            "emailVisibility": true,
            "name": name,
            "password": password,
            "passwordConfirm": passwordConfirm
          };

          if (!(!email || !password || !passwordConfirm)) {
            _context.next = 10;
            break;
          }

          alertMessage('Please fill in all fields');
          return _context.abrupt("return");

        case 10:
          if (!(password.length < 8)) {
            _context.next = 13;
            break;
          }

          alertMessage('Password must be at least 8 characters');
          return _context.abrupt("return");

        case 13:
          if (!(password !== passwordConfirm)) {
            _context.next = 16;
            break;
          }

          alertMessage('Passwords do not match');
          return _context.abrupt("return");

        case 16:
          _pocketbase.pb.collection('users').create({
            signupData: signupData
          }).then(function () {
            alertMessage('Signup successful');
            window.location.href = '/products.html';
          })["catch"](function (error) {
            alertMessage(error.message);
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
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
//# sourceMappingURL=auth.dev.js.map
