# TiendaJS — E-commerce SPA

Trabajo Práctico para la materia **Laboratorio de Aplicaciones Web Cliente** (ISTEA).
Alumno: Cristian Ferraggina.

## Stack

- HTML5 semántico + Bootstrap 5 (CDN)
- JavaScript vanilla con ES Modules nativos
- SweetAlert2 (CDN) para notificaciones
- Datos: [fakestoreapi.com](https://fakestoreapi.com)

## Funcionalidades

- Listado de productos con cards (imagen, categoría, rating, precio)
- Filtro por categoría y búsqueda client-side por nombre
- Modal de detalle de producto
- Carrito persistente en `localStorage`: agregar, incrementar, decrementar, quitar y vaciar
- Badge de cantidad en el navbar
- Checkout con confirmación y mensaje de éxito

## Estructura

```
index.html
css/styles.css
js/
  services/productService.js  ← fetch + normalización de API
  storage/cartStorage.js      ← localStorage
  core/cart.js                ← lógica del carrito
  ui/productView.js           ← render de cards, categorías y modal
  ui/cartView.js              ← render del offcanvas del carrito
  ui/notify.js                ← wrappers de SweetAlert2
  utils/format.js             ← formato de precio
  app.js                      ← orquestador de eventos
```
