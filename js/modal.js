const productDialog = document.querySelector('#product-dialog');
const closeDialogButton = document.querySelector('#close-dialog');

function openProductModal(product) {
  document.querySelector('#dialog-title').textContent = product.title;
  document.querySelector('#dialog-price').textContent = `${product.price.toLocaleString('ru-RU')} руб.`;
  document.querySelector('#dialog-status').textContent = product.isAvailable ? 'Товар есть в наличии.' : 'Товар временно отсутствует.';
  productDialog.showModal();
}

closeDialogButton.addEventListener('click', () => productDialog.close());

