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
            console.log(productData)
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
            <input type="number" value="${
              pd.quantity
            }" min="1" data-action="quantity">
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
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/public/auth/auth.html';
    }
}

function attachEventListeners(container) {
    container.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;

      let el = btn;
      let itemEl = null;
      while (el) {
        if (el.dataset && el.dataset.id) {
          itemEl = el;
          break;
        }
        el = el.previousElementSibling || el.parentElement;
      }
      if (!itemEl) return;
      const id = itemEl.dataset.id;

      if (action === 'increase') {
        await updateQuantity(1, id);
      } else if (action === 'decrease') {
        await updateQuantity(-1, id);
      } else if (action === 'remove') {
        try {
          await pb.collection('cart').delete(id);
          const row = document.querySelector(`[data-id="${id}"]`);
          if (row) {
            let toRemove = row;
            for (let i = 0; i < 4; i++) {
              const next = toRemove.nextElementSibling;
              toRemove.remove();
              if (!next) break;
              toRemove = next;
            }
          }
          window.dispatchEvent(new CustomEvent('cart-updated'));
        } catch (err) {
          console.error('Failed to remove cart item:', err);
        }
      }
    });

    container.addEventListener('change', async (e) => {
      const input = e.target.closest('input[data-action="quantity"]');
      if (!input) return;
      const newQuantity = Number.parseInt(input.value) || 1;

      let el = input;
      let itemEl = null;
      while (el) {
        if (el.dataset && el.dataset.id) {
          itemEl = el;
          break;
        }
        el = el.previousElementSibling || el.parentElement;
      }
      if (!itemEl) return;
      const id = itemEl.dataset.id;

      try {
        await pb.collection('cart').update(id, { quantity: Math.max(1, newQuantity) });
        window.dispatchEvent(new CustomEvent('cart-updated'));
      } catch (err) {
        console.error('Failed to update quantity:', err);
      }
    });
  }

async function updateQuantity(change, id) {
      try {
        const itemEl = document.querySelector(`[data-id="${id}"]`);
        if (!itemEl) return;

        let sibling = itemEl.nextElementSibling;
        let input = null;
        while (sibling) {
          input = sibling.querySelector && sibling.querySelector('input[data-action="quantity"]');
          if (input) break;
          sibling = sibling.nextElementSibling;
        }
        if (!input) return;

        const current = Number.parseInt(input.value) || 1;
        const newQty = Math.max(1, current + change);
        input.value = newQty;

        await pb.collection('cart').update(id, { quantity: newQty });
        window.dispatchEvent(new CustomEvent('cart-updated'));
      } catch (err) {
        console.error('Failed to update quantity:', err);
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
});
