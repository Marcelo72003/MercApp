<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProducts from '../composables/useProducts';
import useCart from '../composables/useCart';

export default {
  name: 'ProductDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const loading = ref(false);
    const error = ref('');
    const { api: productsApi } = useProducts();
    const { addToCart } = useCart();

    // Funcion que obtiene el detalle de un producto segun el parametro de ruta.
    const fetchProduct = async () => {
      loading.value = true;
      error.value = '';
      try {
        const response = await productsApi.get(`/products/${route.params.id}`);
        product.value = response.producto || response;
      } catch (err) {
        error.value = 'No se pudo cargar el producto';
      } finally {
        loading.value = false;
      }
    };

    // Funcion que agrega el producto actual al carrito.
    const handleAddToCart = () => {
      if (product.value) {
        addToCart(product.value);
        alert('Producto agregado al carrito');
      }
    };

    // Funcion que gestiona la eliminacion del producto actual.
    const handleDelete = async () => {
      const confirmed = window.confirm('¿Seguro que desea eliminar este producto?');
      if (!confirmed) {
        return;
      }
      loading.value = true;
      error.value = '';
      try {
        await productsApi.del(`/products/${route.params.id}`);
        router.push('/');
      } catch (err) {
        error.value = 'No se pudo eliminar el producto';
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchProduct);

    return {
      product,
      loading,
      error,
      handleAddToCart,
      handleDelete,
    };
  },
};
</script>

<template>
  <section class="detail">
    <div class="status" v-if="loading">Cargando producto…</div>
    <div class="status error" v-else-if="error">{{ error }}</div>

    <div v-else-if="product" class="card">
      <h2>{{ product.name }}</h2>
      <p class="price">${{ product.price }}</p>
      <p class="category">Categoria: {{ product.category }}</p>
      <p class="description">{{ product.description || 'Sin descripcion disponible' }}</p>
      <p class="stock">Stock: {{ product.stock }}</p>
      <div class="actions">
        <button type="button" @click="handleAddToCart">Añadir al carrito</button>
        <router-link class="edit" :to="`/product/${product.id}/edit`">Editar</router-link>
        <button type="button" class="delete" @click="handleDelete">Eliminar</button>
      </div>
    </div>

    <div v-else class="status">Producto no encontrado.</div>
  </section>
</template>

<style scoped>
.detail {
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  max-width: 820px;
  margin: 0 auto;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.card h2 {
  margin-bottom: 0.35rem;
  color: #111827;
}

.price {
  margin: 0.25rem 0;
  font-weight: 600;
  color: #1d4ed8;
}

.category,
.description,
.stock {
  margin: 0.25rem 0;
  color: #4b5563;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #f8fafc;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  margin-top: 0.5rem;
}

.edit {
  padding: 0.55rem 0.85rem;
  background: #f3f4f6;
  border-radius: 8px;
  color: #111827;
  text-decoration: none;
}

.edit:hover {
  background: #e5e7eb;
}

.delete {
  padding: 0.55rem 0.85rem;
  background: #f87171;
  color: #fff;
  border-radius: 8px;
}

.delete:hover {
  background: #ef4444;
}

.status {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: #eef2ff;
  color: #1e1b4b;
  border: 1px solid #c7d2fe;
  text-align: center;
}

.status.error {
  background: #fef2f2;
  color: #7f1d1d;
  border: 1px solid #fecdd3;
}

@media (min-width: 640px) {
  .actions {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
