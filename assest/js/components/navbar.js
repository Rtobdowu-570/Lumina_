class Navbar {
  constructor(activeItem = dashboard) {
    this.activeItem = activeItem;
    this.menuItems = [
      { label: "Dashboard", href: "/dashboard", icon: "fa fa-home" },
      { label: "Products", href: "/products", icon: "fa fa-box" },
      { label: "Orders", href: "/orders", icon: "fa-light fa-cart-shopping" },
      { label: "Customers", href: "/customers", icon: "fa fa-user" },
      { label: "Settings", href: "/settings", icon: "fa-light fa-gear" },
      { label: "Logout", href: "/logout", icon: "fa fa-sign-out-alt" },
    ];
  }

  render() {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#EF4444"/>
            <path d="M16 8L20 12L16 16L12 12L16 8Z" fill="white"/>
            <path d="M16 16L20 20L16 24L12 20L16 16Z" fill="white" opacity="0.7"/>
          </svg>
          <span class="logo-text">LUMINA</span>
        </div>
      </div>
      <nav class="sidebar-nav">
      ${this.menuItems
        .map((item) => {
          <a
            href="${item.href}"
            class="nav-item ${item.label === this.activeItem ? 'activeItem' : ''}"
          >
            <span class="icon">${item.icon}</span>
            <span class="label">${item.label}</span>
          </a>;
        })
        .join("")}
      </nav>

      <div class="sidebar-footer">
          <div class="user-profile">
              <img src="${user_avatar}" alt="${user_name}" class="user-avatar">
              <div class="user-info">
                  <div class="user-name">${user_name}</div>
                  <div class="user-role">${user_role}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="log-out">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
          </div>
      </div>
    `;
    return sidebar;
  }
}

export { Navbar };
