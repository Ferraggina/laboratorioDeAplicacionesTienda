import { formatPrice } from '../utils/format.js';

const cartItems  = document.getElementById('cart-items');
const cartEmpty  = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartTotal  = document.getElementById('cart-total');
const cartBadge  = document.getElementById('cart-badge');

function itemHTML(item) {
  return `
    <li class="cart-item d-flex align-items-center gap-2 py-2 border-bottom">
      <img src="${item.image}" alt="${item.title}" class="cart-item__img rounded" />
      <div class="flex-grow-1 overflow-hidden">
        <p class="cart-item__title mb-1 text-truncate">${item.title}</p>
        <small class="text-muted">${formatPrice(item.price)} c/u</small>
      </div>
      <div class="d-flex flex-column align-items-center gap-1">
        <div class="input-group input-group-sm cart-item__qty">
          <button class="btn btn-outline-secondary" data-action="decrement" data-id="${item.id}">−</button>
          <span class="input-group-text">${item.quantity}</span>
          <button class="btn btn-outline-secondary" data-action="increment" data-id="${item.id}">+</button>
        </div>
        <button class="btn btn-link btn-sm text-danger p-0" data-action="remove" data-id="${item.id}">
          <i class="bi bi-trash3"></i> Quitar
        </button>
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
