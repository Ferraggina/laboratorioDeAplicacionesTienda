const BASE_URL = 'https://fakestoreapi.com';

function normalizar(producto) {
  return {
    id:          producto.id,
    title:       producto.title,
    description: producto.description,
    image:       producto.image,
    price:       producto.price,
    rate:        producto.rating.rate,
    category:    producto.category,
  };
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener datos de la API (${response.status}): ${url}`);
  }
  return response.json();
}

export async function getProducts() {
  const data = await fetchJSON(`${BASE_URL}/products`);
  return data.map(normalizar);
}

export async function getCategories() {
  return fetchJSON(`${BASE_URL}/products/categories`);
}

export async function getProductsByCategory(category) {
  const data = await fetchJSON(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  return data.map(normalizar);
}
