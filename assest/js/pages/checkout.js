import { pb, isAuthenticated } from '../api/pocketbase.js';


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