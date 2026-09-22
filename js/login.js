const updateUserUI = () => {
  const username = localStorage.getItem('urbanCelUser') || 'Usuario';
  const labels = document.querySelectorAll('[data-user-label]');
  labels.forEach((label) => {
    label.textContent = username;
  });
};

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('urbanCelCart') || '[]');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartCount').forEach((element) => {
    element.textContent = count;
  });
};

const handleLogout = () => {
  localStorage.removeItem('urbanCelUser');
  window.location.href = 'login.html';
};

const handleLoginSubmit = (event) => {
  event.preventDefault();
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!emailInput.value || !passwordInput.value) {
    alert('Completa todos los campos para continuar.');
    return;
  }

  const username = emailInput.value.split('@')[0] || 'Usuario';
  localStorage.setItem('urbanCelUser', username);
  window.location.href = 'index.html';
};

const bindAuthEvents = () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  const createAccountBtn = document.getElementById('createAccountBtn');
  const recoverPasswordBtn = document.getElementById('recoverPasswordBtn');

  if (createAccountBtn) {
    createAccountBtn.addEventListener('click', () => alert('Funcionalidad de registro disponible pronto.'));
  }

  if (recoverPasswordBtn) {
    recoverPasswordBtn.addEventListener('click', () => alert('Recupera tu contraseña desde la opción de soporte.'));
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
};

const handleContactSubmit = (event) => {
  event.preventDefault();
  const form = document.getElementById('contactForm');
  if (!form) return;

  alert('Gracias por contactarnos. En breve te responderemos.');
  form.reset();
};

document.addEventListener('DOMContentLoaded', () => {
  updateUserUI();
  updateCartCount();
  bindAuthEvents();

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});
