const categoriesService = require('../services/categories.service');

// Función que gestiona la solicitud de listado de categorías y retorna una respuesta JSON.
const getAllCategories = (req, res) => {
  const categories = categoriesService.listCategories();
  res.json({ categorias: categories });
};

module.exports = { getAllCategories };
