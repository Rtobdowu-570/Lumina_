class Modal {
  constructor(options) {
    this.title = options.title || "Confirm"
    this.message = options.message || "Are you sure?"
    this.confirmText = options.confirmText || "Confirm"
    this.cancelText = options.cancelText || "Cancel"
    this.onConfirm = options.onConfirm || (() => {})
    this.onCancel = options.onCancel || (() => {})
  }

  show() {
    const modal = document.createElement("div")
    modal.className = "modal-overlay"

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
        <h2>  </h2>
          <h3>${this.title}</h3>
          <button class="modal-close" data-action="close">×</button>
        </div>
        <div class="modal-body">
          <p>${this.message}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn cancel-btn" data-action="cancel">${this.cancelText}</button>
          <button class="modal-btn confirm-btn" data-action="confirm">${this.confirmText}</button>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    setTimeout(() => modal.classList.add("show"), 10)

    modal.addEventListener("click", (e) => {
      const action = e.target.dataset.action

      if (action === "confirm") {
        this.onConfirm()
        this.hide(modal)
      } else if (action === "cancel" || action === "close") {
        this.onCancel()
        this.hide(modal)
      } else if (e.target === modal) {
        this.hide(modal)
      }
    })
  }


  onConfirm() {
    const element = document.querySelector(`[data-id="${this.id}"]`)
    element.classList.add("removing")
    setTimeout(() => {
    element.remove()
    this.updateCart()
    }, 300)
  }

  onCancel(modal) {
    this.hide(modal)
  }

  static show(options) {
    const modal = new Modal(options)
    modal.show()
  }

  hide(modal) {
    modal.classList.remove("show")
    setTimeout(() => modal.remove(), 300)
  }
}

export { Modal }
