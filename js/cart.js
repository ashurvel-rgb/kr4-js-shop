import { products } from './data.js';
import { CART_KEY, readStorage, writeStorage } from './main.js';
const list = document.querySelector('[data-cart-list]');
const totalNode = document.querySelector('[data-cart-total]');
let promo = 0;
function render() {
  const cart = readStorage(CART_KEY); list.replaceChildren();
  if (!cart.length) { const empty = document.createElement('p'); empty.className = 'empty-state'; empty.textContent = 'Корзина пока пуста. Добавьте товары из каталога.'; list.append(empty); totalNode.textContent = '0 ₽'; return; }
  cart.forEach((entry) => {
    const product = products.find((item) => item.id === entry.id); if (!product) return;
    const row = document.createElement('article'); row.className = 'cart-row';
    const image = document.createElement('img'); image.src = product.image; image.alt = product.title;
    const info = document.createElement('div'); const title = document.createElement('h2'); title.textContent = product.title; const price = document.createElement('p'); price.textContent = `${product.price.toLocaleString('ru-RU')} ₽ × ${entry.quantity}`; info.append(title, price);
    const controls = document.createElement('div'); controls.className = 'cart-row__controls';
    for (const [label, delta] of [['−', -1], ['+', 1]]) { const button = document.createElement('button'); button.className = 'icon-button'; button.textContent = label; button.addEventListener('click', () => change(entry.id, delta)); controls.append(button); }
    const remove = document.createElement('button'); remove.className = 'link-button'; remove.textContent = 'Удалить'; remove.addEventListener('click', () => { writeStorage(CART_KEY, cart.filter((item) => item.id !== entry.id)); render(); }); controls.append(remove);
    row.append(image, info, controls); list.append(row);
  });
  const total = cart.reduce((sum, item) => sum + (products.find((p) => p.id === item.id)?.price ?? 0) * item.quantity, 0);
  totalNode.textContent = `${Math.round(total * (1 - promo)).toLocaleString('ru-RU')} ₽${promo ? ' со скидкой 10%' : ''}`;
}
function change(id, delta) { const cart = readStorage(CART_KEY).map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0); writeStorage(CART_KEY, cart); render(); }
document.querySelector('[data-promo-form]')?.addEventListener('submit', (event) => { event.preventDefault(); const value = document.querySelector('[data-promo]').value.trim().toUpperCase(); promo = value === 'STUDENT10' ? .1 : 0; document.querySelector('[data-promo-message]').textContent = promo ? 'Промокод применён' : 'Промокод не найден'; render(); });
render();

