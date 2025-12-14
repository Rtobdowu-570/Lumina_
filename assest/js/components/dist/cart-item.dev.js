"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CartItem =
/*#__PURE__*/
function () {
  function CartItem(data) {
    _classCallCheck(this, CartItem);

    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.price = data.price;
    this.originalPrice = data.originalPrice;
    this.quantity = data.quantity;
    this.image = data.image;
    this.color = data.color;
    this.style = data.style;
    this.rating = data.rating;
    this.reviews = data.reviews;
  }

  _createClass(CartItem, [{
    key: "render",
    value: function render() {
      var item = document.createElement("div");
      item.className = "cart-item";
      item.dataset.id = this.id;
      item.innerHTML = "\n        <div class=\"item-image\" style=\"background: ".concat(this.image, ";\"></div>\n            <div class=\"item-details\">\n                <div class=\"item-category\">").concat(this.category, "</div>\n                <h3 class=\"item-name\">").concat(this.name, "</h3>\n                <div class=\"item-meta\">\n                <span class=\"item-color\">Color: ").concat(this.color, "</span>\n                <span class=\"item-separator\">\u2022</span>\n                <span class=\"item-style\">").concat(this.style, "</span>\n            </div>\n            <div class=\"item-rating\">\n                <span class=\"stars\">").concat(this.generateStars(), "</span>\n                <span class=\"rating-count\">").concat(this.rating, " (").concat(this.reviews, ")</span>\n            </div>\n        </div>\n        <div class=\"item-actions\">\n            <button class=\"wishlist-btn\" data-action=\"whitelist\">\u2661</button>\n            <button class=\"remove-btn\" data-action=\"remove\">\uD83D\uDDD1\uFE0F</button>\n        </div>\n        <div class=\"item-quantity\">\n            <button class=\"qty-btn\" data-action=\"decrease\">\u2212</button>\n            <input type=\"number\" value=\"").concat(this.quantity, "\" min=\"1\" data-action=\"quantity\">\n            <button class=\"qty-btn\" data-action=\"increase\">+</button>\n        </div>\n        <div class=\"item-price\">\n            <div class=\"price-current\">$").concat(this.price.toFixed(2), "</div>\n            ").concat(this.originalPrice ? "<div class=\"price-original\">$".concat(this.originalPrice.toFixed(2), "</div>") : "", "\n        </div>");
      this.attachEventListeners(item);
      return item;
    }
  }, {
    key: "generateStars",
    value: function generateStars() {
      var fullStars = 5;
      fullStars = (_readOnlyError("fullStars"), Math.round(this.rating));
      var output = '';

      for (var i = 0; i <= fullStars; i++) {
        // get percentage of star to fill
        var starPercentage = i / fullStars * 100;
        var star = starPercentage;
        output += "<span class=\"star filled\" style=\"width: ".concat(star, ";\">\u2605</span>");
      }

      return output;
    }
  }, {
    key: "attachEventListeners",
    value: function attachEventListeners(element) {
      var _this = this;

      element.addEventListener('click', function (e) {
        var action = e.target.dataset.action;

        if (action === "increase") {
          _this.updateQuantity(1);
        } else if (action === "decrease") {
          _this.updateQuantity(-1);
        } else if (action === "remove") {
          _this.remove();
        } else if (action === "wishlist") {
          _this.addToWishlist();
        } else if (action === "remove") {
          _this.remove();
        }
      });
      var quantityInput = element.querySelector('[data-action="quantity]');
      quantityInput.addEventListener('change', function (e) {
        var newQuantity = Number.parseInt(e.target.value);

        if (newQuantity > 0) {
          _this.quantity = newQuantity;

          _this.updateCart();
        } else {
          e.target.value = _this.quantity;
        }
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      var Modal = window.Modal;
      var modal = new Modal({
        title: "Remove Item",
        message: "Are you sure you want to remove this item from your cart?",
        confirmText: "Remove",
        cancelText: "Cancel",
        onConfirm: function onConfirm() {
          var element = document.querySelector("[data-id=\"".concat(_this2.id, "\"]"));
          element.classList.add("removing");
          setTimeout(function () {
            element.remove();

            _this2.updateCart();
          }, 300);
        }
      });
      modal.show();
    }
  }, {
    key: "updateCart",
    value: function updateCart() {
      window.dispatchEvent(new CustomEvent("cart-updated"));
    }
  }, {
    key: "updateQuantity",
    value: function updateQuantity(change) {
      this.quantity = Math.max(1, this.quantity + change);
      var element = document.querySelector("[data-id=".concat(this.id));
      var input = element.querySelector('input[data-action="quantity"]');
      input.value = this.quantity;
      this.updateCart();
    }
  }, {
    key: "addToWishlist",
    value: function addToWishlist() {
      var button = document.querySelector("[data-id=".concat(this.id, "], wishlist-btn"));
      button.textContent = "♥";
      button.style.color = "#ef4444";
      this.showToast('Added to Whitelist');
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
//# sourceMappingURL=cart-item.dev.js.map
