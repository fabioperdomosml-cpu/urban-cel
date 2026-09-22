const products = [
  {
    id: 1,
    name: 'iPhone 13',
    category: 'Celulares',
    rating: 4.8,
    price: 1200000,
    description: 'Rendimiento potente, cámara avanzada y diseño elegante.',
    icon: '📱',
    featured: true,
  },
  {
    id: 2,
    name: 'Honor X8a',
    category: 'Celulares',
    rating: 4.7,
    price: 600000,
    description: 'Pantalla amplia, batería duradera y excelente experiencia diaria.',
    icon: '📱',
    featured: true,
  },
  {
    id: 3,
    name: 'Samsung Galaxy A05s',
    category: 'Celulares',
    rating: 4.6,
    price: 520000,
    description: 'Un celular confiable con gran pantalla y batería para todo el día.',
    icon: '📱',
    featured: true,
  },
  {
    id: 4,
    name: 'OPPO A20',
    category: 'Celulares',
    rating: 4.6,
    price: 580000,
    description: 'Diseño moderno, buen rendimiento y almacenamiento para tus aplicaciones.',
    icon: '📱',
    featured: true,
  },
  {
    id: 5,
    name: 'Xbox Series S',
    category: 'Consolas',
    rating: 4.9,
    price: 1390000,
    description: 'Consola compacta de nueva generación para disfrutar tus juegos favoritos.',
    icon: '🎮',
    featured: true,
  },
];

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('urbanCelCart') || '[]');
  } catch {
    return [];
  }
};

const setCart = (cart) => {
  localStorage.setItem('urbanCelCart', JSON.stringify(cart));
};

const updateCartCount = () => {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartCount').forEach((element) => {
    element.textContent = count;
  });
};

const addToCart = (productId) => {
  const product = products.find((item) => item.id === Number(productId));
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === Number(productId));

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  setCart(cart);
  updateCartCount();
  alert(`${product.name} agregado al carrito.`);
};

const renderProductCard = (product) => `
  <article class="product-card" data-id="${product.id}">
    <div class="product-image">${product.icon}</div>
    <div class="product-body">
      <div class="product-topline">
        <span class="product-tag">${product.category}</span>
        <span class="product-rating">★ ${product.rating}</span>
      </div>
      <h3>${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <div class="product-meta">
        <span class="product-price">${currency.format(product.price)}</span>
        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar</button>
      </div>
    </div>
  </article>
`;

const renderFeaturedProducts = () => {
  const featuredContainer = document.getElementById('featuredProducts');
  if (!featuredContainer) return;

  featuredContainer.innerHTML = products.map(renderProductCard).join('');
  bindAddToCartButtons();
};

const renderCatalogProducts = (filter = 'todos') => {
  const catalogContainer = document.getElementById('catalogProducts');
  if (!catalogContainer) return;

  const filteredProducts = filter === 'todos'
    ? products
    : products.filter((product) => product.category === filter);

  catalogContainer.innerHTML = filteredProducts.length
    ? filteredProducts.map(renderProductCard).join('')
    : '<div class="empty-state">No hay productos disponibles en esta categoría.</div>';

  bindAddToCartButtons();
};

const bindAddToCartButtons = () => {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(button.dataset.id));
  });
};

const setupFilters = () => {
  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderCatalogProducts(button.dataset.filter);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderFeaturedProducts();
  renderCatalogProducts();
  setupFilters();
});
