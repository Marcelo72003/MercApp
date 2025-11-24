<script>
import { ref, computed, onMounted } from 'vue';
import useProducts from '../composables/useProducts';
import useCategories from '../composables/useCategories';
import ProductCard from '../components/ProductCard.vue';
import useCart from '../composables/useCart';

export default {
  name: 'HomeView',
  components: { ProductCard },
  setup() {
    const products = ref([]);
    const categories = ref([]);
    const searchTerm = ref('');
    const selectedCategory = ref('');
    const loading = ref(false);
    const error = ref('');

    const { api: productsApi } = useProducts();
    const { api: categoriesApi } = useCategories();
    const { addToCart } = useCart();

    // Funcion que consulta al backend los productos y categorias disponibles.
    const fetchData = async () => {
      loading.value = true;
      error.value = '';
      try {
        const productsResponse = await productsApi.get('/products');
        products.value = productsResponse.productos || [];

        const categoriesResponse = await categoriesApi.get('/categories');
        categories.value = categoriesResponse.categorias || [];
      } catch (err) {
        error.value = 'No se pudo cargar la informacion';
      } finally {
        loading.value = false;
      }
    };

    // Funcion computada que filtra productos por termino y categoria seleccionada.
    const filteredProducts = computed(() => {
      const term = searchTerm.value.toLowerCase();
      return products.value.filter((product) => {
        const name = product.name ? product.name.toLowerCase() : '';
        const description = product.description ? product.description.toLowerCase() : '';
        const category = product.category ? String(product.category) : '';

        const matchesTerm =
          term === '' || name.indexOf(term) !== -1 || description.indexOf(term) !== -1;
        const matchesCategory =
          selectedCategory.value === '' || category === selectedCategory.value;

        return matchesTerm && matchesCategory;
      });
    });

    // Funcion que responde al evento de agregar un producto al carrito.
    const handleAddToCart = (product) => {
      addToCart(product);
      alert('Producto agregado al carrito');
    };

    onMounted(fetchData);

    return {
      products,
      categories,
      searchTerm,
      selectedCategory,
      loading,
      error,
      filteredProducts,
      handleAddToCart,
    };
  },
};
</script>

<template>
  <section class="home">
    <header class="panel">
      <h2>Panel principal</h2>
      <p>Busca y filtra productos consumiendo la API de MercApp.</p>
      <!-- Boton que abre el formulario para crear un nuevo producto -->
      <router-link class="create-button" to="/product/new">Nuevo producto</router-link>
    </header>

    <div class="controls">
      <label class="field">
        <span>Buscar</span>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Nombre o descripcion"
        />
      </label>

      <label class="field">
        <span>Categoria</span>
        <select v-model="selectedCategory">
          <option value="">Todas</option>
          <option
            v-for="category in categories"
            :key="category.id || category.name"
            :value="category.id || category.name"
          >
            {{ category.name || category.title || 'Categoria' }}
          </option>
        </select>
      </label>
    </div>

    <div class="status" v-if="loading">Cargando…</div>
    <div class="status error" v-else-if="error">{{ error }}</div>

    <ul class="product-list" v-else>
      <li v-for="product in filteredProducts" :key="product.id">
        <ProductCard :product="product" @added-to-cart="handleAddToCart" />
      </li>
      <li v-if="filteredProducts.length === 0" class="empty">No hay productos para mostrar.</li>
    </ul>
  </section>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel {
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #111827;
  font-size: 0.95rem;
}

.field input,
.field select {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  color: #111827;
}

.field input:focus,
.field select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.status {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: #eef2ff;
  color: #1e1b4b;
  border: 1px solid #c7d2fe;
}

.status.error {
  background: #fef2f2;
  color: #7f1d1d;
  border: 1px solid #fecdd3;
}

.create-button {
  align-self: flex-start;
  padding: 0.55rem 0.9rem;
  background: #2563eb;
  color: #f8fafc;
  border-radius: 8px;
  font-weight: 600;
}

.create-button:hover {
  background: #1d4ed8;
}

.product-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.empty {
  grid-column: 1 / -1;
  text-align: center;
  color: #6b7280;
}

@media (min-width: 640px) {
  .controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .product-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
