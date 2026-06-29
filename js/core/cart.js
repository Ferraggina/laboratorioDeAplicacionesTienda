import { getCart, saveCart, clearCart } from '../storage/cartStorage.js';

// Estado en memoria — se inicializa desde localStorage al cargar el módulo
let items = getCart();

export function getItems() {
  return items;
}

export function getCount() {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getTotal() {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function addItem(product) {
  const existing = items.find(i => i.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({
      id:       product.id,
      title:    product.title,
      image:    product.image,
      price:    product.price,
      quantity: 1,
    });
  }
  saveCart(items);
}

export function increment(id) {
  const item = items.find(i => i.id === id);
  if (item) {
    item.quantity += 1;
    saveCart(items);
  }
}

export function decrement(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    items = items.filter(i => i.id !== id);
  }
  saveCart(items);
}

export function removeItem(id) {
  items = items.filter(i => i.id !== id);
  saveCart(items);
}

export function emptyCart() {
  items = [];
  clearCart();
}
