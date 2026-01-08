import { ProductCard } from "../components/product-card.js";
import { pb, isAuthenticated } from "../api/pocketbase.js";
import { UI } from "./products.js";

class ProductDetail extends ProductCard {
  constructor(productData) {
    super(productData);
    this.productData = productData;
    this.isWhitelisted = false;
  }

  async addToCart(product, quantity = 1) {
    try {
      if (!pb.authStore.isValid) {
      window.location.href = "auth.html";
      return;
    }

      const userId = pb.authStore.model.id;
      const productId = product.id;

      const existing = await pb
        .collection("cart")
        .getFirstListItem(
          `user="${pb.authStore.model.id}" && product="${productId}"`
        )
        .catch(() => null);

      if (existing) {
        await pb.collection("cart").update(existing.id, {
          quantity: existing.quantity + quantity,
        });
      } else {
        await pb.collection("cart").create({
          user: userId,
          product: product.id,
          quantity: quantity,
        });
      }

      this.showToast("Added to cart!");
      window.dispatchEvent(
        new CustomEvent("product-added-to-cart", { detail: this })
      );
    } catch (err) {
      console.error("Error adding to cart:", err);
      this.showToast("Failed to add to cart");
    }
  }

  addWhitelist() {
    this.isWhitelisted = !this.isWhitelisted;
    const btn = document.querySelector(".white-list");
    if(this.isWhitelisted) {
        btn.textContent = "♥";
    } else {
        btn.textContent = "♡";
    }
    btn.classList.toggle("active", this.isWhitelisted);
    this.showToast(
      this.isWhitelisted ? "Added to Whitelist" : "Removed from Whitelist"
    );
  }

  async getProduct() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if(!productId)
         {
        console.error("Product ID not found in URL");
        return;
        }

