"use strict";

var _productCard = require("../components/product-card.js");

var _pocketbase = require("../api/pocketbase.js");

var _products = require("./products.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ProductDetail =
/*#__PURE__*/
function (_ProductCard) {
  _inherits(ProductDetail, _ProductCard);

  function ProductDetail(productData) {
    var _this;

    _classCallCheck(this, ProductDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProductDetail).call(this, productData));
    _this.productData = productData;
    _this.isWhitelisted = false;
    return _this;
  }

  _createClass(ProductDetail, [{
    key: "addToCart",
    value: function addToCart(product) {
      var quantity,
          userId,
          productId,
          existing,
          _args = arguments;
      return regeneratorRuntime.async(function addToCart$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              quantity = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
              _context.prev = 1;

              if (_pocketbase.pb.authStore.isValid) {
                _context.next = 5;
                break;
              }

              window.location.href = "auth.html";
              return _context.abrupt("return");

            case 5:
              userId = _pocketbase.pb.authStore.model.id;
              productId = product.id;
              _context.next = 9;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection("cart").getFirstListItem("user=\"".concat(_pocketbase.pb.authStore.model.id, "\" && product=\"").concat(productId, "\""))["catch"](function () {
                return null;
              }));

            case 9:
              existing = _context.sent;

              if (!existing) {
                _context.next = 15;
                break;
              }

              _context.next = 13;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection("cart").update(existing.id, {
                quantity: existing.quantity + quantity
              }));

            case 13:
              _context.next = 17;
              break;

            case 15:
              _context.next = 17;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection("cart").create({
                user: userId,
                product: product.id,
                quantity: quantity
              }));

            case 17:
              this.showToast("Added to cart!");
              window.dispatchEvent(new CustomEvent("product-added-to-cart", {
                detail: this
              }));
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](1);
              console.error("Error adding to cart:", _context.t0);
              this.showToast("Failed to add to cart");

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 21]]);
    }
  }, {
    key: "addWhitelist",
    value: function addWhitelist() {
      this.isWhitelisted = !this.isWhitelisted;
      var btn = document.querySelector(".white-list");

      if (this.isWhitelisted) {
        btn.textContent = "♥";
      } else {
        btn.textContent = "♡";
      }

      btn.classList.toggle("active", this.isWhitelisted);
      this.showToast(this.isWhitelisted ? "Added to Whitelist" : "Removed from Whitelist");
    }
  }, {
    key: "getProduct",
    value: function getProduct() {
      var urlParams, productId, product, relatedRecords, productData, relatedProducts;
      return regeneratorRuntime.async(function getProduct$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              urlParams = new URLSearchParams(window.location.search);
              productId = urlParams.get("id");

              if (productId) {
                _context2.next = 5;
                break;
              }

              console.error("Product ID not found in URL");
              return _context2.abrupt("return");

            case 5:
              _context2.prev = 5;
              _context2.next = 8;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection('products').getOne(productId));

            case 8:
              product = _context2.sent;
              _context2.next = 11;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection('products').getList(1, 4, {
                filter: "category = \"".concat(product.category, "\" && id != \"").concat(productId, "\"")
              }));

            case 11:
              relatedRecords = _context2.sent;
              productData = product;
              relatedProducts = relatedRecords.items;
              this.renderProduct(product, relatedProducts || []);
              this.setupEventListeners(product, relatedProducts || []);
              _context2.next = 22;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](5);
              console.error("Error fetching product:", _context2.t0);
              this.showToast("Failed to fetch product");

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[5, 18]]);
    }
  }, {
    key: "displayUserName",
    value: function displayUserName() {
      var user = this.getCurrentUser();
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
  }, {
    key: "getCurrentUser",
    value: function getCurrentUser() {
      return _pocketbase.pb.authStore.model;
    }
  }, {
    key: "logOut",
    value: function logOut() {
      _pocketbase.pb.authStore.clear();

      window.location.href = 'index.html';
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners(product, relatedProducts) {
      var _this2 = this;

      var addToCartBtn = document.querySelector(".btn-add-cart");
      var qtyInput = document.querySelector('.qty-input');
      addToCartBtn.addEventListener("click", function () {
        var quantity = parseInt(qtyInput.value) || 1;

        _this2.addToCart(product, quantity);
      }); // for related products

      var relProducts = document.querySelector('.related-products-grid');
      relProducts.addEventListener('click', function (e) {
        var btn = e.target.closest('.cart-btn');

        if (btn) {
          var id = btn.dataset.id;
          var relatedProduct = relatedProducts.find(function (p) {
            return p.id === id;
          });

          if (relatedProduct) {
            _this2.addToCart(relatedProduct, 1);
          }
        }
      });
      document.querySelectorAll('.qty-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var currentQty = parseInt(qtyInput.value) || 1;

          if (btn.textContent === '+') {
            currentQty += 1;
          } else if (btn.textContent === '-' && currentQty > 1) {
            currentQty -= 1;
          }

          qtyInput.value = currentQty;
        });
      });
      var wishlistBtn = document.querySelector('.white-list');
      wishlistBtn.addEventListener('click', function () {
        _this2.addWhitelist(wishlistBtn);
      });
      var tabButtons = document.querySelectorAll('.tab-btn');
      var tabPanes = document.querySelectorAll('.tab-pane');
      tabButtons.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
          tabButtons.forEach(function (b) {
            return b.classList.remove('active');
          });
          tabPanes.forEach(function (pane) {
            return pane.classList.remove('active');
          });
          btn.classList.add('active');
          tabPanes[index].classList.add('active');
        });
      });

      function copyToClipboard(text) {
        var _this3 = this;

        navigator.clipboard.writeText(text).then(function () {
          _this3.showToast('Product link copied to clipboard!');
        })["catch"](function (err) {
          console.error('Failed to copy: ', err);
        });
      }

      var copy = document.querySelector('.copy');
      copy.addEventListener('click', function () {
        var url = 'http://127.0.0.1:5500/';
        var textToCopy = "".concat(url, "product-detail.html?id=").concat(product.id);
        copyToClipboard(textToCopy);
      });
    }
  }, {
    key: "renderProduct",
    value: function renderProduct(product, relatedProducts) {
      var main = document.querySelector(".main-content");

      var getImgUrl = function getImgUrl(item) {
        return item.image ? _pocketbase.pb.files.getURL(item, item.image) : '/assest/images/placeholder.png';
      };

      var relatedHtml = relatedProducts.length > 0 ? relatedProducts.map(function (prod) {
        return "\n                <a href=\"product-detail.html?id=".concat(prod.id, "\">\n                    <div class=\"product-card\"\">\n                        <div class=\"product-image-container\">\n                            <img src=").concat(getImgUrl(prod), " alt=\"").concat(prod.name, "\">\n                            <div class=\"product-actions\">\n                                <button class=\"cart-btn\" data-id=\"").concat(prod.id, ">Add to Cart\n                                <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n                                <path d=\"M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z\" stroke=\"currentColor\" stroke-width=\"2\"/>\n                                <circle cx=\"7\" cy=\"18\" r=\"1\" fill=\"currentColor\"/>\n                                <circle cx=\"16\" cy=\"18\" r=\"1\" fill=\"currentColor\"/>\n                                </svg>\n                                </button>\n                            </div>\n                        </div>\n                        <div class=\"product-info\">\n                            <div class=\"product-category\">").concat(prod.category, "</div>\n                            <div class=\"product-name\">").concat(prod.name, "</div>\n                            <div class=\"product-rating\">\n                                <span class=\"rating-value\">").concat(prod.rating, "</span>\n                            </div>\n                            <div class=\"product-price\">\n                                <span class=\"current-price\">").concat(prod.price, "</span>\n                            </div>\n                        </div>\n                    </div>\n                </a>\n                ");
      }).join('') : '<p>No related products found.</p>';
      main.innerHTML = "\n            <div class=\"breadcrumb\">\n                <a href=\"dashboard.html\">Home</a>\n                <span>/</span>\n                <a href=\"products.html\">Products</a>\n                <span>/</span>\n                <span class=\"current\">".concat(product.name, "</span>\n            </div>\n\n            <div class=\"product-detail-layout\">\n                <div class=\"product-images\">\n                    <div class=\"main-image\">\n                        <img src=\"").concat(getImgUrl(product), "\" alt=\"ProductName\">\n                    </div>\n                </div>\n\n                <div class=\"product-details\">\n                    <div class=\"product-header\">\n                        <div>\n                            <h1 class=\"product-title\">").concat(product.name, "</h1>\n                            <div class=\"product-rating-detail\">\n                                <div class=\"star\">").concat(new _productCard.ProductCard(product).generateStars(), "</div>\n                                <span class=\"rating-text\">").concat(product.rating, "</span>\n                            </div>\n                        </div>\n                        <div class=\"product-actions-header\">\n                            <button class=\"icon-btn white-list\">\u2661</button>\n                            <button class=\"icon-btn\" copy>\uD83D\uDD17</button>\n                        </div>\n                    </div>\n\n                    <div class=\"product-price-detail\">\n                        <span class=\"current-price\">").concat(product.price, "</span>\n                        <span class=\"original-price\">").concat(product.originalPrice, "</span>\n                        <span class=\"save-badge\">Save ").concat(product.originalPrice - product.price, "</span>\n                    </div>\n\n                    <p class=\"product-description\">").concat(product.description, " </p>\n\n\n                    <div class=\"product-purchase\">\n                        <div class=\"quantity-selector\">\n                            <button class=\"qty-btn\">-</button>\n                            <input type=\"number\" value=\"1\" min=\"1\" title=\"qty-btn\" class=\"qty-input\"/>\n                            <button class=\"qty-btn\">+</button>\n                        </div>\n                        <button class=\"btn-add-cart\">Add to Cart \n                            <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n                            <path d=\"M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z\" stroke=\"currentColor\" stroke-width=\"2\"/>\n                            <circle cx=\"7\" cy=\"18\" r=\"1\" fill=\"currentColor\"/>\n                            <circle cx=\"16\" cy=\"18\" r=\"1\" fill=\"currentColor\"/></svg>\n                        </button>\n                    </div>\n\n                    <div class=\"product-info-section\">\n                        <div class=\"info-item\">\n                            <span class=\"info-label\">Stock:</span>\n                            <span class=\"info-value in-stock\">").concat(product.quantity > 0 ? "In Stock" : "Out of Stock", "</span>\n                        </div>\n                        <div class=\"info-item\">\n                            <span class=\"info-label\">Warranty:</span>\n                            <span class=\"info-value\">2 Years</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"product-tabs\">\n                <div class=\"tabs-header\">\n                    <button class=\"tab-btn active\">Reviews</button>\n                    <button class=\"tab-btn\">Shipping Info</button>\n                </div>\n                <div class=\"tabs-content\">\n                    <div id=\"reviews\" class=\"tab-pane active\">\n                        <div class=\"reviews-section\">\n                            <div class=\"reviews-summary\">\n                                <div class=\"overall-rating\">\n                                    <div class=\"rating-number\">").concat(product.rating, "</div>\n                                    <div class=\"rating-stars\">").concat(new _productCard.ProductCard(product).generateStars(), "</div>\n                                    <div class=\"reviews-count\">Based on ").concat(product.reviews, " reviews</div>\n                                </div>\n                                <button class=\"write-review-btn btn\">Write Review</button>\n                            </div>\n                            <div class=\"review-item\">\n                                <div class=\"review-header\">\n                                    <strong></strong>\n                                    <span class=\"review-date\"></span>\n                                </div>\n                                <div class=\"review-rating\"></div>\n                                <p class=\"review-text\"></p>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"shipping\" class=\"tab-pane\">\n                        <div class=\"shipping-info\">\n                            <h3>Free Shipping</h3>\n                            <p>Free delivery on orders over $50. Estimated delivery: 3-5 business days.</p>\n                            <h3>Returns</h3>\n                            <p>30-day return policy. Free returns for unwanted items in original condition.</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <section class=\"related-products\">\n                <h2 class=\"section-title\">You Might Also Like</h2>\n                <div class=\"related-products-grid\">\n                ").concat(relatedHtml, "\n            </div>\n            </section>\n        ");
    }
  }]);

  return ProductDetail;
}(_productCard.ProductCard);

var detail = new ProductDetail();
document.addEventListener("DOMContentLoaded", function () {
  detail.getProduct();
  detail.displayUserName();
}); // Event listeners 

var home = document.querySelector('.logo-text');
home.addEventListener('click', function () {
  window.location.href = '/public/index.html';
});
var logOutBtn = document.querySelector('.log-out');
logOutBtn.addEventListener('click', function () {
  detail.logOut();
});
var check = document.querySelector('.dashboard, .cart, .orders, .analytics, .settings');

if (check) {
  check.addEventListener('click', function () {
    if (!(0, _pocketbase.isAuthenticated)()) {
      window.location.href = '/public/auth/auth.html';
    }
  });
}
//# sourceMappingURL=product-detail.dev.js.map
