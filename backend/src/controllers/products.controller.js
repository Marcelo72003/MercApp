const productsService = require('../services/products.service');

// Funcion que gestiona la solicitud de listado de productos y retorna la lista en JSON.
const getAllProducts = (req, res) => {
  const products = productsService.listProducts();
  res.status(200).json({ productos: products });
};

// Funcion que atiende la busqueda de un producto por identificador.
const getProductById = (req, res) => {
  const productId = req.params.id;
  const result = productsService.getProductById(productId);

  if (result.error) {
    return res.status(404).json({ mensaje: result.error });
  }

  return res.status(200).json({ producto: result.data });
};

// Funcion que procesa la creacion de un nuevo producto validando los datos de entrada.
const createProduct = (req, res) => {
  const payload = req.body;
  const result = productsService.createProduct(payload);

  if (result.error) {
    return res.status(400).json({ mensaje: result.error });
  }

  return res.status(201).json({ producto: result.data });
};

// Funcion que maneja la actualizacion de un producto existente.
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const payload = req.body;
  const result = productsService.updateProduct(productId, payload);

  if (result.error) {
    const statusCode = result.notFound ? 404 : 400;
    return res.status(statusCode).json({ mensaje: result.error });
  }

  return res.status(200).json({ producto: result.data });
};

// Funcion que coordina la eliminacion de un producto.
const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const result = productsService.deleteProduct(productId);

  if (result.error) {
    return res.status(404).json({ mensaje: result.error });
  }

  return res.status(200).json({ mensaje: 'Producto eliminado con exito' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
