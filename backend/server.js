const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const express = require("express");
const cors = require("cors");

const productsRoutes = require("./src/routes/products.routes");
const categoriesRoutes = require("./src/routes/categories.routes");
const { connectToDatabase } = require("./src/database/mongo");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Funcion que responde al cliente confirmando el estado basico de la API.
app.get("/api/health", (req, res) => {
  res.json({ mensaje: "API funcionando" });
});

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);

// Funcion que inicia el servidor HTTP en el puerto configurado despues de conectar a la base de datos.
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor por un error en la base de datos", error);
  }
};

startServer();
