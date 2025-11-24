const categoriesRepository = require('../repositories/categories.repository');

// Funcion que coordina la recuperacion de categorias desde el repositorio de datos.
const listCategories = () => {
  return categoriesRepository.findAll();
};

module.exports = { listCategories };
