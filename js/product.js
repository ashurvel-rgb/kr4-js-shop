import { products } from './data.js';
import { addToCart } from './main.js';
const root = document.querySelector('[data-product-detail]');
const id = Number(new URLSearchParams(location.search).get('id') || 1);
const product = products.find((item) => item.id === id);
if (root) {
  if (!product) { root.textContent = 'Товар не найден. Вернитесь в каталог.'; root.className = 'empty-state'; }
  else {
    const image = document.createElement('img'); image.src = product.image; image.alt = product.title; image.className = 'detail__image';
    const info = document.createElement('div'); const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = `${product.category} · ★ ${product.rating}`;
    const title = document.createElement('h1'); title.textContent = product.title;
    const text = document.createElement('p'); text.textContent = product.description;
    const price = document.createElement('p'); price.className = 'detail__price'; price.textContent = `${product.price.toLocaleString('ru-RU')} ₽`;
    const button = document.createElement('button'); button.className = 'button'; button.textContent = product.isAvailable ? 'Добавить в корзину' : 'Нет в наличии'; button.disabled = !product.isAvailable; button.addEventListener('click', () => addToCart(product.id));
    info.append(eyebrow, title, text, price, button); root.append(image, info);
  }
}

