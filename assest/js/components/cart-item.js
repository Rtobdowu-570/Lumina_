import {  Modal } from "../components/modal.js";
import { pb } from "../api/pocketbase.js";
class CartItem {

  remove(element) {
    const config = {
      title: "Remove Item",
      message: "Are you sure you want to remove this item from your cart?",
      confirmText: "Remove",
      cancelText: "Cancel",
      onConfirm: async () => {
        if (element) {
          try {
            // Delete from server
            await pb.collection('cart').delete(element.dataset.id);
            element.classList.add("removing");
            setTimeout(() => {
              element.remove();
              this.updateCart();
            }, 300);
          } catch (err) {
            console.error('Failed to delete cart item:', err);
          }
        }
      },
      onCancel: () => {
        const modal = document.querySelector(".modal");
        if (modal) {
          modal.classList.remove("show");
          setTimeout(() => modal.remove(), 300);
        }
      },
    };
    const modal = new Modal(config);
    modal.show();
  }

  updateCart() {
    window.dispatchEvent(new CustomEvent("cart-updated"));
  }

  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

export { CartItem };
