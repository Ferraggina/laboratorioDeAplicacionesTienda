import { formatPrice } from '../utils/format.js';

const cartItems  = document.getElementById('cart-items');
const cartEmpty  = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartTotal  = document.getElementById('cart-total');
const cartBadge  = document.getElementById('cart-badge');

function itemHTML(item) {
  return `
    <li class="cart-item">
      <img src="${item.image}" alt="${item.title}" />
      <div class="flex-grow-1 overflow-hidden">
        <p class="mb-0 text-truncate small fw-semibold">${item.title}</p>
        <small class="text-muted">${formatPrice(item.price)} c/u</small>
        <div class="d-flex align-items-center justify-content-between mt-1">
          <div class="qty-controls">
            <button class="btn btn-outline-secondary btn-sm" data-action="decrement" data-id="${item.id}">−</button>
            <span class="px-2">${item.quantity}</span>
            <button class="btn btn-outline-secondary btn-sm" data-action="increment" data-id="${item.id}">+</button>
          </div>
          <button class="btn btn-link btn-sm text-danger p-0" data-action="remove" data-id="${item.id}">
            <i class="bi bi-trash3"></i> Quitar
          </button>
        </div>
      </div>
    </li>`;
}

export function renderCart(items, total) {
  const empty = items.length === 0;

  cartEmpty.classList.toggle('d-none', !empty);
  cartFooter.classList.toggle('d-none', empty);

  cartItems.innerHTML = empty ? '' : items.map(itemHTML).join('');
  cartTotal.textContent = formatPrice(total);
}

export function updateBadge(count) {
  cartBadge.textContent = count;
  cartBadge.classList.toggle('d-none', count === 0);
}
