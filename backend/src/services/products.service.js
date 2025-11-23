const productsRepository = require('../repositories/products.repository');

// Función que coordina la recuperación de productos desde el repositorio de datos.
const listProducts = () => {
  return productsRepository.findAll();
};

module.exports = { listProducts };
