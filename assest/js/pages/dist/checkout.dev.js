"use strict";

var _pocketbase = require("../api/pocketbase.js");

var _modal = require("../components/modal.js");

var _cartItem = require("../components/cart-item.js");

var cartItem = new _cartItem.CartItem();

function showPaymentModal() {
  var PaymentModal = {
    title: "Payment",
    message: "Are you sure you want to proceed to payment?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: function onConfirm() {
      var user, cartRecord, last, toTal, cartItemIds, data, checkoutRecord, modal;
      return regeneratorRuntime.async(function onConfirm$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cartItem.showToast('Payment successful');
              user = getCurrentUser().id;
              _context.next = 4;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').getFullList({
                filter: "user = \"".concat(getCurrentUser().id, "\"")
              }));

            case 4:
              cartRecord = _context.sent;
              last = document.querySelector('.last');
              toTal = last;
              console.log(toTal);
              cartItemIds = cartRecord.map(function (record) {
                return record.id;
              });
              data = {
                "items": cartItemIds,
                "user": user,
                "successful": true,
                "failed": false,
                "total": toTal
              };
              _context.next = 12;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection('checkout').create(data));

            case 12:
              checkoutRecord = _context.sent;
              cartItem.showToast("Payment Successful! Order Created.");
              modal = document.querySelector(".modal");

              if (modal) {
                modal.classList.remove("show");
                setTimeout(function () {
                  return modal.remove();
                }, 300);
              }

            case 16:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    onCancel: function onCancel() {
      cartItem.showToast('Payment failed');
      var modal = document.querySelector(".modal");

      if (modal) {
        modal.classList.remove("show");
        setTimeout(function () {
          return modal.remove();
        }, 300);
      }
    }
  };
  var modal = new _modal.Modal(PaymentModal);
  modal.show();
}

function ValidateInput() {
  var inputs = Array.from(document.querySelectorAll('input:not([type="hidden"])'));
  var completeBtn = document.querySelector('.complete');
  if (!completeBtn) return;

  function validate() {
    var hasEmpty = inputs.some(function (i) {
      return !i.value || i.value.trim() === '';
    });
    completeBtn.disabled = hasEmpty;

    if (!hasEmpty) {
      completeBtn.classList.add('ready-pulse');
      completeBtn.innerHTML = 'Complete Payment ✓';
    } else {
      completeBtn.classList.remove('ready-pulse');
      completeBtn.innerHTML = 'Complete Payment';
    }

    return hasEmpty;
  }

  inputs.forEach(function (i) {
    return i.addEventListener('input', validate);
  });
  validate();
  completeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showPaymentModal();
  });
}

function getProductAddedToCart() {
  var shippingRate,
      data,
      orderContent,
      first,
      second,
      third,
      last,
      subtotal,
      shipping,
      TAX_RATE,
      tax,
      total,
      _args2 = arguments;
  return regeneratorRuntime.async(function getProductAddedToCart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          shippingRate = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 0.001;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart').getFullList({
            filter: "user = \"".concat(getCurrentUser().id, "\""),
            expand: 'product'
          }));

        case 3:
          data = _context2.sent;
          orderContent = document.querySelector('.order-items');
          first = document.querySelector('.first');
          second = document.querySelector('.second');
          third = document.querySelector('.third');
          last = document.querySelector('.last');
          subtotal = 0;
          shipping = 0;
          TAX_RATE = 0.0005;
          orderContent.innerHTML = '';
          data.forEach(function (pd) {
            var productData = pd.expand.product;
            var itemTotal = productData.price * pd.quantity;
            subtotal += itemTotal;
            shipping += productData.price * shippingRate * pd.quantity;
            orderContent.innerHTML += "\n            <div class=\"order-item\">\n                <div class=\"item-info\">\n                    <span class=\"item-name\">".concat(productData.name, "</span>\n                    <span class=\"item-qty\">Qty: ").concat(pd.quantity, "</span>\n                </div>\n                <span class=\"item-price\">$").concat(itemTotal.toFixed(2), "</span>\n            </div>\n        ");
          });
          tax = subtotal * TAX_RATE;
          total = subtotal + shipping + tax;
          if (first) first.textContent = subtotal.toFixed(2);
          if (second) second.textContent = shipping.toFixed(2);
          if (third) third.textContent = tax.toFixed(2);
          if (last) last.textContent = total.toFixed(2);

        case 20:
        case "end":
          return _context2.stop();
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
  checkAuth();
  displayUsername();
  ValidateInput();
  getProductAddedToCart();
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
var options = document.querySelectorAll('[data-fee]');
options.forEach(function (option) {
  option.addEventListener('click', function () {
    var feeValue = option.dataset.fee.toLowerCase();
    document.querySelectorAll('[data-fee]').forEach(function (o) {
      return o.classList.remove('active');
    });
    option.classList.add('active');

    if (feeValue === 'standard') {
      getProductAddedToCart(0.001);
    } else if (feeValue === 'express') {
      getProductAddedToCart(0.004);
    } else if (feeValue === 'overnight') {
      getProductAddedToCart(0.007);
    }
  });
});
var goBack = document.querySelector('.return');
goBack.addEventListener('click', function () {
  window.location.href = '/public/cart.html';
});
//# sourceMappingURL=checkout.dev.js.map
