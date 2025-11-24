# MercApp - Catálogo de productos (SPA + API propia)

## Datos del proyecto
Soy Marcelo Darwin Peña Ochoa, estudiante de la Universidad Politécnica Salesiana en la asignatura de Aplicaciones Web con el docente JOSE ROBERTO JAIME CARRIEL; este proyecto corresponde a la Unidad 3 y muestra mi avance en el desarrollo de una SPA con su propia API.

## Requerimientos mínimos
- Node.js y npm instalados.
- Navegador web moderno.
- Git (si se clona desde GitHub).

## Instalación y ejecución
- Clonar el repositorio: `git clone https://github.com/Marcelo72003/MercApp.git`
1) Backend: `cd backend`, luego `npm install` y `npm run dev`.
2) Frontend: `cd frontend`, luego `npm install`, `npm run dev` y acceso a http://localhost:5173.

## Funcionamiento de la aplicación
MercApp es una SPA en Vue 3 que consume una API REST en Node/Express; la comunicación se realiza mediante los endpoints /api/products y /api/categories; la aplicación permite explorar el catálogo, ver detalle, manejar el carrito y administrar productos.

## Cumplimiento de funcionalidades de la actividad
API REST con CRUD de productos y listado de categorías; SPA con Vue 3, Vue Router, vistas Home/Detalle/Carrito/Acerca, búsqueda, filtro y propiedades computadas; composables (useApi, useProducts, useCategories, useCart), lazy loading y <Suspense>; carrito con localStorage y formulario de crear/editar producto con validación.

## Rutas principales
- Backend: /api/products, /api/products/:id, /api/categories.
- Frontend: /, /products, /product/:id, /product/new, /product/:id/edit, /cart, /about.

## Ejemplo práctico de funcionamiento (paso a paso)
1. Iniciar servicios: ejecutar `npm run dev` en backend y `npm run dev` en frontend para levantar API y SPA.
2. Carga inicial: en HomeView se envía GET /api/products para poblar la grilla de productos.
3. Búsqueda y filtro: al escribir en “Buscar” o elegir una categoría, Vue recalcula los resultados con propiedades computadas.
4. Ver detalle: al hacer clic en “Ver detalle”, la SPA solicita GET /api/products/:id y muestra la ficha completa.
5. Añadir al carrito: al presionar “Añadir al carrito”, useCart actualiza el estado y persiste en localStorage.
6. Revisar carrito: en /cart se listan los productos, se muestra subtotal por item y total calculado reactivamente.
7. Crear producto: desde “Nuevo producto” se completa el formulario y se envía POST /api/products para registrar uno nuevo.
8. Editar producto: en el detalle, “Editar” permite enviar PUT /api/products/:id con los cambios del formulario.
9. Eliminar producto: en el detalle, “Eliminar” ejecuta DELETE /api/products/:id para quitarlo de la base.
10. Confirmación: los cambios se reflejan de inmediato en HomeView porque la SPA vuelve a consultar la API y actualiza la vista.
