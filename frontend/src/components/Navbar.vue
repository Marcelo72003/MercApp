<script>
import { ref } from 'vue';

export default {
  name: 'Navbar',
  setup() {
    const isOpen = ref(false);

    // Funcion que alterna la visibilidad del menu en pantallas pequeñas.
    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    // Funcion que cierra el menu tras seleccionar una opcion.
    const closeMenu = () => {
      isOpen.value = false;
    };

    return { isOpen, toggleMenu, closeMenu };
  },
};
</script>

<template>
  <nav class="navbar">
    <!-- Barra de navegacion que organiza los enlaces principales de la SPA -->
    <div class="brand">
      <h2 class="logo">MercApp</h2>
      <button class="menu-toggle" type="button" @click="toggleMenu">
        {{ isOpen ? 'Cerrar' : 'Menú' }}
      </button>
    </div>
    <ul :class="['links', { open: isOpen }]">
      <li><router-link to="/" @click="closeMenu">Inicio</router-link></li>
      <li><router-link to="/products" @click="closeMenu">Productos</router-link></li>
      <li><router-link to="/cart" @click="closeMenu">Carrito</router-link></li>
      <li><router-link to="/about" @click="closeMenu">Acerca</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: #0f172a;
  color: #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo {
  margin: 0;
  font-size: 1.25rem;
}

.menu-toggle {
  padding: 0.45rem 0.75rem;
  background: #1d4ed8;
  color: #f8fafc;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.links {
  list-style: none;
  display: none;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  width: 100%;
}

.links.open {
  display: flex;
}

.links a {
  color: #e2e8f0;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: background 0.2s ease;
  display: block;
}

.links a:hover,
.links a.router-link-active {
  background: rgba(255, 255, 255, 0.12);
}

@media (min-width: 768px) {
  .navbar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .links {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: auto;
  }

  .menu-toggle {
    display: none;
  }
}
</style>
