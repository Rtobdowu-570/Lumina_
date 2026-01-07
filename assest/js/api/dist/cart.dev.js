"use strict";

function loadCart() {
  var cartItems, cartContainer, total, totalElement;
  return regeneratorRuntime.async(function loadCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pb.collection('cart').getFullList({
            filter: "user = \"".concat(pb.authStore.model.id, "\""),
            expand: 'product'
          }));

        case 3:
          cartItems = _context.sent;
          cartContainer = document.querySelector('.cart-items');
          cartContainer.innerHTML = '';
          total = 0;
          cartItems.forEach(function (item) {
            var product = item.expand.product;
            var itemTotal = product.price * item.quantity;
            total += itemTotal;
            var cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = "\n                <img src=\"".concat(product.imageUrl, "\" alt=\"").concat(product.name, "\" />\n                <div class=\"item-details\">\n                    <h4>").concat(product.name, "</h4>\n                    <p>Quantity: ").concat(item.quantity, "</p>\n                    <p>Price: $").concat(itemTotal.toFixed(2), "</p>\n                </div>\n            ");
            cartContainer.appendChild(cartItem);
          });
          totalElement = document.querySelector('.cart-total');
          totalElement.textContent = "Total: $".concat(total.toFixed(2));
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("Error loading cart:", _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}
//# sourceMappingURL=cart.dev.js.map
