import { createRouter, createWebHistory } from 'vue-router';
import ProductDetailView from '../views/ProductDetailView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import AboutView from '../views/AboutView.vue';
import ProductFormView from '../views/ProductFormView.vue';

// Funcion que configura las rutas principales de la SPA.
const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/products', name: 'products', component: () => import('../views/HomeView.vue') },
  { path: '/product/:id', name: 'product-detail', component: ProductDetailView },
  { path: '/product/new', name: 'product-new', component: ProductFormView },
  { path: '/product/:id/edit', name: 'product-edit', component: ProductFormView },
  { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
];

// Funcion que crea y retorna la instancia del enrutador de Vue.
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
