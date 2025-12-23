import { ProductCard } from "../components/product-card.js";


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

  AddProduct() {}

  static increaseCategoryList() {
    let category = document.querySelectorAll(".category");
    const categories = Array.from(category);

  categories.forEach((category,index) => {
    if(index = categories.length - 1) {
      category.style.display = "flex";
      }
    })
  }

  static priceRange() {
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const inputMin = document.querySelector('.input-min');
    const inputMax = document.querySelector('.input-max');
    const range = document.querySelector('.range-track');
    const sliderMinValue = parseInt(rangeMin.min);
    const sliderMaxValue = parseInt(rangeMax.max);
    let priceGap = 1000;

    rangeMin.addEventListener('input', slideMin);
    rangeMax.addEventListener('input', slideMax);
    inputMin.addEventListener('change', minInput);
    inputMax.addEventListener('change', maxInput);

    function slideMin() {
      let gap = parseInt(rangeMax.value) - parseInt(rangeMin.value);
      if(gap <= priceGap) {
        rangeMin.value = parseInt(rangeMax.value) - priceGap;
      }
      setArea();
    }

    function slideMax() {
      let gap = parseInt(rangeMax.value) - parseInt(rangeMin.value);
      if(gap <= priceGap) {
        rangeMax.value = parseInt(rangeMin.value) + priceGap;
      }
      setArea();
    }

    function setArea() {
      inputMin.value = rangeMin.value;
      inputMax.value = rangeMax.value;
      range.style.left = ((rangeMin.value - sliderMinValue) / (sliderMaxValue - sliderMinValue) * 100) + "%";
      range.style.right = 100 - ((rangeMax.value - sliderMinValue) / (sliderMaxValue - sliderMinValue) * 100) + "%";
    }

    function minInput() {
      let minValue = parseInt(inputMin.value);
      if(minValue < sliderMinValue) {
        inputMin.value = sliderMinValue;
      }
      minValue = parseInt(inputMin.value);
      slideMin();
    }
    function maxInput() {
      let maxValue = parseInt(inputMax.value);
      if(maxValue > sliderMaxValue) {
        inputMax.value = sliderMaxValue;
      }
      maxValue = parseInt(inputMax.value);
      slideMax();
    }
    }
  }
  

//Event Listeners
// on page load 
window.addEventListener("DOMContentLoaded", () => {
  UI.priceRange();
  UI.reduceCategoryList();
});

// add product
document.getElementById('add-product').addEventListener('click', (e) => { 
  e.preventDefault();
  UI.createProduct()
  console.log("createProduct function called");
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