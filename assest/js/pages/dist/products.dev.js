"use strict";

var _productCard = require("../components/product-card.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, [{
    key: "AddProduct",
    value: function AddProduct() {}
  }], [{
    key: "reduceCategoryList",
    value: function reduceCategoryList() {
      var category = document.querySelectorAll(".category");
      var categories = Array.from(category);
      categories.forEach(function (category, index) {
        if (index >= 10) {
          category.style.display = "none";
        }
      });
    }
  }, {
    key: "increaseCategoryList",
    value: function increaseCategoryList() {
      var category = document.querySelectorAll(".category");
      var categories = Array.from(category);
      categories.forEach(function (category, index) {
        if (index = categories.length - 1) {
          category.style.display = "flex";
        }
      });
    }
  }, {
    key: "priceRange",
    value: function priceRange() {
      var rangeMin = document.querySelector('.range-min');
      var rangeMax = document.querySelector('.range-max');
      var inputMin = document.querySelector('.input-min');
      var inputMax = document.querySelector('.input-max');
      var range = document.querySelector('.range-track');
      var sliderMinValue = parseInt(rangeMin.min);
      var sliderMaxValue = parseInt(rangeMax.max);
      var priceGap = 1000;
      rangeMin.addEventListener('input', slideMin);
      rangeMax.addEventListener('input', slideMax);
      inputMin.addEventListener('change', minInput);
      inputMax.addEventListener('change', maxInput);

      function slideMin() {
        var gap = parseInt(rangeMax.value) - parseInt(rangeMin.value);

        if (gap <= priceGap) {
          rangeMin.value = parseInt(rangeMax.value) - priceGap;
        }

        setArea();
      }

      function slideMax() {
        var gap = parseInt(rangeMax.value) - parseInt(rangeMin.value);

        if (gap <= priceGap) {
          rangeMax.value = parseInt(rangeMin.value) + priceGap;
        }

        setArea();
      }

      function setArea() {
        inputMin.value = rangeMin.value;
        inputMax.value = rangeMax.value;
        range.style.left = (rangeMin.value - sliderMinValue) / (sliderMaxValue - sliderMinValue) * 100 + "%";
        range.style.right = 100 - (rangeMax.value - sliderMinValue) / (sliderMaxValue - sliderMinValue) * 100 + "%";
      }

      function minInput() {
        var minValue = parseInt(inputMin.value);

        if (minValue < sliderMinValue) {
          inputMin.value = sliderMinValue;
        }

        minValue = parseInt(inputMin.value);
        slideMin();
      }

      function maxInput() {
        var maxValue = parseInt(inputMax.value);

        if (maxValue > sliderMaxValue) {
          inputMax.value = sliderMaxValue;
        }

        maxValue = parseInt(inputMax.value);
        slideMax();
      }
    }
  }]);

  return UI;
}(); //Event Listeners
// on page load 


window.addEventListener("DOMContentLoaded", function () {
  UI.priceRange();
  UI.reduceCategoryList();
}); // add product

document.getElementById('add-product').addEventListener('click', function (e) {
  e.preventDefault();
  UI.createProduct();
  console.log("createProduct function called");
}); // load more product

var showMore = document.getElementById('show-more-btn');
var showLess = document.getElementById('show-less-btn');
showMore.addEventListener('click', function () {
  UI.increaseCategoryList();
  showMore.style.display = "none";
  showLess.style.display = "block";
}); // show less product

showLess.addEventListener('click', function () {
  UI.reduceCategoryList();
  showMore.style.display = "block";
  showLess.style.display = "none";
});
//# sourceMappingURL=products.dev.js.map
