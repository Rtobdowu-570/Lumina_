import { ProductCard } from "../components/product-card.js";
import { pb,  isAuthenticated, getCurrentUser } from "../api/pocketbase.js"

class UI {

  static reduceCategoryList() {
  let category = document.querySelectorAll(".category");
  const categories = Array.from(category);

  categories.forEach((category,index) => {
    if(index >= 10) {
      category.style.display = "none";
      }
    })
  } 

static async addProduct() {
const overlay = document.createElement('div');
overlay.className = 'product-form-overlay';

const card = document.createElement('div');
card.className = 'product-form-card';

const header = document.createElement('div');
header.className = 'product-form-header';

const headerContent = document.createElement('div');
headerContent.className = 'product-form-header-content';

const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
iconSvg.setAttribute('width', '24');
iconSvg.setAttribute('height', '24');
iconSvg.setAttribute('viewBox', '0 0 24 24');
iconSvg.setAttribute('fill', 'none');
iconSvg.setAttribute('stroke', 'currentColor');
iconSvg.setAttribute('stroke-width', '2');
iconSvg.setAttribute('stroke-linecap', 'round');
iconSvg.setAttribute('stroke-linejoin', 'round');

const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
iconPath.setAttribute('d', 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z');
iconSvg.appendChild(iconPath);

const iconDiv = document.createElement('div');
iconDiv.className = 'product-form-icon';
iconDiv.appendChild(iconSvg);

const titleDiv = document.createElement('div');

const title = document.createElement('h2');
title.className = 'product-form-title';
title.textContent = 'Add New Product';

const description = document.createElement('p');
description.className = 'product-form-description';
description.textContent = 'Fill in the details to add a product to your store';

titleDiv.append(title, description);

headerContent.append(iconDiv, titleDiv);

const closeButton = document.createElement('button');
closeButton.className = 'product-form-close';
closeButton.type = 'button';
closeButton.setAttribute('aria-label', 'Close');

closeButton.addEventListener('click', () => {
    const overlay = document.querySelector('.product-form-overlay');
    overlay.classList.remove('active');
  });

const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
closeSvg.setAttribute('width', '24');
closeSvg.setAttribute('height', '24');
closeSvg.setAttribute('viewBox', '0 0 24 24');
closeSvg.setAttribute('fill', 'none');
closeSvg.setAttribute('stroke', 'currentColor');
closeSvg.setAttribute('stroke-width', '2');
closeSvg.setAttribute('stroke-linecap', 'round');
closeSvg.setAttribute('stroke-linejoin', 'round');

const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
line1.setAttribute('x1', '18');
line1.setAttribute('y1', '6');
line1.setAttribute('x2', '6');
line1.setAttribute('y2', '18');

const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
line2.setAttribute('x1', '6');
line2.setAttribute('y1', '6');
line2.setAttribute('x2', '18');
line2.setAttribute('y2', '18');

closeSvg.append(line1, line2);
closeButton.appendChild(closeSvg);

header.append(headerContent, closeButton);

const content = document.createElement('div');
content.className = 'product-form-content';

const form = document.createElement('form');

form.className = 'product-form';
const nameGroup = document.createElement('div');
nameGroup.className = 'form-group';

const nameLabel = document.createElement('label');
nameLabel.className = 'form-label';
nameLabel.setAttribute('for', 'productName');
nameLabel.textContent = 'Product Name';

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'productName';
nameInput.className = 'form-input';
nameInput.placeholder = 'Enter product name';
nameInput.required = true;
nameInput.name = 'name';

nameGroup.append(nameLabel, nameInput);

const imageGroup = document.createElement('div');
imageGroup.className = 'form-group';

const imageLabelOuter = document.createElement('label');
imageLabelOuter.className = 'form-label';
imageLabelOuter.textContent = 'Product Image';

const uploadContainer = document.createElement('div');
uploadContainer.className = 'image-upload-container';

const uploadLabel = document.createElement('label');
uploadLabel.className = 'image-upload-label';

const uploadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
uploadSvg.setAttribute('width', '40');
uploadSvg.setAttribute('height', '40');
uploadSvg.setAttribute('viewBox', '0 0 24 24');
uploadSvg.setAttribute('fill', 'none');
uploadSvg.setAttribute('stroke', 'currentColor');
uploadSvg.setAttribute('stroke-width', '2');
uploadSvg.setAttribute('stroke-linecap', 'round');
uploadSvg.setAttribute('stroke-linejoin', 'round');

const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('x', '3');
rect.setAttribute('y', '3');
rect.setAttribute('width', '18');
rect.setAttribute('height', '18');
rect.setAttribute('rx', '2');
rect.setAttribute('ry', '2');

const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '8.5');
circle.setAttribute('cy', '8.5');
circle.setAttribute('r', '1.5');

const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
polyline.setAttribute('points', '21 15 16 10 5 21');

uploadSvg.append(rect, circle, polyline);

const uploadText = document.createElement('span');
uploadText.className = 'upload-text';
uploadText.textContent = 'Click to upload image';

const uploadSubtext = document.createElement('span');
uploadSubtext.className = 'upload-subtext';
uploadSubtext.textContent = 'PNG, JPG up to 5MB';

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.className = 'hidden-input';
fileInput.accept = 'image/*';
fileInput.name = 'image';

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
   if (file) {
    uploadText.textContent = file.name;
    uploadSubtext.textContent = file.size + ' bytes';
    uploadSvg.style.display = 'none';
   }
})

