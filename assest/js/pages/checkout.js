import { pb, isAuthenticated } from '../api/pocketbase.js';
import {  Modal } from "../components/modal.js";
import { CartItem } from "../components/cart-item.js";

const cartItem = new CartItem();

function showPaymentModal() {
    const PaymentModal = {
        title: "Payment",
        message: "Are you sure you want to proceed to payment?",
        confirmText: "Confirm",
        cancelText: "Cancel",
        onConfirm: async () => {
            cartItem.showToast('Payment successful');
            const user = getCurrentUser().id;
            const cartRecord = await pb.collection('cart').getFullList({
                filter: `user = "${getCurrentUser().id}"`
            })
            const cartItemIds = cartRecord.map(record => record.id);
            const data = {
            "items": cartItemIds,
            "user": user,
            "successful": true,
            "failed": false
        };
        const checkoutRecord = await pb.collection('checkout').create(data);
        for (let id of cartItemIds) {
            await pb.collection('cart').delete(id);
        }
        cartItem.showToast("Payment Successful! Order Created.");

            const modal = document.querySelector(".modal");
            if (modal) {
                modal.classList.remove("show");
                setTimeout(() => modal.remove(), 300);
            }
        },
        onCancel: () => {
            cartItem.showToast('Payment failed');
            const modal = document.querySelector(".modal");
            if (modal) {
                modal.classList.remove("show");
                setTimeout(() => modal.remove(), 300);
            }
        },
    }
    const modal = new Modal(PaymentModal);
    modal.show();
}

function ValidateInput() {
    const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"])'));
    const completeBtn = document.querySelector('.complete');

    if (!completeBtn) return;

    function validate() {
        const hasEmpty = inputs.some(i => !i.value || i.value.trim() === '');
        
        completeBtn.disabled = hasEmpty;

        if (!hasEmpty) {
            completeBtn.classList.add('ready-pulse');
            completeBtn.innerHTML = 'Complete Payment ✓';
        } else {
            completeBtn.classList.remove('ready-pulse');
            completeBtn.innerHTML = 'Complete Payment'; 
        }

        return hasEmpty;
    }

    inputs.forEach(i => i.addEventListener('input', validate));

    validate();

    completeBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        showPaymentModal();
    });
}

async function getProductAddedToCart(shippingRate = 0.001) {
    const data = await pb.collection('cart').getFullList({
        filter: `user = "${getCurrentUser().id}"`,
        expand: 'product'
    });

    const orderContent = document.querySelector('.order-items');
    const first = document.querySelector('.first');
    const second = document.querySelector('.second');
    const third = document.querySelector('.third');
    const last = document.querySelector('.last');

    let subtotal = 0;
    let shipping = 0;
    const TAX_RATE = 0.0005;

    orderContent.innerHTML = '';
    
    data.forEach(pd => {
        const productData = pd.expand.product;
        const itemTotal = productData.price * pd.quantity;
        subtotal += itemTotal;
        shipping += productData.price * shippingRate * pd.quantity;

        orderContent.innerHTML +=
        `
            <div class="order-item">
                <div class="item-info">
                    <span class="item-name">${productData.name}</span>
                    <span class="item-qty">Qty: ${pd.quantity}</span>
                </div>
                <span class="item-price">$${itemTotal.toFixed(2)}</span>
            </div>
        `
    });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    if (first) first.textContent = subtotal.toFixed(2);
    if (second) second.textContent = shipping.toFixed(2);
    if (third) third.textContent = tax.toFixed(2);
    if (last) last.textContent = total.toFixed(2);
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
    checkAuth();
    displayUsername();
    ValidateInput()
    getProductAddedToCart()
});

const logOutBtn = document.querySelector('.log-out');
logOutBtn.addEventListener('click', () => {
    logOut();
});

const multiTabs = document.querySelectorAll('.payment-option, .shipping-option');
multiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabType = tab.classList.contains('payment-option') ? 'payment-option' : 'shipping-option';
        document.querySelectorAll('.' + tabType).forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

const options = document.querySelectorAll('[data-fee]');
options.forEach(option => {
    option.addEventListener('click', () => {
        const feeValue = option.dataset.fee.toLowerCase();
        document.querySelectorAll('[data-fee]').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        if(feeValue === 'standard') {
           getProductAddedToCart(0.001);
        } else if(feeValue === 'express') {
            getProductAddedToCart(0.004);
        } else if(feeValue === 'overnight') {
            getProductAddedToCart(0.007);
        }
    })
})

const goBack = document.querySelector('.return');
goBack.addEventListener('click', () => {
    window.location.href = '/public/cart.html';
})

