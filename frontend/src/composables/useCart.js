import { ref, computed, watch } from 'vue';

const CART_KEY = 'mercapp_cart';

// Funcion que gestiona el estado del carrito y su persistencia en localStorage.
const useCart = () => {
  const cart = ref([]);

  // Funcion que carga el carrito desde almacenamiento local al iniciar.
  const loadCart = () => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        cart.value = JSON.parse(stored);
      } catch (error) {
        cart.value = [];
      }
    }
  };

  // Funcion que persiste el carrito actual en almacenamiento local.
  const saveCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value));
  };

  // Funcion que agrega un producto o incrementa su cantidad si ya existe.
  const addToCart = (product) => {
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index === -1) {
      cart.value.push({ ...product, quantity: 1 });
    } else {
      cart.value[index].quantity += 1;
    }
  };

  // Funcion que elimina un producto del carrito por su identificador.
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
  };

  // Funcion que incrementa la cantidad de un producto especifico.
  const increaseQuantity = (productId) => {
    const item = cart.value.find((p) => p.id === productId);
    if (item) {
      item.quantity += 1;
    }
  };

  // Funcion que reduce la cantidad de un producto y lo elimina si llega a cero.
  const decreaseQuantity = (productId) => {
    const item = cart.value.find((p) => p.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        removeFromCart(productId);
      }
    }
  };

  // Funcion que limpia por completo el carrito.
  const clearCart = () => {
    cart.value = [];
  };

  // Funcion computada que calcula el total a pagar del carrito.
  const total = computed(() => {
    return cart.value.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  });

  loadCart();

  watch(
    cart,
    () => {
      saveCart();
    },
    { deep: true }
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  };
};

export default useCart;
