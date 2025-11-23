const categoriesRepository = require('../repositories/categories.repository');

// Función que coordina la recuperación de categorías desde el repositorio de datos.
const listCategories = () => {
  return categoriesRepository.findAll();
};

module.exports = { listCategories };
