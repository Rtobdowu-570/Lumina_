"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartItem = void 0;

var _modal = require("../components/modal.js");

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
    value: function remove() {
      var _this = this;

      var modal = new _modal.Modal();
      var newModal = modal.show({
        title: "Remove Item",
        message: "Are you sure you want to remove this item from your cart?",
        confirmText: "Remove",
        cancelText: "Cancel",
        onConfirm: function onConfirm() {
          var element = document.querySelector("[data-id=\"".concat(_this.id, "\"]"));
          element.classList.add("removing");
          setTimeout(function () {
            element.remove();

            _this.updateCart();
          }, 300);
        }
      });
      newModal.addEventListener("click", function (e) {
        var action = e.target.dataset.action;

        if (action === "cancel") {
          modal.hide(newModal);
        }
      });
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
