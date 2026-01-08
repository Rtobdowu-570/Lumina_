import { CartItem } from "../components/cart-item.js";
import { pb, isAuthenticated } from '../api/pocketbase.js';

const cartItem = new CartItem();

async function displayCart() {
    try {
        const user = getCurrentUser();
        if (!user || !user.id) {
            console.warn('No authenticated user');
            return;
        }

        const data = await pb.collection('cart').getFullList({
            filter: `user = '${user.id}'`,
            expand: 'product'
        });

        const cartContainer = document.querySelector('.cart-items');
        if (!cartContainer) {
            console.warn('Cart container not found');
            return;
        }
        
        data.forEach(pd => {
            const productData = pd.expand.product;
            const cartSection = document.createElement('div')
            cartSection.className = 'cart-item'
            cartSection.dataset.id = pd.id

            cartSection.innerHTML += 
            `
            <div class="item-image"><img src="${pb.files.getURL(productData, productData.image)}" alt="${productData.name}"></div>
            <div class="item-details">
                <h3 class="item-name">${productData.name}</h3>
            </div>
        <div class="item-quantity">
            <button class="qty-btn" data-action="decrease">−</button>
            <input type="number" value="${pd.quantity}" min="1" data-action="quantity">
            <button class="qty-btn" data-action="increase">+</button>
        </div>
        <div class="item-price">
            <div class="price-current">$${productData.price.toFixed(2)}</div>
            ${
              productData.originalPrice
                ? `<div class="price-original">$${productData.originalPrice.toFixed(
                    2
                  )}</div>`
                : ""
            }
        </div>
         <div class="item-actions">
            <button class="remove-btn" data-action="remove">🗑️</button>
        </div>
            `
            cartContainer.appendChild(cartSection)
            attachEventListeners(cartSection);
            return cartSection;
          });
    } catch (err) {
        console.error('Failed to display cart:', err);
    }
}

 function attachEventListeners(item) {
    item.addEventListener('click', async (e) => {
        const btn = e.target.closest('button');
        const action = btn ? btn.dataset.action : null;
        if (action === "decrease") {
            await updateQuantity(item, action)
        } else if (action === "increase") {
            await updateQuantity(item, action)
        } else if (action === "remove") {
            cartItem.remove(item);
        }
    })
}

async function updateQuantity(item, action) {
    const input = item.querySelector('[data-action="quantity"]');
    const quantity = input.value;
    const currentQuantity = parseInt(quantity);

    if(action === "increase") {
        input.value = currentQuantity + 1;
        await pb.collection('cart').update(item.dataset.id, {
            quantity: currentQuantity + 1
        })
    } else if(action === "decrease") {
        input.value = currentQuantity - 1;
        await pb.collection('cart').update(item.dataset.id, {
            quantity: currentQuantity - 1
        })
    }
}

async function calculateItemPrice() {
    const paymentSummary = document.querySelector('.summary-details');
    const data = await pb.collection('cart').getFullList({
        filter: `user = "${getCurrentUser().id}"`,
        expand: 'product'
    });

    console.log(data);

    // Calculate totals for all items
    let subtotal = 0;
    data.forEach(pd => {
        const paymentData = pd.expand.product;
        subtotal += pd.quantity * paymentData.price;
    });

    const shipping = subtotal * 0.01;
    const tax = (subtotal * 0.05) * 0.05;
    const total = subtotal + shipping + tax;

    paymentSummary.innerHTML = 
    `
        <div class="summary-row">
            <span>Subtotal (<span id="total-items">${data.length}</span> ${data.length > 1 ? 'items' : 'item'})</span>
            <span id="subtotal">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span id="shipping">$${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax</span>
            <span id="tax">$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row discount" id="discount-row" style="display: none">
            <span>Discount</span>
            <span id="discount">-$0.00</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row total">
            <span>Total</span>
            <span id="total">$${total.toFixed(2)}</span>
        </div>
    `
}


function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/public/auth/auth.html';
    }
}

function displayUsername() {
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

function getCurrentUser() {
    return pb.authStore.model;
}

function logOut() {
    pb.authStore.clear(); 
    window.location.href = '/auth/login.html';
}

document.addEventListener('DOMContentLoaded',  () => {
   displayCart();
    checkAuth();
    displayUsername();
    calculateItemPrice();
});

const logOutBtn = document.querySelector('.log-out');
logOutBtn.addEventListener('click', () => {
    logOut();
});
