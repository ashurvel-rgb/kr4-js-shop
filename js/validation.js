const form = document.querySelector('[data-order-form]');
const validators = {
  name: (value) => value.trim().length >= 2 ? '' : 'Введите не менее двух символов.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Введите корректный e-mail.',
  phone: (value) => /^\+?[\d\s()-]{10,}$/.test(value) ? '' : 'Введите корректный телефон.',
  consent: (_, field) => field.checked ? '' : 'Подтвердите согласие.'
};
function validate(field) { const message = validators[field.name]?.(field.value, field) ?? ''; const error = form.querySelector(`[data-error-for="${field.name}"]`); error.textContent = message; field.setAttribute('aria-invalid', String(Boolean(message))); return !message; }
form?.querySelectorAll('input, textarea, select').forEach((field) => field.addEventListener('blur', () => validate(field)));
form?.addEventListener('submit', (event) => { event.preventDefault(); const fields = [...form.querySelectorAll('[name]')]; if (!fields.every(validate)) return; form.reset(); document.querySelector('[data-form-success]').hidden = false; localStorage.removeItem('kr4-order-draft'); });
form?.addEventListener('input', () => { const draft = Object.fromEntries(new FormData(form)); localStorage.setItem('kr4-order-draft', JSON.stringify(draft)); });

