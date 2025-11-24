<script>
// Funcion que define un componente reutilizable para mostrar informacion del producto.
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Funcion que emite un evento informando que el producto se agrego al carrito.
    emitAddToCart() {
      this.$emit('added-to-cart', this.product);
    },
  },
};
</script>

<template>
  <article class="product-card">
    <h3>{{ product.name }}</h3>
    <p class="price">${{ product.price }}</p>
    <p class="category">Categoria: {{ product.category }}</p>
    <p class="description">{{ product.description || 'Sin descripcion disponible' }}</p>

    <div class="actions">
      <button type="button" @click="emitAddToCart">Añadir al carrito</button>
      <router-link class="detail-link" :to="`/product/${product.id}`">Ver detalle</router-link>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

.price {
  margin: 0;
  font-weight: 600;
  color: #1d4ed8;
}

.category {
  margin: 0;
  color: #4b5563;
}

.description {
  margin: 0;
  color: #6b7280;
  line-height: 1.4;
}

.actions {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
  margin-top: 0.5rem;
}

.actions button {
  padding: 0.5rem 0.75rem;
  border: none;
  background: #2563eb;
  color: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
}

.actions button:hover {
  background: #1d4ed8;
}

.detail-link {
  padding: 0.5rem 0.75rem;
  background: #f3f4f6;
  color: #111827;
  text-decoration: none;
  border-radius: 8px;
  text-align: center;
}

.detail-link:hover {
  background: #e5e7eb;
}

@media (min-width: 640px) {
  .actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
