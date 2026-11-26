const CART_KEY = 'kr4-cart';
const FAVORITES_KEY = 'kr4-favorites';

export function readStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)) ?? []; } catch { return []; }
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  updateBadges();
}

export function addToCart(id) {
  const cart = readStorage(CART_KEY);
  const item = cart.find((entry) => entry.id === id);
  item ? item.quantity += 1 : cart.push({ id, quantity: 1 });
  writeStorage(CART_KEY, cart);
  showToast('Товар добавлен в корзину');
}

export function toggleFavorite(id) {
  const favorites = readStorage(FAVORITES_KEY);
  const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
  writeStorage(FAVORITES_KEY, next);
  return next.includes(id);
}

export function updateBadges() {
  const total = readStorage(CART_KEY).reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = String(total); });
}

export function showToast(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('toast--visible');
  window.setTimeout(() => toast.classList.remove('toast--visible'), 2200);
}

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('kr4-theme', dark ? 'dark' : 'light');
});
if (localStorage.getItem('kr4-theme') === 'dark') document.documentElement.classList.add('dark');
updateBadges();

export { CART_KEY, FAVORITES_KEY };

