import { getProducts, getCategories, getProductsByCategory } from './services/productService.js';
import { addItem, increment, decrement, removeItem, emptyCart, getItems, getTotal, getCount } from './core/cart.js';
import { renderProducts, renderCategories, showLoading, hideLoading, showProductModal } from './ui/productView.js';
import { renderCart, updateBadge } from './ui/cartView.js';
import { toast, confirm, success } from './ui/notify.js';

// Estado local del orquestador
let allProducts    = [];
let categories     = [];
let activeCategory = null;

function refreshCart() {
  renderCart(getItems(), getTotal());
  updateBadge(getCount());
}

async function loadProducts(category = null) {
  showLoading();
  try {
    allProducts = category
      ? await getProductsByCategory(category)
      : await getProducts();
    renderProducts(allProducts);
  } catch (e) {
    toast(e.message, 'error');
  } finally {
    hideLoading();
  }
}

// --- Handlers de eventos ---

function onGridClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id      = Number(btn.dataset.id);
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

  if (btn.dataset.action === 'add-to-cart') {
    addItem(product);
    refreshCart();
    toast(`"${product.title}" agregado al carrito`);
  } else if (btn.dataset.action === 'detail') {
    showProductModal(product);
  }
}

function onModalClick(e) {
  const btn = e.target.closest('[data-action="add-to-cart"]');
  if (!btn) return;
  const id      = Number(btn.dataset.id);
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  addItem(product);
  refreshCart();
  toast(`"${product.title}" agregado al carrito`);
}

function onCartClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id     = Number(btn.dataset.id);
  const action = btn.dataset.action;
  if (action === 'increment')   increment(id);
  else if (action === 'decrement') decrement(id);
  else if (action === 'remove')    removeItem(id);
  refreshCart();
}

async function onCategoryClick(e) {
  const btn = e.target.closest('.category-btn');
  if (!btn) return;
  activeCategory = btn.dataset.category || null;
  document.getElementById('search-input').value = '';
  renderCategories(categories, activeCategory);
  await loadProducts(activeCategory);
}

function onSearch(e) {
  const query    = e.target.value.trim().toLowerCase();
  const filtered = query
    ? allProducts.filter(p => p.title.toLowerCase().includes(query))
    : allProducts;
  renderProducts(filtered);
}

async function onClearCart() {
  const ok = await confirm('Se eliminarán todos los productos del carrito.');
  if (!ok) return;
  emptyCart();
  refreshCart();
}

async function onCheckout() {
  const ok = await confirm('¿Querés finalizar la compra?');
  if (!ok) return;
  emptyCart();
  refreshCart();
  bootstrap.Offcanvas.getInstance(document.getElementById('cart-offcanvas'))?.hide();
  await success('¡Gracias por tu compra! Tu pedido fue recibido.');
}

// --- Inicialización ---

async function init() {
  refreshCart();

  try {
    [categories] = await Promise.all([getCategories(), loadProducts()]);
    renderCategories(categories, activeCategory);
  } catch (e) {
    toast(e.message, 'error');
  }

  document.getElementById('product-grid').addEventListener('click', onGridClick);
  document.getElementById('product-modal').addEventListener('click', onModalClick);
  document.getElementById('cart-items').addEventListener('click', onCartClick);
  document.getElementById('category-bar').addEventListener('click', onCategoryClick);
  document.getElementById('search-input').addEventListener('input', onSearch);
  document.getElementById('clear-cart-btn').addEventListener('click', onClearCart);
  document.getElementById('checkout-btn').addEventListener('click', onCheckout);

  document.getElementById('open-cart-btn').addEventListener('click', () => {
    bootstrap.Offcanvas.getOrCreate(document.getElementById('cart-offcanvas')).show();
  });
}

document.addEventListener('DOMContentLoaded', init);
