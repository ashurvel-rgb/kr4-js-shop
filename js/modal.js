export function openProductDialog(product) {
  const dialog = document.querySelector('[data-product-dialog]');
  if (!dialog) return;
  dialog.querySelector('[data-dialog-image]').src = product.image;
  dialog.querySelector('[data-dialog-image]').alt = product.title;
  dialog.querySelector('[data-dialog-title]').textContent = product.title;
  dialog.querySelector('[data-dialog-description]').textContent = product.description;
  dialog.querySelector('[data-dialog-price]').textContent = `${product.price.toLocaleString('ru-RU')} ₽`;
  dialog.showModal();
}
document.querySelector('[data-dialog-close]')?.addEventListener('click', () => document.querySelector('[data-product-dialog]').close());

