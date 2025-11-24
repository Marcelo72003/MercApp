<template>
  <section class="not-found">
    <!-- Seccion que informa al usuario sobre rutas inexistentes -->
    <h2>404 - Ruta no encontrada</h2>
    <p>El recurso solicitado no existe o fue movido.</p>
  </section>
</template>

<style scoped>
.not-found {
  background: #fff7ed;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #fb923c;
  color: #7c2d12;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.not-found h2 {
  margin-bottom: 0.5rem;
}

.not-found p {
  line-height: 1.4;
}
</style>
