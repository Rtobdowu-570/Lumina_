import { pb, isAuthenticated } from '../api/pocketbase.js';
import { ProductCard } from "../components/product-card.js";
// prevent user from viewing dashboard if not logged in
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

async function displayUserData() {
    if (!isAuthenticated()) return;
    const userId = pb.authStore.model ? pb.authStore.model.id : null;
    if (!userId) return;

    try {
        const user = await pb.collection('users').getOne(userId);

        const output = `
                <div class="stat-img">
                    <img src="${user.avatar || '/assest/images/placeholder.jpg'}" alt="${user.name || ''}" class="user-avatar stat"></div>
                <div class="stat-content user-data">
                    <div class="stat-value">${user.name || ''} <span class="edit-profile-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                    </span></div>
                    <div class="stat-label">${user.email || ''}</div>
                    <div class="stat-label">${user.user_name || ''}</div>
                </div>`;
        
        const container = document.querySelector('.user-stats');
        if (container) {
            container.innerHTML = output;
        } else {
            console.warn('No container found for user data');
        }
    } catch (err) {
        console.error('Failed to fetch current user:', err);
    }
}

function getStatusHTML(order) {
    let statusClass = '';
    let statusText = '';

    if (order.delivered) {
        statusClass = 'delivered';
        statusText = 'Delivered';
    } else if (order.shipped) {
        statusClass = 'shipped';
        statusText = 'Shipped';
    } else if (order.successful) {
        statusClass = 'delivered';
        statusText = 'Successful';
    } else if (order.failed) {
        statusClass = 'failed';
        statusText = 'Failed';
    } else {
        statusClass = 'processing';
        statusText = 'Processing';
    }

    return `<span class="status-badge ${statusClass}">${statusText}</span>`;
}

async function displayUserOrder() {
    const orderContainer = document.querySelector('.orders-table')
    const userId = getCurrentUser().id;

    const orderData = await pb.collection('checkout').getFullList({
        filter: `user = "${getCurrentUser().id}"`
    });
    const row = document.createElement('div');
    const year = new Date().getFullYear();
    orderData.forEach(order => {

        if(order.delivered === true || order.shipped === true || order.successful === true || order.failed === true) {
        }

        row.className = 'table-row';
        row.innerHTML = `
        <div class="table-cell">#ORD-${year}-${(order.id).slice(0, 3).toUpperCase()}</div>
        <div class="table-cell">${order.created.slice(0, 10)}</div>
        <div class="table-cell">${order.items.length} items</div>
        <div class="table-cell">$${order.total}</div>
        <div class="table-cell">${getStatusHTML(order)}</div>
        <div class="table-cell"><button class="view-btn">View</button></div>
    `
    })
    orderContainer.appendChild(row);
}

async function displayWhitelstedItems() {
    const whitelist = document.querySelector('.whitelist-items');
    whitelist.innerHTML ='';

    const userId = getCurrentUser().id;
    const whitelistedItems = await pb.collection('products').getFullList({
        filter: `whitelisted_by ~ "${getCurrentUser().id}"`
    }); 

    whitelistedItems.forEach(item => {
        const image = item.image ? pb.files.getURL(item, item.image) : '/assest/images/placeholder.png';
        
        whitelist.innerHTML += `
        <div class="product-card-home">
        <a href="product-detail.html?id=${item.id}" class="product-image-home">
          <img src= "${image}" alt="${item.name}" />
        </a>
        <div class="product-info-home">
          <span class="product-category-home">${item.category}</span>
          <h3 class="product-name-home">${item.name}</h3>
          <div class="product-footer-home">
            <button class="btn-icon" aria-label="Add to cart" data-action="add-to-cart">
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

        const addToCartBtn = whitelist.querySelector(`[data-action="add-to-cart"]`);
        addToCartBtn.addEventListener('click', () => {
            const productCard = new ProductCard();
            productCard.addToCart(item);
        });
    })
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    displayUsername();
    displayUserData();
    displayUserOrder();
    displayWhitelstedItems();
});

export { logOut, getCurrentUser, checkAuth, displayUsername };