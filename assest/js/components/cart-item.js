import {  Modal } from "../components/modal.js";
class CartItem {

  remove() {
    const modal = new Modal();
    const newModal = modal.show({
      title: "Remove Item",
      message: "Are you sure you want to remove this item from your cart?",
      confirmText: "Remove",
      cancelText: "Cancel",
      onConfirm: () => {
        const element = document.querySelector(`[data-id="${this.id}"]`);
        element.classList.add("removing");
        setTimeout(() => {
          element.remove();
          this.updateCart();
        }, 300);
      },
    });

    newModal.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (action === "cancel") {
        modal.hide(newModal);
      }
    });
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
