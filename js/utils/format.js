export function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style:                 'currency',
    currency:              'USD',
    minimumFractionDigits: 2,
  }).format(price);
}
