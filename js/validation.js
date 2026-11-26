const orderForm = document.querySelector('#order-form');
const successMessage = document.querySelector('#success-message');

function showError(fieldName, message) {
  document.querySelector(`#${fieldName}-error`).textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach((element) => { element.textContent = ''; });
}

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();
  successMessage.textContent = '';

  const name = orderForm.elements.name.value.trim();
  const email = orderForm.elements.email.value.trim();
  const phone = orderForm.elements.phone.value.trim();
  let isValid = true;

  if (name.length < 2) { showError('name', 'Введите имя не короче двух символов.'); isValid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Введите корректный e-mail.'); isValid = false; }
  if (!/^\+?[\d\s()-]{10,}$/.test(phone)) { showError('phone', 'Введите корректный номер телефона.'); isValid = false; }

  if (isValid) {
    successMessage.textContent = 'Заявка подготовлена. Мы свяжемся с вами.';
    orderForm.reset();
  }
});

