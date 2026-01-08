"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartItem = void 0;

var _modal = require("../components/modal.js");

var _pocketbase = require("../api/pocketbase.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CartItem =
/*#__PURE__*/
function () {
  function CartItem() {
    _classCallCheck(this, CartItem);
  }

  _createClass(CartItem, [{
    key: "remove",
    value: function remove(element) {
      var _this = this;

      var config = {
        title: "Remove Item",
        message: "Are you sure you want to remove this item from your cart?",
        confirmText: "Remove",
        cancelText: "Cancel",
        onConfirm: function onConfirm() {
          return regeneratorRuntime.async(function onConfirm$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!element) {
                    _context.next = 11;
                    break;
                  }

                  _context.prev = 1;
                  _context.next = 4;
                  return regeneratorRuntime.awrap(_pocketbase.pb.collection('cart')["delete"](element.dataset.id));

                case 4:
                  element.classList.add("removing");
                  setTimeout(function () {
                    element.remove();

                    _this.updateCart();
                  }, 300);
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  console.error('Failed to delete cart item:', _context.t0);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, null, null, [[1, 8]]);
        },
        onCancel: function onCancel() {
          var modal = document.querySelector(".modal");

          if (modal) {
            modal.classList.remove("show");
            setTimeout(function () {
              return modal.remove();
            }, 300);
          }
        }
      };
      var modal = new _modal.Modal(config);
      modal.show();
    }
  }, {
    key: "updateCart",
    value: function updateCart() {
      window.dispatchEvent(new CustomEvent("cart-updated"));
    }
  }, {
    key: "showToast",
    value: function showToast(message) {
      var toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(function () {
        return toast.classList.add("show");
      }, 10);
      setTimeout(function () {
        toast.classList.remove("show");
        setTimeout(function () {
          return toast.remove();
        }, 300);
      }, 3000);
    }
  }]);

  return CartItem;
}();

exports.CartItem = CartItem;
//# sourceMappingURL=cart-item.dev.js.map
