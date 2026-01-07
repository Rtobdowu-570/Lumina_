import { CartItem } from "../components/cart-item.js";
import { checkAuth, displayUsername, logOut, getCurrentUser } from "../pages/dashboard.js";

async function displayCart() {
    const userId = getCurrentUser();
    const data = await pb.collection('cart').getFullList({
        filter: `user = '${userId}'`,
        expand: 'product'
    });

    const cartContainer = document.querySelector('#cart-items');
    cartContainer.innerHTML = '';

    data.forEach(item => {
        productData = item.expand.product;
        
    });
}