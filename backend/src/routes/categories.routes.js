const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');

// Ruta que delega la obtencion de todas las categorias al controlador correspondiente.
router.get('/', categoriesController.getAllCategories);

module.exports = router;
