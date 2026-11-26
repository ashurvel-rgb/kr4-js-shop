const productsContainer = document.querySelector("#products");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-select");
const productsCount = document.querySelector("#products-count");
const emptyMessage = document.querySelector("#empty-message");

function createProductCard(product) {
  const article = document.createElement("article");
  article.classList.add("product-card");

  const image = document.createElement("img");
  image.classList.add("product-card__image");
  image.src = product.image;
  image.alt = product.title;

  const title = document.createElement("h2");
  title.classList.add("product-card__title");
  title.textContent = product.title;

  const price = document.createElement("p");
  price.classList.add("product-card__price");
  price.textContent = `${product.price.toLocaleString("ru-RU")} руб.`;

  const status = document.createElement("p");
  status.textContent = product.isAvailable ? "В наличии" : "Нет в наличии";

  const button = document.createElement("button");
  button.classList.add("button");
  button.type = "button";
  button.textContent = "Подробнее";
  button.addEventListener("click", () => openProductModal(product));

  article.append(image, title, price, status, button);
  return article;
}

function renderProducts() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const categoryValue = categoryFilter.value;
  const sortValue = sortSelect.value;

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchValue);
    const matchesCategory =
      categoryValue === "all" || product.category === categoryValue;
    return matchesSearch && matchesCategory;
  });

  if (sortValue === "price-asc")
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  if (sortValue === "price-desc")
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  if (sortValue === "title")
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title, "ru"),
    );

  productsContainer.replaceChildren();
  filteredProducts.forEach((product) =>
    productsContainer.append(createProductCard(product)),
  );
  productsCount.textContent = `Найдено товаров: ${filteredProducts.length}`;
  emptyMessage.hidden = filteredProducts.length !== 0;
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);
renderProducts();
