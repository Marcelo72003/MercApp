<script>
import useCart from '../composables/useCart';

export default {
  name: 'CartView',
  setup() {
    const {
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      total,
    } = useCart();

    // Funcion que devuelve el subtotal de un producto especifico.
    const getSubtotal = (item) => {
      return (Number(item.price) || 0) * (Number(item.quantity) || 0);
    };

    return {
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      total,
      getSubtotal,
    };
  },
};
</script>

<template>
  <section class="cart">
    <header class="cart-header">
      <div>
        <h2>Carrito de compras</h2>
        <p class="hint">Revisa tus productos y ajusta cantidades.</p>
      </div>
      <button v-if="cart.length" type="button" class="clear" @click="clearCart">
        Vaciar carrito
      </button>
    </header>

    <div v-if="!cart.length" class="empty">Carrito vacío</div>

    <ul v-else class="cart-list">
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <div class="info">
          <h3>{{ item.name }}</h3>
          <p class="category">Categoria: {{ item.category }}</p>
          <p class="price">${{ item.price }}</p>
          <p class="subtotal">Subtotal: ${{ getSubtotal(item) }}</p>
        </div>
        <div class="actions">
          <div class="quantity">
            <button type="button" @click="decreaseQuantity(item.id)">-</button>
            <span>{{ item.quantity }}</span>
            <button type="button" @click="increaseQuantity(item.id)">+</button>
          </div>
          <button type="button" class="remove" @click="removeFromCart(item.id)">
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <footer v-if="cart.length" class="summary">
      <h3>Total: ${{ total }}</h3>
    </footer>
  </section>
</template>

<style scoped>
.cart {
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hint {
  margin: 0.2rem 0 0 0;
  color: #4b5563;
}

.clear {
  align-self: flex-start;
  padding: 0.5rem 0.75rem;
  border: none;
  background: #ef4444;
  color: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
}

.clear:hover {
  background: #dc2626;
}

.empty {
  text-align: center;
  color: #6b7280;
  padding: 1rem 0;
}

.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cart-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.info h3 {
  margin: 0 0 0.25rem 0;
}

.category,
.price,
.subtotal {
  margin: 0.15rem 0;
  color: #4b5563;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity button {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #f8fafc;
  cursor: pointer;
}

.quantity button:hover {
  background: #1d4ed8;
}

.remove {
  padding: 0.45rem 0.75rem;
  border: none;
  background: #f87171;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}

.remove:hover {
  background: #ef4444;
}

.summary {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: right;
}

@media (min-width: 640px) {
  .cart-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .clear {
    align-self: center;
  }
}

@media (min-width: 768px) {
  .cart-item {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    align-items: flex-end;
  }
}
</style>
