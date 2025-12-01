const productsService = require('../services/products.service');

// Funcion que gestiona la solicitud de listado de productos y retorna la lista en JSON.
const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.listProducts();
    res.status(200).json({ productos: products });
  } catch (error) {
    console.error('Error al listar productos', error);
    res.status(500).json({ mensaje: 'Error al acceder a la base de datos' });
  }
};

// Funcion que atiende la busqueda de un producto por identificador.
const getProductById = async (req, res) => {
  try {
    // Se convierte a numero para mantener el id numerico que usa la API y el modelo en MongoDB.
    const productId = Number(req.params.id);
    const result = await productsService.getProductById(productId);

    if (result.error) {
      return res.status(404).json({ mensaje: result.error });
    }

    return res.status(200).json({ producto: result.data });
  } catch (error) {
    console.error('Error al obtener un producto', error);
    res.status(500).json({ mensaje: 'Error al acceder a la base de datos' });
  }
};

// Funcion que procesa la creacion de un nuevo producto validando los datos de entrada.
const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    const result = await productsService.createProduct(payload);

    if (result.error) {
      return res.status(400).json({ mensaje: result.error });
    }

    return res.status(201).json({ producto: result.data });
  } catch (error) {
    console.error('Error al crear un producto', error);
    res.status(500).json({ mensaje: 'Error al acceder a la base de datos' });
  }
};

// Funcion que maneja la actualizacion de un producto existente.
const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const payload = req.body;
    const result = await productsService.updateProduct(productId, payload);

    if (result.error) {
      const statusCode = result.notFound ? 404 : 400;
      return res.status(statusCode).json({ mensaje: result.error });
    }

    return res.status(200).json({ producto: result.data });
  } catch (error) {
    console.error('Error al actualizar un producto', error);
    res.status(500).json({ mensaje: 'Error al acceder a la base de datos' });
  }
};

// Funcion que coordina la eliminacion de un producto.
const deleteProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const result = await productsService.deleteProduct(productId);

    if (result.error) {
      return res.status(404).json({ mensaje: result.error });
    }

    return res.status(200).json({ mensaje: 'Producto eliminado con exito' });
  } catch (error) {
    console.error('Error al eliminar un producto', error);
    res.status(500).json({ mensaje: 'Error al acceder a la base de datos' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
