import { formatPrice } from '../utils/format.js';

const grid      = document.getElementById('product-grid');
const loading   = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const categoryBar = document.getElementById('category-bar');

export function showLoading() {
  loading.classList.remove('d-none');
  grid.classList.add('d-none');
}

export function hideLoading() {
  loading.classList.add('d-none');
  grid.classList.remove('d-none');
}

export function showEmpty() {
  emptyState.classList.remove('d-none');
  grid.classList.add('d-none');
}

export function hideEmpty() {
  emptyState.classList.add('d-none');
}

export function renderCategories(categories, activeCategory = null) {
  const allBtn = `
    <button
      class="btn btn-sm ${activeCategory === null ? 'btn-primary' : 'btn-outline-secondary'} category-btn"
      data-category=""
    >Todos</button>`;

  const catBtns = categories.map(cat => `
    <button
      class="btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-outline-secondary'} category-btn text-capitalize"
      data-category="${cat}"
    >${cat}</button>`).join('');

  categoryBar.innerHTML = allBtn + catBtns;
}

function buildStars(rate) {
  const full  = Math.round(rate);
  const stars = '★'.repeat(full) + '☆'.repeat(5 - full);
  return `<span class="text-warning" aria-label="Puntuación: ${rate} de 5">${stars}</span>
          <small class="text-muted ms-1">${rate}</small>`;
}

function cardHTML(product) {
  return `
    <div class="col">
      <div class="card h-100 product-card shadow-sm">
        <img
          src="${product.image}"
          class="card-img-top product-card__img"
          alt="${product.title}"
          loading="lazy"
        />
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary text-capitalize mb-2">${product.category}</span>
          <h3 class="card-title product-card__title h6">${product.title}</h3>
          <div class="mb-2">${buildStars(product.rate)}</div>
          <p class="fs-5 fw-bold mt-auto mb-3">${formatPrice(product.price)}</p>
          <div class="d-grid gap-2">
            <button
              class="btn btn-outline-primary btn-sm"
              data-action="detail"
              data-id="${product.id}"
            >Ver detalle</button>
            <button
              class="btn btn-primary btn-sm"
              data-action="add-to-cart"
              data-id="${product.id}"
            ><i class="bi bi-cart-plus"></i> Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>`;
}

export function renderProducts(products) {
  if (products.length === 0) {
    showEmpty();
    grid.innerHTML = '';
    return;
  }
  hideEmpty();
  grid.innerHTML = products.map(cardHTML).join('');
}

export function showProductModal(product) {
  document.getElementById('product-modal-title').textContent = product.title;
  document.getElementById('product-modal-body').innerHTML = `
    <div class="text-center mb-3">
      <img
        src="${product.image}"
        alt="${product.title}"
        class="product-modal__img"
      />
    </div>
    <span class="badge bg-secondary text-capitalize mb-2">${product.category}</span>
    <div class="mb-2">${buildStars(product.rate)}</div>
    <p class="text-muted">${product.description}</p>
    <p class="fs-4 fw-bold">${formatPrice(product.price)}</p>
    <button
      class="btn btn-primary w-100"
      data-action="add-to-cart"
      data-id="${product.id}"
    ><i class="bi bi-cart-plus"></i> Agregar al carrito</button>`;

  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('product-modal'));
  modal.show();
}
