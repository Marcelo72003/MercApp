# MercApp - CatÃ¡logo de productos (SPA + API propia)

## Datos del proyecto
Soy Marcelo Darwin PeÃ±a Ochoa, estudiante de la Universidad PolitÃ©cnica Salesiana en la asignatura de Aplicaciones Web con el docente JOSE ROBERTO JAIME CARRIEL; este proyecto corresponde a la Unidad 3 y muestra mi avance en el desarrollo de una SPA con su propia API.

## Requerimientos mÃ­nimos
- Node.js y npm instalados.
- Navegador web moderno.
- Git (si se clona desde GitHub).

## InstalaciÃ³n y ejecuciÃ³n
- Clonar el repositorio: `git clone https://github.com/Marcelo72003/MercApp.git`
1) Backend: `cd backend`, luego `npm install` y `npm run dev`.
2) Frontend: `cd frontend`, luego `npm install`, `npm run dev` y acceso a http://localhost:5173.

## Funcionamiento de la aplicaciÃ³n
MercApp es una SPA en Vue 3 que consume una API REST en Node/Express; la comunicaciÃ³n se realiza mediante los endpoints /api/products y /api/categories; la aplicaciÃ³n permite explorar el catÃ¡logo, ver detalle, manejar el carrito y administrar productos.

## Cumplimiento de funcionalidades de la actividad
API REST con CRUD de productos y listado de categorÃ­as; SPA con Vue 3, Vue Router, vistas Home/Detalle/Carrito/Acerca, bÃºsqueda, filtro y propiedades computadas; composables (useApi, useProducts, useCategories, useCart), lazy loading y <Suspense>; carrito con localStorage y formulario de crear/editar producto con validaciÃ³n.

## Rutas principales
- Backend: /api/products, /api/products/:id, /api/categories.
- Frontend: /, /products, /product/:id, /product/new, /product/:id/edit, /cart, /about.

## Ejemplo prÃ¡ctico de funcionamiento (paso a paso)
1. Iniciar servicios: ejecutar `npm run dev` en backend y `npm run dev` en frontend para levantar API y SPA.
2. Carga inicial: en HomeView se envÃ­a GET /api/products para poblar la grilla de productos.
3. BÃºsqueda y filtro: al escribir en â€œBuscarâ€ o elegir una categorÃ­a, Vue recalcula los resultados con propiedades computadas.
4. Ver detalle: al hacer clic en â€œVer detalleâ€, la SPA solicita GET /api/products/:id y muestra la ficha completa.
5. AÃ±adir al carrito: al presionar â€œAÃ±adir al carritoâ€, useCart actualiza el estado y persiste en localStorage.
6. Revisar carrito: en /cart se listan los productos, se muestra subtotal por item y total calculado reactivamente.
7. Crear producto: desde â€œNuevo productoâ€ se completa el formulario y se envÃ­a POST /api/products para registrar uno nuevo.
8. Editar producto: en el detalle, â€œEditarâ€ permite enviar PUT /api/products/:id con los cambios del formulario.
9. Eliminar producto: en el detalle, â€œEliminarâ€ ejecuta DELETE /api/products/:id para quitarlo de la base.
10. ConfirmaciÃ³n: los cambios se reflejan de inmediato en HomeView porque la SPA vuelve a consultar la API y actualiza la vista.

## Despliegue (resumen Unidad 4)
- El backend se desplegara en Railway leyendo las variables MONGODB_URI y PORT proporcionadas por el entorno de ejecucion.
- El frontend se desplegara en Netlify consumiendo la API por medio de VITE_API_URL apuntando a la URL publica de la API.

