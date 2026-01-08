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
            console.log(productData);
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

function checkAuth() {
  if (!(0, _pocketbase.isAuthenticated)()) {
    window.location.href = '/public/auth/auth.html';
  }
}

function attachEventListeners(container) {
  container.addEventListener('click', function _callee(e) {
    var btn, action, el, itemEl, id, row, toRemove, i, next;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            btn = e.target.closest('[data-action]');

            if (btn) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            action = btn.dataset.action;
            el = btn;
            itemEl = null;

          case 6:
            if (!el) {
              _context2.next = 13;
              break;
            }

            if (!(el.dataset && el.dataset.id)) {
              _context2.next = 10;
              break;
            }

            itemEl = el;
            return _context2.abrupt("break", 13);

          case 10:
            el = el.previousElementSibling || el.parentElement;
            _context2.next = 6;
            break;

          case 13:
            if (itemEl) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return");

          case 15:
            id = itemEl.dataset.id;

            if (!(action === 'increase')) {
              _context2.next = 21;
              break;
            }

            _context2.next = 19;
            return regeneratorRuntime.awrap(updateQuantity(1, id));

          case 19:
            _context2.next = 49;
            break;

          case 21:
            if (!(action === 'decrease')) {
              _context2.next = 26;
              break;
            }

            _context2.next = 24;
            return regeneratorRuntime.awrap(updateQuantity(-1, id));

          case 24:
            _context2.next = 49;
            break;

          case 26:
            if (!(action === 'remove')) {
              _context2.next = 49;
              break;
            }

            _context2.prev = 27;
            _context2.next = 30;
            return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart')["delete"](id));

          case 30:
            row = document.querySelector("[data-id=\"".concat(id, "\"]"));

            if (!row) {
              _context2.next = 43;
              break;
            }

            toRemove = row;
            i = 0;

          case 34:
            if (!(i < 4)) {
              _context2.next = 43;
              break;
            }

            next = toRemove.nextElementSibling;
            toRemove.remove();

            if (next) {
              _context2.next = 39;
              break;
            }

            return _context2.abrupt("break", 43);

          case 39:
            toRemove = next;

          case 40:
            i++;
            _context2.next = 34;
            break;

          case 43:
            window.dispatchEvent(new CustomEvent('cart-updated'));
            _context2.next = 49;
            break;

          case 46:
            _context2.prev = 46;
            _context2.t0 = _context2["catch"](27);
            console.error('Failed to remove cart item:', _context2.t0);

          case 49:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[27, 46]]);
  });
  container.addEventListener('change', function _callee2(e) {
    var input, newQuantity, el, itemEl, id;
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            input = e.target.closest('input[data-action="quantity"]');

            if (input) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            newQuantity = Number.parseInt(input.value) || 1;
            el = input;
            itemEl = null;

          case 6:
            if (!el) {
              _context3.next = 13;
              break;
            }

            if (!(el.dataset && el.dataset.id)) {
              _context3.next = 10;
              break;
            }

            itemEl = el;
            return _context3.abrupt("break", 13);

          case 10:
            el = el.previousElementSibling || el.parentElement;
            _context3.next = 6;
            break;

          case 13:
            if (itemEl) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return");

          case 15:
            id = itemEl.dataset.id;
            _context3.prev = 16;
            _context3.next = 19;
            return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').update(id, {
              quantity: Math.max(1, newQuantity)
            }));

          case 19:
            window.dispatchEvent(new CustomEvent('cart-updated'));
            _context3.next = 25;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](16);
            console.error('Failed to update quantity:', _context3.t0);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[16, 22]]);
  });
}

function updateQuantity(change, id) {
  var itemEl, sibling, input, current, newQty;
  return regeneratorRuntime.async(function updateQuantity$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          itemEl = document.querySelector("[data-id=\"".concat(id, "\"]"));

          if (itemEl) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return");

        case 4:
          sibling = itemEl.nextElementSibling;
          input = null;

        case 6:
          if (!sibling) {
            _context4.next = 13;
            break;
          }

          input = sibling.querySelector && sibling.querySelector('input[data-action="quantity"]');

          if (!input) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("break", 13);

        case 10:
          sibling = sibling.nextElementSibling;
          _context4.next = 6;
          break;

        case 13:
          if (input) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return");

        case 15:
          current = Number.parseInt(input.value) || 1;
          newQty = Math.max(1, current + change);
          input.value = newQty;
          _context4.next = 20;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').update(id, {
            quantity: newQty
          }));

        case 20:
          window.dispatchEvent(new CustomEvent('cart-updated'));
          _context4.next = 26;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          console.error('Failed to update quantity:', _context4.t0);

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 23]]);
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
});
//# sourceMappingURL=cart.dev.js.map
