const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');

// Ruta que delega la obtención de todas las categorías al controlador correspondiente.
router.get('/', categoriesController.getAllCategories);

module.exports = router;
