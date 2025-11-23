const productsService = require('../services/products.service');

// Función que gestiona la solicitud de listado de productos y retorna una respuesta JSON.
const getAllProducts = (req, res) => {
  const products = productsService.listProducts();
  res.json({ productos: products });
};

module.exports = { getAllProducts };