uploadLabel.append(uploadSvg, uploadText, uploadSubtext, fileInput);
uploadContainer.appendChild(uploadLabel);
imageGroup.append(imageLabelOuter, uploadContainer);

const categoryGroup = document.createElement('div');
categoryGroup.className = 'form-group';

const categoryLabel = document.createElement('label');
categoryLabel.className = 'form-label';
categoryLabel.setAttribute('for', 'category');
categoryLabel.textContent = 'Category';

const categorySelect = document.createElement('select');
categorySelect.id = 'category';
categorySelect.className = 'form-select';
categorySelect.required = true;
categorySelect.name = 'category';

const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = 'Select a category';

const categories = [
  'Travel & Luggage',
  'Shoes & Footwear',
  'Kitchen & Dining',
  'Tools & Home Improvement',
  'Musical Instruments',
  'Arts & Crafts',
  'Fitness Equipment',
  'Watches',
  'Bags & Handbags',
  'Gardening & Outdoor Living',
  'Video Games & Consoles',
  'Eyewear & Sunglasses',
  'Bedding & Bath',
  'Camping & Hiking',
  'Party Supplies',
  'Appliances',
  'Mobile Phones & Accessories',
  'Computers & Laptops',
  'Lighting & Fans',
  'Men\'s Clothing',
  'Women\'s Clothing',
  'Kids\' Clothing',
  'Skincare & Makeup',
  'Vitamins & Supplements',
  'Cycling & Bikes',
  'Board Games & Puzzles',
  'Movies & TV Shows',
  'Beverages & Drinks',
  'Pet Food & Treats',
  'Home Storage & Organization',
  'Baby Essentials',
  'Fine Jewelry',
  'Car Parts & Accessories',
  'Stationery & School Supplies',
  'Outdoor Power Equipment',
  'Electronics',
  'Fashion & Apparel',
  'Home & Garden',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Sports & Outdoors',
  'Toys & Games',
  'Books & Media',
  'Food & Grocery',
  'Pet Supplies',
  'Furniture & Decor',
  'Baby & Kids',
  'Jewelry & Accessories',
  'Automotive',
  'Office Supplies'
];

categories.forEach((category) => {
  const option = document.createElement('option');
  option.value = category.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9-]/g, '');
  option.textContent = category;
  option.dataset.category = category;
  categorySelect.appendChild(option);
});


categorySelect.appendChild(defaultOption); 
categorySelect.insertBefore(defaultOption, categorySelect.firstChild);

categoryGroup.append(categoryLabel, categorySelect);

