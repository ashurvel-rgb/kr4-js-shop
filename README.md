# Контрольная работа №4 — JavaScript-магазин

Тема: JavaScript, интерактивность, DOM, события, формы и валидация. Проект создан на основе КР №3 `kr3-responsive-shop`.

## Структура

- HTML-страницы: `index.html`, `catalog.html`, `product.html`, `cart.html`, `order.html`, `contacts.html`.
- Стили: `css/style.css`, `css/responsive.css`.
- JavaScript: `js/data.js`, `catalog.js`, `cart.js`, `modal.js`, `validation.js`, `main.js`.
- Изображения находятся в `images`.

## JavaScript-файлы

- `data.js` — массив из восьми товаров с одинаковой структурой.
- `catalog.js` — генерация карточек, поиск, фильтрация, сортировка, счётчик и пустое состояние.
- `modal.js` — открытие и закрытие окна с информацией о товаре.
- `validation.js` — проверка имени, e-mail и телефона.
- `cart.js` — базовое состояние страницы корзины.
- `main.js` — общая инициализация.

Карточки создаются с помощью `createElement`, `classList` и `append`. Данные выводятся через `textContent`, без небезопасного `innerHTML`. События подключены через `addEventListener`.

## Запуск

Откройте `index.html` через расширение Live Server в VS Code.

GitHub Pages: https://ashurvel-rgb.github.io/kr4-js-shop/

Автор: Велиханов Ашурбег Мадрудинович, группа ЭФБО-17-25.
