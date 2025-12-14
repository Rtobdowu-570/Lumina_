class CartItem  {
    constructor(data) {
    this.id = data.id
    this.name = data.name
    this.category = data.category
    this.price = data.price
    this.originalPrice = data.originalPrice
    this.quantity = data.quantity
    this.image = data.image
    this.color = data.color
    this.style = data.style
    this.rating = data.rating
    this.reviews = data.reviews
    }

    render() {
        const item = document.createElement("div")
        item.className = "cart-item"
        item.dataset.id = this.id

        item.innerHTML = `
        <div class="item-image" style="background: ${this.image};"></div>
            <div class="item-details">
                <div class="item-category">${this.category}</div>
                <h3 class="item-name">${this.name}</h3>
                <div class="item-meta">
                <span class="item-color">Color: ${this.color}</span>
                <span class="item-separator">•</span>
                <span class="item-style">${this.style}</span>
            </div>
            <div class="item-rating">
                <span class="stars">${this.generateStars()}</span>
                <span class="rating-count">${this.rating} (${this.reviews})</span>
            </div>
        </div>
        <div class="item-actions">
            <button class="wishlist-btn" data-action="whitelist">♡</button>
            <button class="remove-btn" data-action="remove">🗑️</button>
        </div>
        <div class="item-quantity">
            <button class="qty-btn" data-action="decrease">−</button>
            <input type="number" value="${this.quantity}" min="1" data-action="quantity">
            <button class="qty-btn" data-action="increase">+</button>
        </div>
        <div class="item-price">
            <div class="price-current">$${this.price.toFixed(2)}</div>
            ${this.originalPrice ? `<div class="price-original">$${this.originalPrice.toFixed(2)}</div>` : ""}
        </div>`

        this.attachEventListeners(item)
        return item
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
        if (action === "increase") {
        this.updateQuantity(1)
        } else if (action === "decrease") {
        this.updateQuantity(-1)
        } else if (action === "remove") {
        this.remove()
        } else if (action === "wishlist") {
        this.addToWishlist()
        }
        else if (action === "remove") {
            this.remove()
        }
        })

        const quantityInput = element.querySelector('[data-action="quantity]')
        quantityInput.addEventListener('change', (e) => {
            const newQuantity = Number.parseInt(e.target.value)
            if(newQuantity > 0) {
                this.quantity = newQuantity
                this.updateCart()
            } 
            else{
                e.target.value = this.quantity
            }
        })
    }

    remove() {
        const element = document.querySelector(`[data-id=${this.id}`)
        const removeBtn = element.querySelector('button[data-action="remove"]')
        removeBtn.addEventListener('click', () => {
            element.remove()
            this.updateCart()
        })
    }

    updateCart() {
        window.dispatchEvent(new CustomEvent("cart-updated"))
    }

    updateQuantity(change) {
        this.quantity = Math.max(1, this.quantity + change)
        const element = document.querySelector(`[data-id=${this.id}`)
        const input = element.querySelector('input[data-action="quantity"]')
        input.value = this.quantity;
        this.updateCart()
    }

    addToWishlist() {
        const button = document.querySelector(`[data-id=${this.id}], wishlist-btn`)
        button.textContent = "♥"
        button.style.color = "#ef4444"

        this.showToast('Added to Whitelist')
    }

    showToast(message) {
    const toast = document.createElement("div")
    toast.className = "toast"
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => toast.classList.add("show"), 10)
    setTimeout(() => {
        toast.classList.remove("show")
        setTimeout(() => toast.remove(), 300)
    }, 3000)
  }
}