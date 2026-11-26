import { products } from './data.js';
import { addToCart, readStorage, toggleFavorite, FAVORITES_KEY } from './main.js';
import { openProductDialog } from './modal.js';

const grid = document.querySelector('[data-products]');
const search = document.querySelector('[data-search]');
const category = document.querySelector('[data-category]');
const sort = document.querySelector('[data-sort]');
const count = document.querySelector('[data-result-count]');

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  const image = document.createElement('img');
  image.className = 'product-card__image'; image.src = product.image; image.alt = product.title; image.loading = 'lazy';
  const body = document.createElement('div'); body.className = 'product-card__body';
  const meta = document.createElement('p'); meta.className = 'product-card__meta'; meta.textContent = `${product.category} · ★ ${product.rating}`;
  const title = document.createElement('h2'); title.className = 'product-card__title'; title.textContent = product.title;
  const description = document.createElement('p'); description.className = 'product-card__description'; description.textContent = product.description;
  const price = document.createElement('p'); price.className = 'product-card__price'; price.textContent = `${product.price.toLocaleString('ru-RU')} ₽`;
  const actions = document.createElement('div'); actions.className = 'product-card__actions';
  const details = document.createElement('a'); details.className = 'button button--ghost'; details.href = `product.html?id=${product.id}`; details.textContent = 'Подробнее';
  const preview = document.createElement('button'); preview.className = 'link-button'; preview.type = 'button'; preview.textContent = 'Быстрый просмотр'; preview.addEventListener('click', () => openProductDialog(product));
  const buy = document.createElement('button'); buy.className = 'button'; buy.type = 'button'; buy.textContent = product.isAvailable ? 'В корзину' : 'Нет в наличии'; buy.disabled = !product.isAvailable;
  buy.addEventListener('click', () => addToCart(product.id));
  const favorite = document.createElement('button'); favorite.className = 'favorite'; favorite.type = 'button';
  const paintFavorite = () => { favorite.textContent = readStorage(FAVORITES_KEY).includes(product.id) ? '♥' : '♡'; favorite.setAttribute('aria-label', 'Добавить в избранное'); };
  favorite.addEventListener('click', () => { toggleFavorite(product.id); paintFavorite(); }); paintFavorite();
  actions.append(details, buy, favorite, preview); body.append(meta, title, description, price, actions); card.append(image, body); return card;
}

function render() {
  if (!grid) return;
  const query = search.value.trim().toLowerCase();
  let result = products.filter((item) => item.title.toLowerCase().includes(query) && (!category.value || item.category === category.value));
  result = [...result].sort((a, b) => sort.value === 'price-asc' ? a.price - b.price : sort.value === 'price-desc' ? b.price - a.price : sort.value === 'name' ? a.title.localeCompare(b.title, 'ru') : b.rating - a.rating);
  grid.replaceChildren(); count.textContent = `Найдено: ${result.length}`;
  if (!result.length) { const empty = document.createElement('p'); empty.className = 'empty-state'; empty.textContent = 'По вашему запросу ничего не найдено. Измените фильтры.'; grid.append(empty); return; }
  result.forEach((product) => grid.append(createCard(product)));
}
[search, category, sort].forEach((control) => control?.addEventListener(control === search ? 'input' : 'change', render));
render();
