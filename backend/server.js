const express = require('express');
const cors = require('cors');

const productsRoutes = require('./src/routes/products.routes');
const categoriesRoutes = require('./src/routes/categories.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Función que responde al cliente confirmando el estado básico de la API.
app.get('/api/health', (req, res) => {
  res.json({ mensaje: 'API funcionando' });
});

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

// Función que inicia el servidor HTTP en el puerto configurado.
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
