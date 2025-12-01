const categoriesService = require('../services/categories.service');

// Funcion que gestiona la solicitud de listado de categorias y retorna la respuesta en JSON.
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.listCategories();
    res.status(200).json({ categorias: categories });
  } catch (error) {
    console.error('Error al listar categorias', error);
    res.status(500).json({ mensaje: 'Error al acceder a la base de datos' });
  }
};

module.exports = { getAllCategories };
