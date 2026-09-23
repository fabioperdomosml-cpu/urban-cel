const products = [
  {
    id: 1,
    name: 'iPhone 13',
    category: 'Celulares',
    rating: 4.8,
    price: 1200000,
    description: 'Rendimiento potente, cámara avanzada y diseño elegante.',
    image: 'https://th.bing.com/th/id/R.6f741d98cbfb8c15b0f95e217b729867?rik=u4%2fDe%2b%2fYomNfJw&riu=http%3a%2f%2fcatalogo.claro.com.ec%2fuploads%2fimgs%2fproductos%2fiphone-13-128gb%2fazul%2fzoom%2f01-iphone-13-128gb-azul-front.png&ehk=Yfb%2b6%2f4wBEtpiaUVblK7iJvkpfhGr%2f4uQqIOWqVRiRg%3d&risl=&pid=ImgRaw&r=0',
    featured: true,
  },
  {
    id: 2,
    name: 'Honor X8a',
    category: 'Celulares',
    rating: 4.7,
    price: 600000,
    description: 'Pantalla amplia, batería duradera y excelente experiencia diaria.',
    image: 'https://www.honor.com/co/phones/honor-x8a/spec/',
    featured: true,
  },
  {
    id: 3,
    name: 'Samsung Galaxy A05s',
    category: 'Celulares',
    rating: 4.6,
    price: 520000,
    description: 'Un celular confiable con gran pantalla y batería para todo el día.',
    image: 'https://www.smart-gsm.com/moviles/samsung-galaxy-a05s',
    featured: true,
  },
  {
    id: 4,
    name: 'OPPO A20',
    category: 'Celulares',
    rating: 4.6,
    price: 590000,
    description: 'Diseño moderno, buen rendimiento y almacenamiento para tus aplicaciones.',
    image: 'https://www.falabella.com.co/falabella-co/product/151408981/celular-oppo-a20-4gb-ram-128gb-azul/151408982',
    featured: true,
  },
  {
    id: 5,
    name: 'Xbox Series S',
    category: 'Consolas',
    rating: 4.9,
    price: 1390000,
    description: 'Consola compacta de nueva generación para disfrutar tus juegos favoritos.',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
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
    existing.image = product.image;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  setCart(cart);
  updateCartCount();
  alert(`${product.name} agregado al carrito.`);
};

const renderProductCard = (product) => `
  <article class="product-card" data-id="${product.id}">
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
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
