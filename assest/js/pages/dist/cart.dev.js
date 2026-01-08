"use strict";

var _cartItem = require("../components/cart-item.js");

var _pocketbase = require("../api/pocketbase.js");

var cartItem = new _cartItem.CartItem();

function displayCart() {
  var user, data, cartContainer;
  return regeneratorRuntime.async(function displayCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = getCurrentUser();

          if (!(!user || !user.id)) {
            _context.next = 5;
            break;
          }

          console.warn('No authenticated user');
          return _context.abrupt("return");

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').getFullList({
            filter: "user = '".concat(user.id, "'"),
            expand: 'product'
          }));

        case 7:
          data = _context.sent;
          cartContainer = document.querySelector('.cart-items');

          if (cartContainer) {
            _context.next = 12;
            break;
          }

          console.warn('Cart container not found');
          return _context.abrupt("return");

        case 12:
          data.forEach(function (pd) {
            var productData = pd.expand.product;
            var cartSection = document.createElement('div');
            cartSection.className = 'cart-item';
            cartSection.dataset.id = pd.id;
            cartSection.innerHTML += "\n            <div class=\"item-image\"><img src=\"".concat(_pocketbase.pb.files.getURL(productData, productData.image), "\" alt=\"").concat(productData.name, "\"></div>\n            <div class=\"item-details\">\n                <h3 class=\"item-name\">").concat(productData.name, "</h3>\n            </div>\n        <div class=\"item-quantity\">\n            <button class=\"qty-btn\" data-action=\"decrease\">\u2212</button>\n            <input type=\"number\" value=\"").concat(pd.quantity, "\" min=\"1\" data-action=\"quantity\">\n            <button class=\"qty-btn\" data-action=\"increase\">+</button>\n        </div>\n        <div class=\"item-price\">\n            <div class=\"price-current\">$").concat(productData.price.toFixed(2), "</div>\n            ").concat(productData.originalPrice ? "<div class=\"price-original\">$".concat(productData.originalPrice.toFixed(2), "</div>") : "", "\n        </div>\n         <div class=\"item-actions\">\n            <button class=\"remove-btn\" data-action=\"remove\">\uD83D\uDDD1\uFE0F</button>\n        </div>\n            ");
            cartContainer.appendChild(cartSection);
            attachEventListeners(cartSection);
            return cartSection;
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error('Failed to display cart:', _context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

function attachEventListeners(item) {
  item.addEventListener('click', function _callee(e) {
    var btn, action;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            btn = e.target.closest('button');
            action = btn ? btn.dataset.action : null;

            if (!(action === "decrease")) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return regeneratorRuntime.awrap(updateQuantity(item, action));

          case 5:
            _context2.next = 13;
            break;

          case 7:
            if (!(action === "increase")) {
              _context2.next = 12;
              break;
            }

            _context2.next = 10;
            return regeneratorRuntime.awrap(updateQuantity(item, action));

          case 10:
            _context2.next = 13;
            break;

          case 12:
            if (action === "remove") {
              cartItem.remove(item);
            }

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

function updateQuantity(item, action) {
  var input, quantity, currentQuantity;
  return regeneratorRuntime.async(function updateQuantity$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          input = item.querySelector('[data-action="quantity"]');
          quantity = input.value;
          currentQuantity = parseInt(quantity);

          if (!(action === "increase")) {
            _context3.next = 9;
            break;
          }

          input.value = currentQuantity + 1;
          _context3.next = 7;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').update(item.dataset.id, {
            quantity: currentQuantity + 1
          }));

        case 7:
          _context3.next = 13;
          break;

        case 9:
          if (!(action === "decrease")) {
            _context3.next = 13;
            break;
          }

          input.value = currentQuantity - 1;
          _context3.next = 13;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').update(item.dataset.id, {
            quantity: currentQuantity - 1
          }));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function calculateItemPrice() {
  var paymentSummary, data, subtotal, shipping, tax, total;
  return regeneratorRuntime.async(function calculateItemPrice$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          paymentSummary = document.querySelector('.summary-details');
          _context4.next = 3;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').getFullList({
            filter: "user = \"".concat(getCurrentUser().id, "\""),
            expand: 'product'
          }));

        case 3:
          data = _context4.sent;
          console.log(data); // Calculate totals for all items

          subtotal = 0;
          data.forEach(function (pd) {
            var paymentData = pd.expand.product;
            subtotal += pd.quantity * paymentData.price;
          });
          shipping = subtotal * 0.01;
          tax = subtotal * 0.05 * 0.05;
          total = subtotal + shipping + tax;
          paymentSummary.innerHTML = "\n        <div class=\"summary-row\">\n            <span>Subtotal (<span id=\"total-items\">".concat(data.length, "</span> ").concat(data.length > 1 ? 'items' : 'item', ")</span>\n            <span id=\"subtotal\">$").concat(subtotal.toFixed(2), "</span>\n        </div>\n        <div class=\"summary-row\">\n            <span>Shipping</span>\n            <span id=\"shipping\">$").concat(shipping.toFixed(2), "</span>\n        </div>\n        <div class=\"summary-row\">\n            <span>Tax</span>\n            <span id=\"tax\">$").concat(tax.toFixed(2), "</span>\n        </div>\n        <div class=\"summary-row discount\" id=\"discount-row\" style=\"display: none\">\n            <span>Discount</span>\n            <span id=\"discount\">-$0.00</span>\n        </div>\n        <div class=\"summary-divider\"></div>\n        <div class=\"summary-row total\">\n            <span>Total</span>\n            <span id=\"total\">$").concat(total.toFixed(2), "</span>\n        </div>\n    ");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
}

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
  displayCart();
  checkAuth();
  displayUsername();
  calculateItemPrice();
});
var logOutBtn = document.querySelector('.log-out');
logOutBtn.addEventListener('click', function () {
  logOut();
});
//# sourceMappingURL=cart.dev.js.map
