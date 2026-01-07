"use strict";

var _cartItem = require("../components/cart-item.js");

var _dashboard = require("../pages/dashboard.js");

function displayCart() {
  var userId, data, cartContainer;
  return regeneratorRuntime.async(function displayCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = (0, _dashboard.getCurrentUser)();
          _context.next = 3;
          return regeneratorRuntime.awrap(pb.collection('cart').getFullList({
            filter: "user = '".concat(userId, "'"),
            expand: 'product'
          }));

        case 3:
          data = _context.sent;
          cartContainer = document.querySelector('#cart-items');
          cartContainer.innerHTML = '';
          data.forEach(function (item) {
            productData = item.expand.product;
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}
//# sourceMappingURL=cart.dev.js.map
