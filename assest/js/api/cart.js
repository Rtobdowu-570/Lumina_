async function loadCart() {
    try{
        const cartItems = await pb.collection('cart').getFullList({
            filter: `user = "${pb.authStore.model.id}"`,
            expand: 'product',
        });

        const cartContainer = document.querySelector('.cart-items');
        cartContainer.innerHTML = '';

        let total = 0;
        cartItems.forEach(item => {
            const product = item.expand.product;
            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" />
                <div class="item-details">
                    <h4>${product.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${itemTotal.toFixed(2)}</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        const totalElement = document.querySelector('.cart-total');
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    } catch(err) {
        console.error("Error loading cart:", err);
    }
}