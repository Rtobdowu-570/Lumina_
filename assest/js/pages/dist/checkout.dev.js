"use strict";

var _pocketbase = require("../api/pocketbase.js");

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

document.addEventListener('DOMContentLoaded', function () {
  checkAuth();
  displayUsername();
});
var logOutBtn = document.querySelector('.log-out');
logOutBtn.addEventListener('click', function () {
  logOut();
});
var multiTabs = document.querySelectorAll('.payment-option, .shipping-option');
multiTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    var tabType = tab.classList.contains('payment-option') ? 'payment-option' : 'shipping-option';
    document.querySelectorAll('.' + tabType).forEach(function (t) {
      return t.classList.remove('active');
    });
    tab.classList.add('active');
  });
});
//# sourceMappingURL=checkout.dev.js.map