const row = document.createElement('div');
row.className = 'form-row';

const priceGroup = document.createElement('div');
priceGroup.className = 'form-group';

const priceLabel = document.createElement('label');
priceLabel.className = 'form-label';
priceLabel.setAttribute('for', 'price');
priceLabel.textContent = 'Price';

const priceWrapper = document.createElement('div');
priceWrapper.className = 'price-input-wrapper';

const priceSymbol = document.createElement('span');
priceSymbol.className = 'price-symbol';
priceSymbol.textContent = '$';

const priceInput = document.createElement('input');
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

const quantityGroup = document.createElement('div');
quantityGroup.className = 'form-group';

const quantityLabel = document.createElement('label');
quantityLabel.className = 'form-label';
quantityLabel.setAttribute('for', 'quantity');
quantityLabel.textContent = 'Quantity';

const quantityInput = document.createElement('input');
quantityInput.type = 'number';
quantityInput.id = 'quantity';
quantityInput.className = 'form-input';
quantityInput.placeholder = '0';
quantityInput.min = '0';
quantityInput.required = true;
quantityInput.name = 'quantity';

quantityGroup.append(quantityLabel, quantityInput);

row.append(priceGroup, quantityGroup);

const descGroup = document.createElement('div');
descGroup.className = 'form-group';

const descLabel = document.createElement('label');
descLabel.className = 'form-label';
descLabel.setAttribute('for', 'description');
descLabel.textContent = 'Description';

const optionalSpan = document.createElement('span');
optionalSpan.className = 'optional-text';
optionalSpan.textContent = '(Optional)';

descLabel.appendChild(optionalSpan);

const textarea = document.createElement('textarea');
textarea.id = 'description';
textarea.className = 'form-textarea';
textarea.rows = 4;
textarea.placeholder = 'Enter product description...';
textarea.name = 'description';

descGroup.append(descLabel, textarea);

const actions = document.createElement('div');
actions.className = 'form-actions';

const submitBtn = document.createElement('button');
submitBtn.type = 'submit';
submitBtn.className = 'btn-submit';
submitBtn.textContent = 'Add Product';


const cancelBtn = document.createElement('button');
cancelBtn.type = 'button';
cancelBtn.className = 'btn-cancel';
cancelBtn.textContent = 'Cancel';

cancelBtn.addEventListener('click', () => {
    const overlay = document.querySelector('.product-form-overlay');
    overlay.classList.remove('active');
  });

actions.append(submitBtn, cancelBtn);

// Assemble form
form.append(
  imageGroup,
  nameGroup,
  categoryGroup,
  row,
  descGroup,
  actions
);

content.appendChild(form);
card.append(header, content);
overlay.appendChild(card);

