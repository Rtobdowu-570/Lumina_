"use strict";

var _productCard = require("../components/product-card.js");

var _pocketbase = require("../api/pocketbase.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, [{
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
    key: "addProduct",
    value: function addProduct() {
      var overlay, card, header, headerContent, iconSvg, iconPath, iconDiv, titleDiv, title, description, closeButton, closeSvg, line1, line2, content, form, nameGroup, nameLabel, nameInput, imageGroup, imageLabelOuter, uploadContainer, uploadLabel, uploadSvg, rect, circle, polyline, uploadText, uploadSubtext, fileInput, categoryGroup, categoryLabel, categorySelect, defaultOption, categories, row, priceGroup, priceLabel, priceWrapper, priceSymbol, priceInput, quantityGroup, quantityLabel, quantityInput, descGroup, descLabel, optionalSpan, textarea, actions, submitBtn, cancelBtn;
      return regeneratorRuntime.async(function addProduct$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              overlay = document.createElement('div');
              overlay.className = 'product-form-overlay';
              card = document.createElement('div');
              card.className = 'product-form-card';
              header = document.createElement('div');
              header.className = 'product-form-header';
              headerContent = document.createElement('div');
              headerContent.className = 'product-form-header-content';
              iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              iconSvg.setAttribute('width', '24');
              iconSvg.setAttribute('height', '24');
              iconSvg.setAttribute('viewBox', '0 0 24 24');
              iconSvg.setAttribute('fill', 'none');
              iconSvg.setAttribute('stroke', 'currentColor');
              iconSvg.setAttribute('stroke-width', '2');
              iconSvg.setAttribute('stroke-linecap', 'round');
              iconSvg.setAttribute('stroke-linejoin', 'round');
              iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              iconPath.setAttribute('d', 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z');
              iconSvg.appendChild(iconPath);
              iconDiv = document.createElement('div');
              iconDiv.className = 'product-form-icon';
              iconDiv.appendChild(iconSvg);
              titleDiv = document.createElement('div');
              title = document.createElement('h2');
              title.className = 'product-form-title';
              title.textContent = 'Add New Product';
              description = document.createElement('p');
              description.className = 'product-form-description';
              description.textContent = 'Fill in the details to add a product to your store';
              titleDiv.append(title, description);
              headerContent.append(iconDiv, titleDiv);
              closeButton = document.createElement('button');
              closeButton.className = 'product-form-close';
              closeButton.type = 'button';
              closeButton.setAttribute('aria-label', 'Close');
              closeButton.addEventListener('click', function () {
                var overlay = document.querySelector('.product-form-overlay');
                overlay.classList.remove('active');
              });
              closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              closeSvg.setAttribute('width', '24');
              closeSvg.setAttribute('height', '24');
              closeSvg.setAttribute('viewBox', '0 0 24 24');
              closeSvg.setAttribute('fill', 'none');
              closeSvg.setAttribute('stroke', 'currentColor');
              closeSvg.setAttribute('stroke-width', '2');
              closeSvg.setAttribute('stroke-linecap', 'round');
              closeSvg.setAttribute('stroke-linejoin', 'round');
              line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line1.setAttribute('x1', '18');
              line1.setAttribute('y1', '6');
              line1.setAttribute('x2', '6');
              line1.setAttribute('y2', '18');
              line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line2.setAttribute('x1', '6');
              line2.setAttribute('y1', '6');
              line2.setAttribute('x2', '18');
              line2.setAttribute('y2', '18');
              closeSvg.append(line1, line2);
              closeButton.appendChild(closeSvg);
              header.append(headerContent, closeButton);
              content = document.createElement('div');
              content.className = 'product-form-content';
              form = document.createElement('form');
              form.className = 'product-form';
              nameGroup = document.createElement('div');
              nameGroup.className = 'form-group';
              nameLabel = document.createElement('label');
              nameLabel.className = 'form-label';
              nameLabel.setAttribute('for', 'productName');
              nameLabel.textContent = 'Product Name';
              nameInput = document.createElement('input');
              nameInput.type = 'text';
              nameInput.id = 'productName';
              nameInput.className = 'form-input';
              nameInput.placeholder = 'Enter product name';
              nameInput.required = true;
              nameInput.name = 'name';
              nameGroup.append(nameLabel, nameInput);
              imageGroup = document.createElement('div');
              imageGroup.className = 'form-group';
              imageLabelOuter = document.createElement('label');
              imageLabelOuter.className = 'form-label';
              imageLabelOuter.textContent = 'Product Image';
              uploadContainer = document.createElement('div');
              uploadContainer.className = 'image-upload-container';
              uploadLabel = document.createElement('label');
              uploadLabel.className = 'image-upload-label';
              uploadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              uploadSvg.setAttribute('width', '40');
              uploadSvg.setAttribute('height', '40');
              uploadSvg.setAttribute('viewBox', '0 0 24 24');
              uploadSvg.setAttribute('fill', 'none');
              uploadSvg.setAttribute('stroke', 'currentColor');
              uploadSvg.setAttribute('stroke-width', '2');
              uploadSvg.setAttribute('stroke-linecap', 'round');
              uploadSvg.setAttribute('stroke-linejoin', 'round');
              rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              rect.setAttribute('x', '3');
              rect.setAttribute('y', '3');
              rect.setAttribute('width', '18');
              rect.setAttribute('height', '18');
              rect.setAttribute('rx', '2');
              rect.setAttribute('ry', '2');
              circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
              circle.setAttribute('cx', '8.5');
              circle.setAttribute('cy', '8.5');
              circle.setAttribute('r', '1.5');
              polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
              polyline.setAttribute('points', '21 15 16 10 5 21');
              uploadSvg.append(rect, circle, polyline);
              uploadText = document.createElement('span');
              uploadText.className = 'upload-text';
              uploadText.textContent = 'Click to upload image';
              uploadSubtext = document.createElement('span');
              uploadSubtext.className = 'upload-subtext';
              uploadSubtext.textContent = 'PNG, JPG up to 5MB';
              fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.className = 'hidden-input';
              fileInput.accept = 'image/*';
              fileInput.name = 'image';
              fileInput.addEventListener('change', function () {
                var file = fileInput.files[0];

                if (file) {
                  uploadText.textContent = file.name;
                  uploadSubtext.textContent = file.size + ' bytes';
                  uploadSvg.style.display = 'none';
                }
              });
              uploadLabel.append(uploadSvg, uploadText, uploadSubtext, fileInput);
              uploadContainer.appendChild(uploadLabel);
              imageGroup.append(imageLabelOuter, uploadContainer);
              categoryGroup = document.createElement('div');
              categoryGroup.className = 'form-group';
              categoryLabel = document.createElement('label');
              categoryLabel.className = 'form-label';
              categoryLabel.setAttribute('for', 'category');
              categoryLabel.textContent = 'Category';
              categorySelect = document.createElement('select');
              categorySelect.id = 'category';
              categorySelect.className = 'form-select';
              categorySelect.required = true;
              categorySelect.name = 'category';
              defaultOption = document.createElement('option');
              defaultOption.value = '';
              defaultOption.textContent = 'Select a category';
              categories = ['Travel & Luggage', 'Shoes & Footwear', 'Kitchen & Dining', 'Tools & Home Improvement', 'Musical Instruments', 'Arts & Crafts', 'Fitness Equipment', 'Watches', 'Bags & Handbags', 'Gardening & Outdoor Living', 'Video Games & Consoles', 'Eyewear & Sunglasses', 'Bedding & Bath', 'Camping & Hiking', 'Party Supplies', 'Appliances', 'Mobile Phones & Accessories', 'Computers & Laptops', 'Lighting & Fans', 'Men\'s Clothing', 'Women\'s Clothing', 'Kids\' Clothing', 'Skincare & Makeup', 'Vitamins & Supplements', 'Cycling & Bikes', 'Board Games & Puzzles', 'Movies & TV Shows', 'Beverages & Drinks', 'Pet Food & Treats', 'Home Storage & Organization', 'Baby Essentials', 'Fine Jewelry', 'Car Parts & Accessories', 'Stationery & School Supplies', 'Outdoor Power Equipment', 'Electronics', 'Fashion & Apparel', 'Home & Garden', 'Beauty & Personal Care', 'Health & Wellness', 'Sports & Outdoors', 'Toys & Games', 'Books & Media', 'Food & Grocery', 'Pet Supplies', 'Furniture & Decor', 'Baby & Kids', 'Jewelry & Accessories', 'Automotive', 'Office Supplies'];
              categories.forEach(function (category) {
                var option = document.createElement('option');
                option.value = category.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9-]/g, '');
                option.textContent = category;
                option.dataset.category = category;
                categorySelect.appendChild(option);
              });
              categorySelect.appendChild(defaultOption);
              categorySelect.insertBefore(defaultOption, categorySelect.firstChild);
              categoryGroup.append(categoryLabel, categorySelect);
              row = document.createElement('div');
              row.className = 'form-row';
              priceGroup = document.createElement('div');
              priceGroup.className = 'form-group';
              priceLabel = document.createElement('label');
              priceLabel.className = 'form-label';
              priceLabel.setAttribute('for', 'price');
              priceLabel.textContent = 'Price';
              priceWrapper = document.createElement('div');
              priceWrapper.className = 'price-input-wrapper';
              priceSymbol = document.createElement('span');
              priceSymbol.className = 'price-symbol';
              priceSymbol.textContent = '$';
              priceInput = document.createElement('input');
              priceInput.type = 'number';
              priceInput.id = 'price';
              priceInput.className = 'form-input price-input';
              priceInput.placeholder = '0.00';
              priceInput.step = '0.01';
              priceInput.min = '0';
              priceInput.required = true;
              priceInput.name = 'price';
              priceWrapper.append(priceSymbol, priceInput);
              priceGroup.append(priceLabel, priceWrapper);
              quantityGroup = document.createElement('div');
              quantityGroup.className = 'form-group';
              quantityLabel = document.createElement('label');
              quantityLabel.className = 'form-label';
              quantityLabel.setAttribute('for', 'quantity');
              quantityLabel.textContent = 'Quantity';
              quantityInput = document.createElement('input');
              quantityInput.type = 'number';
              quantityInput.id = 'quantity';
              quantityInput.className = 'form-input';
              quantityInput.placeholder = '0';
              quantityInput.min = '0';
              quantityInput.required = true;
              quantityInput.name = 'quantity';
              quantityGroup.append(quantityLabel, quantityInput);
              row.append(priceGroup, quantityGroup);
              descGroup = document.createElement('div');
              descGroup.className = 'form-group';
              descLabel = document.createElement('label');
              descLabel.className = 'form-label';
              descLabel.setAttribute('for', 'description');
              descLabel.textContent = 'Description';
              optionalSpan = document.createElement('span');
              optionalSpan.className = 'optional-text';
              optionalSpan.textContent = '(Optional)';
              descLabel.appendChild(optionalSpan);
              textarea = document.createElement('textarea');
              textarea.id = 'description';
              textarea.className = 'form-textarea';
              textarea.rows = 4;
              textarea.placeholder = 'Enter product description...';
              textarea.name = 'description';
              descGroup.append(descLabel, textarea);
              actions = document.createElement('div');
              actions.className = 'form-actions';
              submitBtn = document.createElement('button');
              submitBtn.type = 'submit';
              submitBtn.className = 'btn-submit';
              submitBtn.textContent = 'Add Product';
              cancelBtn = document.createElement('button');
              cancelBtn.type = 'button';
              cancelBtn.className = 'btn-cancel';
              cancelBtn.textContent = 'Cancel';
              cancelBtn.addEventListener('click', function () {
                var overlay = document.querySelector('.product-form-overlay');
                overlay.classList.remove('active');
              });
              actions.append(submitBtn, cancelBtn); // Assemble form

              form.append(imageGroup, nameGroup, categoryGroup, row, descGroup, actions);
              content.appendChild(form);
              card.append(header, content);
              overlay.appendChild(card);
              document.body.appendChild(overlay);
              form.addEventListener('submit', function _callee(e) {
                var data, formData, overlay;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        e.preventDefault();
                        data = {
                          image: fileInput.files[0],
                          name: nameInput.value,
                          category: categorySelect.value,
                          price: priceInput.value,
                          quantity: quantityInput.value,
                          description: textarea.value
                        };
                        formData = new FormData();
                        formData.append('image', data.image);
                        formData.append('name', data.name);
                        formData.append('category', data.category);
                        formData.append('price', data.price);
                        formData.append('quantity', data.quantity);
                        formData.append('description', data.description);
                        _context.prev = 9;
                        _context.next = 12;
                        return regeneratorRuntime.awrap(_pocketbase.pb.collection('products').create(formData));

                      case 12:
                        console.log('Product added successfully');
                        _context.next = 18;
                        break;

                      case 15:
                        _context.prev = 15;
                        _context.t0 = _context["catch"](9);
                        console.log('ERROR', _context.t0.details);

                      case 18:
                        overlay = document.querySelector('.product-form-overlay');
                        overlay.classList.remove('active');

                      case 20:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, null, [[9, 15]]);
              });

            case 218:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "getProducts",
    value: function getProducts() {
      var products, productsGrid;
      return regeneratorRuntime.async(function getProducts$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_pocketbase.pb.collection('products').getFullList());

            case 3:
              products = _context3.sent;
              productsGrid = document.getElementById('products-grid');

              if (productsGrid) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return");

            case 7:
              productsGrid.innerHTML = '';
              products.forEach(function (productData) {
                var productCard = new _productCard.ProductCard(productData);
                productsGrid.appendChild(productCard.render());
              });
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              console.error("Failed to load products:", _context3.t0);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "increaseCategoryList",
    value: function increaseCategoryList() {
      var category = document.querySelectorAll(".category");
      var categories = Array.from(category);
      categories.forEach(function (category, index) {
        if (index = categories.length - 1) {
          category.style.display = "block";
        } else {
          category.style.display = "none";
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
      var progress = document.querySelector('.price-slider .range-track');
      var sliderMaxValue = parseInt(rangeMax.max);
      var priceGap = 1000;

      var setArea = function setArea() {
        var leftPos = rangeMin.value / sliderMaxValue * 100;
        var rightPos = 100 - rangeMax.value / sliderMaxValue * 100;
        progress.style.left = leftPos + "%";
        progress.style.right = rightPos + "%";
      };

      function slideMin() {
        var minVal = parseInt(rangeMin.value);
        var maxVal = parseInt(rangeMax.value);

        if (maxVal - minVal < priceGap) {
          rangeMin.value = maxVal - priceGap;
        }

        inputMin.value = rangeMin.value;
        setArea();
        UI.filterProducts();
      }

      function slideMax() {
        var minVal = parseInt(rangeMin.value);
        var maxVal = parseInt(rangeMax.value);

        if (maxVal - minVal < priceGap) {
          rangeMax.value = minVal + priceGap;
        }

        inputMax.value = rangeMax.value;
        setArea();
        UI.filterProducts();
      }

      function setMinInput() {
        var minInput = parseInt(inputMin.value);

        if (minInput >= parseInt(rangeMax.value) - priceGap) {
          minInput = parseInt(rangeMax.value) - priceGap;
          inputMin.value = minInput;
        }

        rangeMin.value = minInput;
        setArea();
        UI.filterProducts();
      }

      function setMaxInput() {
        var maxInput = parseInt(inputMax.value);

        if (maxInput <= parseInt(rangeMin.value) + priceGap) {
          maxInput = parseInt(rangeMin.value) + priceGap;
          inputMax.value = maxInput;
        }

        rangeMax.value = maxInput;
        setArea();
        UI.filterProducts();
      }

      rangeMin.addEventListener('input', slideMin);
      rangeMax.addEventListener('input', slideMax);
      inputMin.addEventListener('change', setMinInput);
      inputMax.addEventListener('change', setMaxInput);
      setArea();
    }
  }, {
    key: "createProduct",
    value: function createProduct() {
      if ((0, _pocketbase.isAuthenticated)()) {
        UI.addProduct();
      } else {
        window.location.href = '/public/auth/auth.html';
      }
    }
  }, {
    key: "displayUserName",
    value: function displayUserName() {
      var user = (0, _pocketbase.getCurrentUser)();
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
    key: "logout",
    value: function logout() {
      _pocketbase.pb.authStore.clear();

      window.location.href = 'index.html';
    }
  }, {
    key: "filterProducts",
    value: function filterProducts() {
      var selectedCategories = Array.from(document.querySelectorAll('.category input[type="checkbox"]:checked')).map(function (cb) {
        return cb.closest('.category').dataset.category;
      });
      var minPrice = parseInt(document.querySelector('.input-min').value);
      var maxPrice = parseInt(document.querySelector('.input-max').value);
      var cards = document.querySelectorAll('.product-cards');
      cards.forEach(function (card) {
        var cardCategory = card.dataset.category;
        var price = parseFloat(card.dataset.price);
        var categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
        var priceMatch = price >= minPrice && price <= maxPrice;
        card.style.display = categoryMatch && priceMatch ? 'block' : 'none';
      });
    }
  }]);

  return UI;
}(); //Event Listeners
// on page load 


window.addEventListener("DOMContentLoaded", function () {
  UI.getProducts();
  UI.priceRange();
  UI.reduceCategoryList();
  UI.displayUserName();
}); // add product

document.getElementById('add-product').addEventListener('click', function (e) {
  e.preventDefault();
  UI.createProduct();
  var overlay = document.querySelector('.product-form-overlay');
  overlay.classList.add('active');
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
}); // logout

document.querySelector('.log-out').addEventListener('click', function () {
  UI.logout();
}); // filter by category

var categoryItems = document.querySelectorAll('.category');
categoryItems.forEach(function (item) {
  item.addEventListener('click', function () {
    var category = item.dataset.category;

    if (category) {
      UI.filterByCategory(category);
    }
  });
});
//# sourceMappingURL=products.dev.js.map
