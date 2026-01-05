class ProductCard {
  constructor(product) {
    if (!product) return;
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = `http://127.0.0.1:8090/api/files/products/${product.id}/${product.image}`;
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

  render() {
    const card = document.createElement("div");
    card.className = "product-cards";
    card.dataset.id = this.id;
    card.dataset.category = this.category;
    card.dataset.price = this.price;
    card.dataset.name = this.name;
    card.dataset.rating = this.rating;
    card.dataset.quantity = this.quantity;

    card.innerHTML = `
          <div class="product-card-home">
        ${this.quantity > 0 ? `<span class="product-badge badge-sale">Sale</span>` : `<span class="product-badge badge-sold-out">Sold Out</span>`}

        <button class="whitelist-btn ${this.isWhitelisted ? "active" : ""}" data-action="whitelist">
            ${this.isWhitelisted ? "♥" : "♡"}
        </button>

        <a href="product-detail.html?id=${this.id}" class="product-image-home">
          <img src="${this.image}" alt="${this.name}" />
        </a>
        <div class="product-info-home">
          <span class="product-category-home">${this.category}</span>
          <h3 class="product-name-home">${this.name}</h3>
          <div class="product-rating">
                <span class="stars">${this.generateStars()}</span>
                <span class="rating-count">${this.rating} (${this.reviews}) reviews</span>
            </div>
          <div class="product-footer-home">
            <div class="product-price-home">
              <span class="price-current" data-price="${this.price}">$${this.price.toFixed(2)}</span>
              ${this.originalPrice ? `<span class="price-original">$${this.originalPrice.toFixed(2)}</span>` : ""}
            </div>
            <button class="btn-icon" aria-label="Add to cart" data-action="add-to-cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2H3.5L4.5 4M4.5 4L6.5 14H16.5L18.5 6H4.5Z" stroke="currentColor" stroke-width="2"/>
                <circle cx="7" cy="18" r="1" fill="currentColor"/>
                <circle cx="16" cy="18" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>`
    ;
    this.attachEventListeners(card);
    return card;
  }

  generateStars() {
    let output = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(this.rating)) {
            output += `<span class="star filled">★</span>`;
        } else if (i < this.rating) {
            output += `<span class="star half">★</span>`;
        } else {
            output += `<span class="star">☆</span>`;
        }
    }
    return output;
  }

  attachEventListeners(element) {
    element.addEventListener("click", (e) => {
      const btn = e.target.closest('button');
      const action = btn ? btn.dataset.action : null;
      if (action === "add-to-cart") {
        e.stopPropagation();
        this.addToCart();
      } else if (action === "whitelist") {
        e.stopPropagation();
        this.whitelist(element);
      } else {
        window.location.href = `product-detail.html?id=${this.id}`;
      }
    });
  }

  addToCart() {
    this.showToast("Added to cart!");
    window.dispatchEvent(
      new CustomEvent("product-added-to-cart", { detail: this }),
    );
  }

  whitelist(cardElement) {
   this.isWhitelisted = !this.isWhitelisted;
    const btn = cardElement.querySelector(".whitelist-btn");
    btn.textContent = this.isWhitelisted ? "♥" : "♡";
    btn.classList.toggle("active", this.isWhitelisted);
    this.showToast(this.isWhitelisted ? "Added to Whitelist" : "Removed from Whitelist");
  }

  toggleWhitelist(element) {
    if (!element) return;
    
    this.isWhitelisted = !this.isWhitelisted;
    const btn = element.querySelector(".whitelist-btn");
    btn.textContent = this.isWhitelisted ? "♥" : "♡";
    btn.classList.toggle("active", this.isWhitelisted);
    this.showToast(
      this.isWhitelisted ? "Added to Whitelist" : "Removed from Whitelist",
    );
  }

  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
}

export { ProductCard };