document.body.appendChild(overlay);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        image : fileInput.files[0],
        name : nameInput.value,
        category : categorySelect.value,
        price : priceInput.value,
        quantity : quantityInput.value,
        description : textarea.value
      }

      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('name', data.name);
      formData.append('category', data.category);
      formData.append('price', data.price);
      formData.append('quantity', data.quantity);
      formData.append('description', data.description);

      try {
        await pb.collection('products').create(formData);
        console.log('Product added successfully');
      } catch(err) {
        console.log('ERROR', err.details)
      }

      const overlay = document.querySelector('.product-form-overlay');
      overlay.classList.remove('active');

    })
  }

  static async getProducts() {
    try {
            const products = await pb.collection('products').getFullList();
            const productsGrid = document.getElementById('products-grid');
            if (!productsGrid) return;

            productsGrid.innerHTML = '';
            products.forEach(productData => {
                const productCard = new ProductCard(productData);
                productsGrid.appendChild(productCard.render());
            });
        } catch (err) {
            console.error("Failed to load products:", err);
        }
  }

  static increaseCategoryList() {
    let category = document.querySelectorAll(".category");
    const categories = Array.from(category);

  categories.forEach((category, index) => {
    if(index = categories.length - 1) {
      category.style.display = "block";
      }
      else {
      category.style.display = "none";
    }
    })
  }

    static priceRange() {
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const inputMin = document.querySelector('.input-min');
    const inputMax = document.querySelector('.input-max');
    const progress = document.querySelector('.price-slider .range-track'); 

    const sliderMaxValue = parseInt(rangeMax.max);
    let priceGap = 1000; 

    const setArea = () => {
        const leftPos = (rangeMin.value / sliderMaxValue) * 100;
        const rightPos = 100 - (rangeMax.value / sliderMaxValue) * 100;
        
        progress.style.left = leftPos + "%";
        progress.style.right = rightPos + "%";
    };

    function slideMin() {
        let minVal = parseInt(rangeMin.value);
        let maxVal = parseInt(rangeMax.value);

        if (maxVal - minVal < priceGap) {
            rangeMin.value = maxVal - priceGap;
        }
        inputMin.value = rangeMin.value;
        setArea();
        UI.filterProducts();
    }

    function slideMax() {
        let minVal = parseInt(rangeMin.value);
        let maxVal = parseInt(rangeMax.value);

        if (maxVal - minVal < priceGap) {
            rangeMax.value = minVal + priceGap;
        }
        inputMax.value = rangeMax.value;
        setArea();
        UI.filterProducts();
    }

    function setMinInput() {
        let minInput = parseInt(inputMin.value);
        if (minInput >= (parseInt(rangeMax.value) - priceGap)) {
            minInput = parseInt(rangeMax.value) - priceGap;
            inputMin.value = minInput;
        }
        rangeMin.value = minInput;
        setArea();
        UI.filterProducts();
    }

    function setMaxInput() {
        let maxInput = parseInt(inputMax.value);
        if (maxInput <= (parseInt(rangeMin.value) + priceGap)) {
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

  static createProduct() {
    if(isAuthenticated()) {
      UI.addProduct();
    } else {
      window.location.href = '/public/auth/auth.html';
    }
  }

  static displayUserName() {

    const user =  getCurrentUser()
    const userName = document.querySelector('.user-name');

    if (isAuthenticated()) {
      if(user.name) {
        userName.textContent = user.name;
      } else {
        userName.textContent = user.user_name;
      }
    }
    else {
      userName.textContent = "Guest";
    }
  }

  static logout() {
    pb.authStore.clear(); 
    window.location.href = 'index.html';
}


static filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('.category input[type="checkbox"]:checked'))
      .map(cb => cb.closest('.category').dataset.category);
    const minPrice = parseInt(document.querySelector('.input-min').value);
    const maxPrice = parseInt(document.querySelector('.input-max').value);
    const cards = document.querySelectorAll('.product-cards');

    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const price = parseFloat(card.dataset.price);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
        const priceMatch = price >= minPrice && price <= maxPrice;
        card.style.display = categoryMatch && priceMatch ? 'block' : 'none';
    });
  }

}

  

//Event Listeners
// on page load 
window.addEventListener("DOMContentLoaded", () => {
  UI.getProducts();
  UI.priceRange();
  UI.reduceCategoryList();
  UI.displayUserName();
});

// add product
document.getElementById('add-product').addEventListener('click', (e) => { 
  e.preventDefault();
  UI.createProduct()
  const overlay = document.querySelector('.product-form-overlay');
  overlay.classList.add('active');
})


// load more product
const showMore = document.getElementById('show-more-btn');
const showLess = document.getElementById('show-less-btn');

showMore.addEventListener('click', () => {
  UI.increaseCategoryList();
  showMore.style.display = "none";
  showLess.style.display = "block";
})

// show less product
showLess.addEventListener('click', () => {
  UI.reduceCategoryList();
  showMore.style.display = "block";
  showLess.style.display = "none";
})

// logout
document.querySelector('.log-out').addEventListener('click', () => {
  UI.logout();
})

// filter by category
const categoryItems = document.querySelectorAll('.category');
categoryItems.forEach(item => {
  item.addEventListener('click', () => {
    const category = item.dataset.category;
    if (category) {
      UI.filterByCategory(category);
    }
  })
})