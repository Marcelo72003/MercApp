<template>
  <div class="layout">
    <!-- Encabezado academico que identifica la aplicacion -->
    <header class="header">
      <h1>MercApp</h1>
      <p class="subtitle">Panel educativo para practicar SPA con Vue</p>
    </header>

    <Navbar />

    <!-- Contenedor principal donde el enrutador inyecta cada vista -->
    <main class="content">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <div class="loading">Cargando vista…</div>
        </template>
      </Suspense>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fb;
  color: #1f2937;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  padding: 1.5rem 1.25rem;
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  color: #f8fafc;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.subtitle {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  opacity: 0.9;
}

.content {
  flex: 1;
  width: 100%;
  padding: 1.25rem;
  margin: 0 auto;
  max-width: 1200px;
}

.loading {
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 10px;
  text-align: center;
  color: #1f2937;
}

@media (min-width: 640px) {
  .header {
    padding: 2rem 1.75rem;
  }

  .content {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .header {
    padding: 2.5rem 2rem;
  }

  .content {
    padding: 2rem;
  }
}
</style>