        try{
            const product = await pb.collection('products').getOne(productId);
            const relatedRecords = await pb.collection('products').getList(1, 4, {
                filter: `category = "${product.category}" && id != "${productId}"`,
            });

            const productData = product;
            const relatedProducts = relatedRecords.items;
            this.renderProduct(product, relatedProducts || []);
            this.setupEventListeners(product, relatedProducts || []);
        }
        catch(err) {
            console.error("Error fetching product:", err);
            this.showToast("Failed to fetch product");
        }
  }

  displayUserName() {

    const user =  this.getCurrentUser()
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

  getCurrentUser() {
    return pb.authStore.model;
  }

  logOut() {
    pb.authStore.clear(); 
    window.location.href = 'index.html';
  }

  setupEventListeners(product, relatedProducts) {
    const addToCartBtn = document.querySelector(".btn-add-cart");
    const qtyInput = document.querySelector('.qty-input');

    addToCartBtn.addEventListener("click", () => {
      const quantity = parseInt(qtyInput.value) || 1;
      this.addToCart(product, quantity);
    });

    // for related products
    const relProducts = document.querySelector('.related-products-grid');
    relProducts.addEventListener('click', (e) => {
        const btn = e.target.closest('.cart-btn');

        if(btn) {
            const id = btn.dataset.id;
            const relatedProduct = relatedProducts.find(p => p.id === id);
            if(relatedProduct) {
                this.addToCart(relatedProduct, 1);
            }
        }
    });

    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            let currentQty = parseInt(qtyInput.value) || 1;
            if(btn.textContent === '+') {
                currentQty += 1;
            } else if(btn.textContent === '-' && currentQty > 1) {
                currentQty -= 1;
            }
            qtyInput.value = currentQty;
        })
    })

    const wishlistBtn = document.querySelector('.white-list');
    wishlistBtn.addEventListener('click', () => {
        this.addWhitelist(wishlistBtn);
    })

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            btn.classList.add('active');
            tabPanes[index].classList.add('active');
        })
    })

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Product link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    const copy = document.querySelector('.copy')
        copy.addEventListener('click', () => {
            const url = 'http://127.0.0.1:5500/';
            const textToCopy = `${url}product-detail.html?id=${product.id}`;
            copyToClipboard(textToCopy);
        });
  }

  renderProduct(product, relatedProducts) {
        const main = document.querySelector(".main-content");
        const getImgUrl = (item) => item.image ? pb.files.getURL(item, item.image) : '/assest/images/placeholder.png';


        const relatedHtml = relatedProducts.length > 0 ?
            relatedProducts.map(prod => {
                return `
                <a href="product-detail.html?id=${prod.id}">
                    <div class="product-card"">
                        <div class="product-image-container">
                            <img src=${getImgUrl(prod)} alt="${prod.name}">
                            <div class="product-actions">
                                <button class="cart-btn" data-id="${prod.id}>Add to Cart
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z" stroke="currentColor" stroke-width="2"/>
                                <circle cx="7" cy="18" r="1" fill="currentColor"/>
                                <circle cx="16" cy="18" r="1" fill="currentColor"/>
                                </svg>
                                </button>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-category">${prod.category}</div>
                            <div class="product-name">${prod.name}</div>
                            <div class="product-rating">
                                <span class="rating-value">${prod.rating}</span>
                            </div>
                            <div class="product-price">
                                <span class="current-price">${prod.price}</span>
                            </div>
                        </div>
                    </div>
                </a>
                `}).join('') :
            '<p>No related products found.</p>';

        main.innerHTML = `
            <div class="breadcrumb">
                <a href="dashboard.html">Home</a>
                <span>/</span>
                <a href="products.html">Products</a>
                <span>/</span>
                <span class="current">${product.name}</span>
            </div>

            <div class="product-detail-layout">
                <div class="product-images">
                    <div class="main-image">
                        <img src="${getImgUrl(product)}" alt="ProductName">
                    </div>
                </div>

                <div class="product-details">
                    <div class="product-header">
                        <div>
                            <h1 class="product-title">${product.name}</h1>
                            <div class="product-rating-detail">
                                <div class="star">${new ProductCard(product).generateStars()}</div>
                                <span class="rating-text">${product.rating}</span>
                            </div>
                        </div>
                        <div class="product-actions-header">
                            <button class="icon-btn white-list">♡</button>
                            <button class="icon-btn" copy>🔗</button>
                        </div>
                    </div>

                    <div class="product-price-detail">
                        <span class="current-price">${product.price}</span>
                        <span class="original-price">${product.originalPrice}</span>
                        <span class="save-badge">Save ${product.originalPrice - product.price}</span>
                    </div>

                    <p class="product-description">${product.description} </p>


                    <div class="product-purchase">
                        <div class="quantity-selector">
                            <button class="qty-btn">-</button>
                            <input type="number" value="1" min="1" title="qty-btn" class="qty-input"/>
                            <button class="qty-btn">+</button>
                        </div>
                        <button class="btn-add-cart">Add to Cart 
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z" stroke="currentColor" stroke-width="2"/>
                            <circle cx="7" cy="18" r="1" fill="currentColor"/>
                            <circle cx="16" cy="18" r="1" fill="currentColor"/></svg>
                        </button>
                    </div>

                    <div class="product-info-section">
                        <div class="info-item">
                            <span class="info-label">Stock:</span>
                            <span class="info-value in-stock">${product.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Warranty:</span>
                            <span class="info-value">2 Years</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="product-tabs">
                <div class="tabs-header">
                    <button class="tab-btn active">Reviews</button>
                    <button class="tab-btn">Shipping Info</button>
                </div>
                <div class="tabs-content">
                    <div id="reviews" class="tab-pane active">
                        <div class="reviews-section">
                            <div class="reviews-summary">
                                <div class="overall-rating">
                                    <div class="rating-number">${product.rating}</div>
                                    <div class="rating-stars">${new ProductCard(product).generateStars()}</div>
                                    <div class="reviews-count">Based on ${product.reviews} reviews</div>
                                </div>
                                <button class="write-review-btn btn">Write Review</button>
                            </div>
                            <div class="review-item">
                                <div class="review-header">
                                    <strong></strong>
                                    <span class="review-date"></span>
                                </div>
                                <div class="review-rating"></div>
                                <p class="review-text"></p>
                            </div>
                        </div>
                    </div>
                    <div id="shipping" class="tab-pane">
                        <div class="shipping-info">
                            <h3>Free Shipping</h3>
                            <p>Free delivery on orders over $50. Estimated delivery: 3-5 business days.</p>
                            <h3>Returns</h3>
                            <p>30-day return policy. Free returns for unwanted items in original condition.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section class="related-products">
                <h2 class="section-title">You Might Also Like</h2>
                <div class="related-products-grid">
                ${relatedHtml}
            </div>
            </section>
        `;
    }
}

 const detail = new ProductDetail();

document.addEventListener("DOMContentLoaded", () => {
    detail.getProduct();
    detail.displayUserName();
});

// Event listeners 
const home  = document.querySelector('.logo-text');
home.addEventListener('click', () => {
    window.location.href = '/public/index.html';
});

const logOutBtn = document.querySelector('.log-out');
logOutBtn.addEventListener('click', () => {
    detail.logOut();
});

const check = document.querySelector('.dashboard, .cart, .orders, .analytics, .settings');
if (check) {
  check.addEventListener('click', () => {
   if(!isAuthenticated()) {
    window.location.href = '/public/auth/auth.html';
   }
  });
}

