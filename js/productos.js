const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'Celulares',
    rating: 4.9,
    price: 1299,
    description: 'Pantalla Super Retina, chip A17 Pro y cámara pro avanzada.',
    icon: '📱',
    featured: true,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    category: 'Celulares',
    rating: 4.8,
    price: 1099,
    description: 'Potencia, creatividad y diseño premium para cada día.',
    icon: '📱',
    featured: true,
  },
  {
    id: 3,
    name: 'AirPods Pro',
    category: 'Audífonos',
    rating: 4.9,
    price: 219,
    description: 'Audio inmersivo con cancelación activa de ruido.',
    icon: '🎧',
    featured: true,
  },
  {
    id: 4,
    name: 'Cargador USB-C 65W',
    category: 'Cargadores',
    rating: 4.7,
    price: 79,
    description: 'Carga rápida y compatible con varios dispositivos.',
    icon: '🔌',
    featured: false,
  },
  {
    id: 5,
    name: 'Cable USB-C a USB-C',
    category: 'Cables',
    rating: 4.6,
    price: 29,
    description: 'Cable duradero con transferencia rápida y conexión estable.',
    icon: '🔋',
    featured: false,
  },
  {
    id: 6,
    name: 'Funda Armor X',
    category: 'Fundas',
    rating: 4.8,
    price: 49,
    description: 'Protección resistente y estilo minimalista.',
    icon: '🧤',
    featured: false,
  },
  {
    id: 7,
    name: 'Smartwatch Urban Fit',
    category: 'Accesorios tecnológicos',
    rating: 4.7,
    price: 249,
    description: 'Monitorea salud, actividad y notificaciones en tiempo real.',
    icon: '⌚',
    featured: true,
  },
  {
    id: 8,
    name: 'Soporte para auto',
    category: 'Accesorios tecnológicos',
    rating: 4.6,
    price: 39,
    description: 'Mantén tu teléfono seguro y visible al conducir.',
    icon: '📲',
    featured: false,
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

  const featured = products.filter((product) => product.featured).slice(0, 4);
  featuredContainer.innerHTML = featured.map(renderProductCard).join('');
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

const renderAccessoryProducts = () => {
  const accessoryContainer = document.getElementById('accessoryProducts');
  if (!accessoryContainer) return;

  const accessories = products.filter((product) => product.category !== 'Celulares');
  accessoryContainer.innerHTML = accessories.length
    ? accessories.map(renderProductCard).join('')
    : '<div class="empty-state">Próximamente más accesorios.</div>';

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
  renderAccessoryProducts();
  setupFilters();
});
