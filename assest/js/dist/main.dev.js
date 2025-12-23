"use strict";

// Main JavaScript for Ecommerce App
// Sample data
var categories = [{
  id: 1,
  name: "Electronics",
  count: 124,
  image: "../assest/images/image/electronics.jpg"
}, {
  id: 2,
  name: "Audio",
  count: 89,
  image: "../assest/images/image/audio.jpg"
}, {
  id: 3,
  name: "Office",
  count: 56,
  image: "../assest/images/image/office.jpg"
}, {
  id: 4,
  name: "Accessories",
  count: 142,
  image: "../assest/images/image/accesories.jpg"
}];
var featuredProducts = [{
  id: 1,
  name: "Sony WH-1000XM4 Wireless Headphones",
  category: "Mobile Phones & Accessories",
  price: 348.0,
  originalPrice: 399.0,
  rating: 4.8,
  reviews: 1234,
  image: "../assest/images/products/black-wireless-headphones-on-yellow-background.jpg",
  badge: "Sale"
}, {
  id: 2,
  name: "Apple Watch Series 8 Aluminum",
  category: "Electronics",
  price: 399.0,
  originalPrice: 429.0,
  rating: 4.9,
  reviews: 2108,
  image: "../assest/images/products/white-apple-watch.jpg",
  badge: "Sale"
}, {
  id: 3,
  name: "Fujifilm X-T4 Mirrorless Camera",
  category: "Electronics",
  price: 1699.0,
  rating: 4.8,
  reviews: 1028,
  image: "../assest/images/products/vintage-mirrorless-camera.jpg",
  badge: "New"
}, {
  id: 4,
  name: "Minimalist Leather Backpack",
  category: "Travel & Luggage",
  price: 149.0,
  originalPrice: 189.0,
  rating: 4.5,
  reviews: 542,
  image: "../assest/images/products/brown-leather-backpack.png",
  badge: "Sale"
}]; // Render categories

function renderCategories() {
  var grid = document.getElementById("categoryGrid");
  grid.innerHTML = categories.map(function (category) {
    return "\n    <a href=\"products.html?category=".concat(category.name.toLowerCase(), "\" class=\"category-card\">\n      <div class=\"category-image\">\n        <img src=\"").concat(category.image, "\" alt=\"").concat(category.name, "\" />\n      </div>\n      <div class=\"category-info\">\n        <h3 class=\"category-name\">").concat(category.name, "</h3>\n        <p class=\"category-count\">").concat(category.count, " products</p>\n      </div>\n    </a>\n  ");
  }).join("");
} // Render featured products


function renderFeaturedProducts() {
  var grid = document.getElementById("featuredProducts");
  grid.innerHTML = featuredProducts.map(function (product) {
    var discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    return "\n      <div class=\"product-card-home\">\n        ".concat(product.badge ? "<span class=\"product-badge badge-".concat(product.badge.toLowerCase(), "\">").concat(product.badge, "</span>") : "", "\n        <a href=\"product-detail.html?id=").concat(product.id, "\" class=\"product-image-home\">\n          <img src=\"").concat(product.image, "\" alt=\"").concat(product.name, "\" />\n        </a>\n        <div class=\"product-info-home\">\n          <span class=\"product-category-home\">").concat(product.category, "</span>\n          <h3 class=\"product-name-home\">").concat(product.name, "</h3>\n          <div class=\"product-rating-home\">\n            <div class=\"stars\">\n              ").concat(Array(5).fill("").map(function (_, i) {
      return "\n                <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"".concat(i < Math.floor(product.rating) ? "currentColor" : "none", "\" stroke=\"currentColor\">\n                  <path d=\"M8 1L10 6L15 6.5L11.5 10L12.5 15L8 12.5L3.5 15L4.5 10L1 6.5L6 6L8 1Z\"/>\n                </svg>\n              ");
    }).join(""), "\n            </div>\n            <span class=\"rating-text\">").concat(product.rating, " (").concat(product.reviews.toLocaleString(), ")</span>\n          </div>\n          <div class=\"product-footer-home\">\n            <div class=\"product-price-home\">\n              <span class=\"price-current\">$").concat(product.price.toFixed(2), "</span>\n              ").concat(product.originalPrice ? "<span class=\"price-original\">$".concat(product.originalPrice.toFixed(2), "</span>") : "", "\n            </div>\n            <button class=\"btn-icon\" aria-label=\"Add to cart\">\n              <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n                <path d=\"M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z\" stroke=\"currentColor\" stroke-width=\"2\"/>\n                <circle cx=\"7\" cy=\"18\" r=\"1\" fill=\"currentColor\"/>\n                <circle cx=\"16\" cy=\"18\" r=\"1\" fill=\"currentColor\"/>\n              </svg>\n            </button>\n          </div>\n        </div>\n      </div>\n    ");
  }).join("");
} // Newsletter form


document.getElementById("newsletterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = e.target.querySelector('input[type="email"]').value;
  alert("Thank you for subscribing with ".concat(email, "!"));
  e.target.reset();
}); // Sign-in redirect

document.getElementById('sign-in').addEventListener('click', function () {
  window.location.href = 'register.html';
}); // Initialize

document.addEventListener("DOMContentLoaded", function () {
  renderCategories();
  renderFeaturedProducts();
});
//# sourceMappingURL=main.dev.js.map
