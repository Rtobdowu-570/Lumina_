class ProductCard{
    constructor(product) {
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

    render() {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = this.id;

        card.innerHTML = `
        ${this.badge ? `<div class="product-badge">${this.badge}</div>` : ''}
        <button class="whitelist-btn ${this.isWhitelisted ? 'whitelisted' : ''}" 
        data-action='whitelist'>  ${this.isWhitelisted ? "♥" : "♡"}</button>
        <div class="product-image" style="background: ${this.image};"></div>
        <div class="product-info">
            <div class="product-category">${this.category}</div>
            <h3 class="product-name">${this.name}</h3>
            <div class="product-rating">
                <span class="stars">${this.generateStars()}</span>
                <span class="rating-count">${this.rating} (${this.reviews})</span>
            </div>
            <div class="product-footer">
                <div class="product-price">
                    <span class="price-current">$${this.price.toFixed(2)}</span>
                        ${this.originalPrice ? `<span class="price-original">$${this.originalPrice.toFixed(2)}</span>` : ""}
                </div>
                <button class="add-to-cart-btn" data-action="add-to-cart">
                    <span class="cart-icon">🛒</span>
                </button>
            </div>
        </div>
        `
        this.attachEventListeners(card);
        return card;
    }

    generateStars() {
        const fullStars = 5;
        fullStars = Math.round(this.rating);
        let output = '';
        for(let i = 0; i <= fullStars; i++) {
            // get percentage of star to fill
            const starPercentage = (i / fullStars) * 100;
            const star = starPercentage;
            output += 
            `<span class="star filled" style="width: ${star};">★</span>`;
        }
        return output;
    }

    attachEventListeners(element) {
        element.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if(action === 'add-to-cart') {
                e.preventDefault()
                this.addToCart();
            }
            else if(action === 'whitelist') {
                e.preventDefault()
                this.whitelist();
            }
            else{
                window.location.href = `product-detail.html?id=${this.id}`;
            }
        })
    }

    addToCart() {
        this.showToast('Added to cart!');
        window.dispatchEvent(new CustomEvent("product-added-to-cart", { detail: this }))
    }

    toggleWhitelist(element) {
        this.isWhitelisted = !this.isWhitelisted;
        const btn = element.querySelector('.whitelist-btn')
        btn.textContent = this.isWhitelisted ? "♥" : "♡";
        btn.classList.toggle('active', this.isWhitelisted)
        this.showToast(this.isWhitelisted ? 'Added to Whitelist' : 'Removed from Whitelist')
        }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
}

export { ProductCard }