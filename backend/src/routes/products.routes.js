const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

// Ruta que delega la obtención de todos los productos al controlador correspondiente.
router.get('/', productsController.getAllProducts);

module.exports = router;
