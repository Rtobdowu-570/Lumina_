// Main JavaScript for Ecommerce App

// Sample data
const categories = [
  {
    id: 1,
    name: "Electronics",
    count: 124,
    image: "../assest/images/image/electronics.jpg",
  },
  {
    id: 2,
    name: "Audio",
    count: 89,
    image: "../assest/images/image/audio.jpg",
  },
  {
    id: 3,
    name: "Office",
    count: 56,
    image: "../assest/images/image/office.jpg",
  },
  {
    id: 4,
    name: "Accessories",
    count: 142,
    image: "../assest/images/image/accesories.jpg",
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Sony WH-1000XM4 Wireless Headphones",
    category: "Audio",
    price: 348.0,
    originalPrice: 399.0,
    rating: 4.8,
    reviews: 1234,
    image: "../assest/images/products/black-wireless-charging-station.jpg",
    badge: "Sale",
  },
  {
    id: 2,
    name: "Apple Watch Series 8 Aluminum",
    category: "Electronics",
    price: 399.0,
    originalPrice: 429.0,
    rating: 4.9,
    reviews: 2108,
    image: "../assest/images/products/white-apple-watch.jpg",
    badge: "Sale",
  },
  {
    id: 3,
    name: "Fujifilm X-T4 Mirrorless Camera",
    category: "Electronics",
    price: 1699.0,
    rating: 4.8,
    reviews: 1028,
    image: "../assest/images/products/vintage-mirrorless-camera.jpg",
    badge: "New",
  },
  {
    id: 4,
    name: "Minimalist Leather Backpack",
    category: "Accessories",
    price: 149.0,
    originalPrice: 189.0,
    rating: 4.5,
    reviews: 542,
    image: "../assest/images/products/brown-leather-backpack.png",
    badge: "Sale",
  },
]

// Render categories
function renderCategories() {
  const grid = document.getElementById("categoryGrid")

  grid.innerHTML = categories
    .map(
      (category) => `
    <a href="products.html?category=${category.name.toLowerCase()}" class="category-card">
      <div class="category-image">
        <img src="${category.image}" alt="${category.name}" />
      </div>
      <div class="category-info">
        <h3 class="category-name">${category.name}</h3>
        <p class="category-count">${category.count} products</p>
      </div>
    </a>
  `,
    )
    .join("")
}

// Render featured products
function renderFeaturedProducts() {
  const grid = document.getElementById("featuredProducts")

  grid.innerHTML = featuredProducts
    .map((product) => {
      const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

      return `
      <div class="product-card-home">
        ${product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : ""}
        <a href="product-detail.html?id=${product.id}" class="product-image-home">
          <img src="${product.image}" alt="${product.name}" />
        </a>
        <div class="product-info-home">
          <span class="product-category-home">${product.category}</span>
          <h3 class="product-name-home">${product.name}</h3>
          <div class="product-rating-home">
            <div class="stars">
              ${Array(5)
                .fill("")
                .map(
                  (_, i) => `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="${i < Math.floor(product.rating) ? "currentColor" : "none"}" stroke="currentColor">
                  <path d="M8 1L10 6L15 6.5L11.5 10L12.5 15L8 12.5L3.5 15L4.5 10L1 6.5L6 6L8 1Z"/>
                </svg>
              `,
                )
                .join("")}
            </div>
            <span class="rating-text">${product.rating} (${product.reviews.toLocaleString()})</span>
          </div>
          <div class="product-footer-home">
            <div class="product-price-home">
              <span class="price-current">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ""}
            </div>
            <button class="btn-icon" aria-label="Add to cart">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z" stroke="currentColor" stroke-width="2"/>
                <circle cx="7" cy="18" r="1" fill="currentColor"/>
                <circle cx="16" cy="18" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `
    })
    .join("")
}

// Newsletter form
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault()
  const email = e.target.querySelector('input[type="email"]').value
  alert(`Thank you for subscribing with ${email}!`)
  e.target.reset()
})

// Sign-in redirect
document.getElementById('sign-in').addEventListener('click', () => {
  window.location.href = 'register.html'
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderCategories()
  renderFeaturedProducts()
})
