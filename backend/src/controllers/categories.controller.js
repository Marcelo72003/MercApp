const categoriesService = require('../services/categories.service');

// Funcion que gestiona la solicitud de listado de categorias y retorna la respuesta en JSON.
const getAllCategories = (req, res) => {
  const categories = categoriesService.listCategories();
  res.status(200).json({ categorias: categories });
};

module.exports = { getAllCategories };
