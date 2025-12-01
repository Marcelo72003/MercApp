const categoriesRepository = require('../repositories/categories.repository');

// Funcion que coordina la recuperacion de categorias desde MongoDB sin exponer detalles al controlador.
const listCategories = async () => {
  return categoriesRepository.findAll();
};

module.exports = { listCategories };
