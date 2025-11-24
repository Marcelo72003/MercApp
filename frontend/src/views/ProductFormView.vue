<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProducts from '../composables/useProducts';
import useCategories from '../composables/useCategories';

export default {
  name: 'ProductFormView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { api: productsApi } = useProducts();
    const { api: categoriesApi } = useCategories();

    const product = ref({
      name: '',
      price: 0,
      description: '',
      category: '',
      stock: 0,
      imageUrl: '',
    });
    const categories = ref([]);
    const loading = ref(false);
    const error = ref('');
    const isEditMode = ref(false);

    // Funcion que carga la lista de categorias para el selector.
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.get('/categories');
        categories.value = response.categorias || [];
      } catch (err) {
        categories.value = [];
      }
    };

    // Funcion que carga los datos de un producto cuando existe parametro id.
    const fetchProduct = async () => {
      if (!route.params.id) return;
      isEditMode.value = true;
      loading.value = true;
      error.value = '';
      try {
        const response = await productsApi.get(`/products/${route.params.id}`);
        const data = response.producto || response;
        product.value = {
          name: data.name || '',
          price: data.price || 0,
          description: data.description || '',
          category: data.category || '',
          stock: data.stock || 0,
          imageUrl: data.imageUrl || '',
        };
      } catch (err) {
        error.value = 'No se pudo cargar el producto';
      } finally {
        loading.value = false;
      }
    };

    // Funcion que valida los campos obligatorios y reglas basicas.
    const validateForm = () => {
      if (!product.value.name.trim()) {
        return 'El nombre es obligatorio';
      }
      if (product.value.price === null || product.value.price === undefined || product.value.price <= 0) {
        return 'El precio debe ser mayor a cero';
      }
      if (!product.value.category.trim()) {
        return 'La categoria es obligatoria';
      }
      if (product.value.stock === null || product.value.stock === undefined || product.value.stock < 0) {
        return 'El stock no puede ser negativo';
      }
      if (!product.value.imageUrl.trim() || !product.value.imageUrl.startsWith('http')) {
        return 'La URL de imagen debe ser valida';
      }
      return '';
    };

    // Funcion que envia el formulario usando POST o PUT segun modo.
    const handleSubmit = async () => {
      const validationMessage = validateForm();
      if (validationMessage) {
        error.value = validationMessage;
        return;
      }

      loading.value = true;
      error.value = '';
      try {
        if (isEditMode.value) {
          await productsApi.put(`/products/${route.params.id}`, product.value);
        } else {
          await productsApi.post('/products', product.value);
        }
        router.push('/');
      } catch (err) {
        error.value = 'Ocurrio un problema al guardar el producto';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCategories();
      fetchProduct();
    });

    return {
      product,
      categories,
      loading,
      error,
      isEditMode,
      handleSubmit,
    };
  },
};
</script>

<template>
  <section class="form">
    <header class="panel">
      <h2>{{ isEditMode ? 'Editar producto' : 'Crear producto' }}</h2>
      <p>Completa los campos obligatorios para registrar el producto.</p>
    </header>

    <div v-if="error" class="status error">{{ error }}</div>

    <form class="fields" @submit.prevent="handleSubmit">
      <label class="field">
        <span>Nombre</span>
        <input v-model="product.name" type="text" required />
      </label>

      <label class="field">
        <span>Precio</span>
        <input v-model.number="product.price" type="number" min="0" step="0.01" required />
      </label>

      <label class="field">
        <span>Descripcion</span>
        <textarea v-model="product.description" rows="3" />
      </label>

      <label class="field">
        <span>Categoria</span>
        <select v-model="product.category" required>
          <option value="">Seleccione una categoria</option>
          <option
            v-for="category in categories"
            :key="category.id || category.name"
            :value="category.id || category.name"
          >
            {{ category.name || category.title || 'Categoria' }}
          </option>
        </select>
      </label>

      <label class="field">
        <span>Stock</span>
        <input v-model.number="product.stock" type="number" min="0" step="1" required />
      </label>

      <label class="field">
        <span>URL de imagen</span>
        <input v-model="product.imageUrl" type="url" required />
      </label>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 960px;
  margin: 0 auto;
}

.panel {
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #111827;
}

.field input,
.field textarea,
.field select {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  color: #111827;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

button {
  grid-column: 1 / -1;
  padding: 0.75rem;
  border: none;
  background: #2563eb;
  color: #f8fafc;
  border-radius: 10px;
  cursor: pointer;
}

button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.status.error {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: #fef2f2;
  color: #7f1d1d;
  border: 1px solid #fecdd3;
}

@media (min-width: 768px) {
  .fields {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
