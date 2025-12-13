"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductCard = void 0;

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

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
    this.image = product.image;
    this.category = product.category;
    this.rating = product.rating;
    this.reviews = product.reviews;
    this.badge = product.badge;
    this.description = product.description;
    this.stock = product.stock;
    this.isFeature = product.isFeature;
    this.isWhitelisted = product.isWhitelisted || false;
  }

  _createClass(ProductCard, [{
    key: "render",
    value: function render() {
      var card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.id = this.id;
      card.innerHTML = "\n        ".concat(this.badge ? "<div class=\"product-badge\">".concat(this.badge, "</div>") : '', "\n        <button class=\"whitelist-btn ").concat(this.isWhitelisted ? 'whitelisted' : '', "\" \n        data-action='whitelist'>  ").concat(this.isWhitelisted ? "♥" : "♡", "</button>\n        <div class=\"product-image\" style=\"background: ").concat(this.image, ";\"></div>\n        <div class=\"product-info\">\n            <div class=\"product-category\">").concat(this.category, "</div>\n            <h3 class=\"product-name\">").concat(this.name, "</h3>\n            <div class=\"product-rating\">\n                <span class=\"stars\">").concat(this.generateStars(), "</span>\n                <span class=\"rating-count\">").concat(this.rating, " (").concat(this.reviews, ")</span>\n            </div>\n            <div class=\"product-footer\">\n                <div class=\"product-price\">\n                    <span class=\"price-current\">$").concat(this.price.toFixed(2), "</span>\n                        ").concat(this.originalPrice ? "<span class=\"price-original\">$".concat(this.originalPrice.toFixed(2), "</span>") : "", "\n                </div>\n                <button class=\"add-to-cart-btn\" data-action=\"add-to-cart\">\n                    <span class=\"cart-icon\">\uD83D\uDED2</span>\n                </button>\n            </div>\n        </div>\n        ");
      this.attachEventListeners(card);
      return card;
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

        if (action === 'add-to-cart') {
          e.preventDefault();

          _this.addToCart();
        } else if (action === 'whitelist') {
          e.preventDefault();

          _this.whitelist();
        } else {
          window.location.href = "product-detail.html?id=".concat(_this.id);
        }
      });
    }
  }, {
    key: "addToCart",
    value: function addToCart() {
      this.showToast('Added to cart!');
      window.dispatchEvent(new CustomEvent("product-added-to-cart", {
        detail: this
      }));
    }
  }, {
    key: "toggleWhitelist",
    value: function toggleWhitelist(element) {
      this.isWhitelisted = !this.isWhitelisted;
      var btn = element.querySelector('.whitelist-btn');
      btn.textContent = this.isWhitelisted ? "♥" : "♡";
      btn.classList.toggle('active', this.isWhitelisted);
      this.showToast(this.isWhitelisted ? 'Added to Whitelist' : 'Removed from Whitelist');
    }
  }, {
    key: "showToast",
    value: function showToast(message) {
      var toast = document.createElement('div');
      toast.className = 'toast';
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
