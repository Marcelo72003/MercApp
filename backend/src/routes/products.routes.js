const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

// Ruta que delega la obtencion de todos los productos al controlador correspondiente.
router.get('/', productsController.getAllProducts);

// Ruta que recupera un producto especifico por su identificador.
router.get('/:id', productsController.getProductById);

// Ruta que crea un producto nuevo con los datos proporcionados por el cliente.
router.post('/', productsController.createProduct);

// Ruta que actualiza un producto existente.
router.put('/:id', productsController.updateProduct);

// Ruta que elimina un producto segun su identificador.
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
