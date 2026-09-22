const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('urbanCelCart') || '[]');
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem('urbanCelCart', JSON.stringify(cart));
};

const getCartImage = (item) => item.image || item.icon || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80';

const renderCartItems = () => {
  const container = document.getElementById('cartItems');
  if (!container) return;

  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = '<div class="empty-state">Tu carrito está vacío. Explora algunos productos.</div>';
    document.getElementById('subtotalPrice').textContent = '$0';
    document.getElementById('totalPrice').textContent = '$0';
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <div class="cart-item-thumb">
            <img src="${getCartImage(item)}" alt="${item.name}" />
          </div>
          <div>
            <h3>${item.name}</h3>
            <p>${item.category}</p>
            <div class="cart-item-controls">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="cart-item-price">
            <div>${formatCurrency(item.price * item.quantity)}</div>
            <button class="link-btn" data-action="remove" data-id="${item.id}">Eliminar</button>
          </div>
        </article>
      `,
    )
    .join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('subtotalPrice').textContent = formatCurrency(subtotal);
  document.getElementById('totalPrice').textContent = formatCurrency(subtotal);

  document.querySelectorAll('.qty-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const cartItems = getCart();
      const target = cartItems.find((entry) => entry.id === Number(button.dataset.id));
      if (!target) return;

      if (button.dataset.action === 'increase') {
        target.quantity += 1;
      }

      if (button.dataset.action === 'decrease') {
        target.quantity -= 1;
      }

      const nextCart = cartItems.filter((entry) => entry.quantity > 0);
      saveCart(nextCart);
      renderCartItems();
      document.querySelectorAll('#cartCount').forEach((element) => {
        const count = nextCart.reduce((sum, item) => sum + item.quantity, 0);
        element.textContent = count;
      });
    });
  });

  document.querySelectorAll('[data-action="remove"]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextCart = getCart().filter((item) => item.id !== Number(button.dataset.id));
      saveCart(nextCart);
      renderCartItems();
      document.querySelectorAll('#cartCount').forEach((element) => {
        const count = nextCart.reduce((sum, item) => sum + item.quantity, 0);
        element.textContent = count;
      });
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.querySelectorAll('#cartCount');
  const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
  cartCount.forEach((item) => {
    item.textContent = total;
  });

  renderCartItems();

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Pedido generado con éxito. Pronto te contactaremos.');
      localStorage.removeItem('urbanCelCart');
      renderCartItems();
      document.querySelectorAll('#cartCount').forEach((element) => {
        element.textContent = '0';
      });
    });
  }
});
