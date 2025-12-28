"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductCard = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProductCard =
/*#__PURE__*/
function () {
  function ProductCard(product) {
    _classCallCheck(this, ProductCard);

    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = "http://127.0.0.1:8090/api/files/products/".concat(product.id, "/").concat(product.image);
    this.category = product.category.toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, 'and');
    this.rating = product.rating || 0;
    this.reviews = product.reviews || 0;
    this.badge = product.badge;
    this.description = product.description;
    this.quantity = product.quantity;
    this.isFeatured = product.isFeatured || false;
    this.isWhitelisted = product.isWhitelisted || false;
    this.originalPrice = product.originalPrice;
  }

  _createClass(ProductCard, [{
    key: "render",
    value: function render() {
      var card = document.createElement("div");
      card.className = "product-cards";
      card.dataset.id = this.id;
      card.dataset.category = this.category;
      card.dataset.price = this.price;
      card.innerHTML = "\n          <div class=\"product-card-home\">\n        ".concat(this.quantity > 0 ? "<span class=\"product-badge badge-sale\">Sale</span>" : "<span class=\"product-badge badge-sold-out\">Sold Out</span>", "\n\n        <button class=\"whitelist-btn ").concat(this.isWhitelisted ? "active" : "", "\" data-action=\"whitelist\">\n            ").concat(this.isWhitelisted ? "♥" : "♡", "\n        </button>\n\n        <a href=\"product-detail.html?id=").concat(this.id, "\" class=\"product-image-home\">\n          <img src=\"").concat(this.image, "\" alt=\"").concat(this.name, "\" />\n        </a>\n        <div class=\"product-info-home\">\n          <span class=\"product-category-home\">").concat(this.category, "</span>\n          <h3 class=\"product-name-home\">").concat(this.name, "</h3>\n          <div class=\"product-rating\">\n                <span class=\"stars\">").concat(this.generateStars(), "</span>\n                <span class=\"rating-count\">").concat(this.rating, " (").concat(this.reviews, ") reviews</span>\n            </div>\n          <div class=\"product-footer-home\">\n            <div class=\"product-price-home\">\n              <span class=\"price-current\" data-price=\"").concat(this.price, "\">$").concat(this.price.toFixed(2), "</span>\n              ").concat(this.originalPrice ? "<span class=\"price-original\">$".concat(this.originalPrice.toFixed(2), "</span>") : "", "\n            </div>\n            <button class=\"btn-icon\" aria-label=\"Add to cart\" data-action=\"add-to-cart\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n                <path d=\"M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z\" stroke=\"currentColor\" stroke-width=\"2\"/>\n                <circle cx=\"7\" cy=\"18\" r=\"1\" fill=\"currentColor\"/>\n                <circle cx=\"16\" cy=\"18\" r=\"1\" fill=\"currentColor\"/>\n              </svg>\n            </button>\n          </div>\n        </div>\n      </div>");
      this.attachEventListeners(card);
      return card;
    }
  }, {
    key: "generateStars",
    value: function generateStars() {
      var output = '';

      for (var i = 0; i < 5; i++) {
        if (i < Math.floor(this.rating)) {
          output += "<span class=\"star filled\">\u2605</span>";
        } else if (i < this.rating) {
          output += "<span class=\"star half\">\u2605</span>";
        } else {
          output += "<span class=\"star\">\u2606</span>";
        }
      }

      return output;
    }
  }, {
    key: "attachEventListeners",
    value: function attachEventListeners(element) {
      var _this = this;

      element.addEventListener("click", function (e) {
        var btn = e.target.closest('button');
        var action = btn ? btn.dataset.action : null;

        if (action === "add-to-cart") {
          e.stopPropagation();

          _this.addToCart();
        } else if (action === "whitelist") {
          e.stopPropagation();

          _this.whitelist(element);
        } else {
          window.location.href = "product-detail.html?id=".concat(_this.id);
        }
      });
    }
  }, {
    key: "addToCart",
    value: function addToCart() {
      this.showToast("Added to cart!");
      window.dispatchEvent(new CustomEvent("product-added-to-cart", {
        detail: this
      }));
    }
  }, {
    key: "whitelist",
    value: function whitelist(cardElement) {
      this.isWhitelisted = !this.isWhitelisted;
      var btn = cardElement.querySelector(".whitelist-btn");
      btn.textContent = this.isWhitelisted ? "♥" : "♡";
      btn.classList.toggle("active", this.isWhitelisted);
      this.showToast(this.isWhitelisted ? "Added to Whitelist" : "Removed from Whitelist");
    }
  }, {
    key: "toggleWhitelist",
    value: function toggleWhitelist(element) {
      if (!element) return;
      this.isWhitelisted = !this.isWhitelisted;
      var btn = element.querySelector(".whitelist-btn");
      btn.textContent = this.isWhitelisted ? "♥" : "♡";
      btn.classList.toggle("active", this.isWhitelisted);
      this.showToast(this.isWhitelisted ? "Added to Whitelist" : "Removed from Whitelist");
    }
  }, {
    key: "showToast",
    value: function showToast(message) {
      var toast = document.createElement("div");
      toast.className = "toast";
      toast.innerText = message;
      document.body.appendChild(toast);
      setTimeout(function () {
        toast.remove();
      }, 2000);
    }
  }]);

  return ProductCard;
}();

exports.ProductCard = ProductCard;
//# sourceMappingURL=product-card.dev.js.map
