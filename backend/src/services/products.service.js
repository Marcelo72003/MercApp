const productsRepository = require('../repositories/products.repository');

// Funcion que valida los campos minimos requeridos para un producto.
const validateProductData = (product) => {
  if (!product || !product.name || product.name.trim() === '') {
    return 'El nombre del producto es obligatorio';
  }

  if (product.price === undefined || product.price === null || isNaN(product.price)) {
    return 'El precio del producto debe ser numerico';
  }

  if (product.price < 0) {
    return 'El precio del producto no puede ser negativo';
  }

  if (!product.category || product.category.trim() === '') {
    return 'La categoria del producto es obligatoria';
  }

  if (product.stock === undefined || product.stock === null || isNaN(product.stock)) {
    return 'El stock del producto debe ser numerico';
  }

  if (product.stock < 0) {
    return 'El stock del producto no puede ser negativo';
  }

  if (!product.imageUrl || product.imageUrl.trim() === '') {
    return 'La URL de la imagen es obligatoria';
  }

  return '';
};

// Funcion que retorna todos los productos desde MongoDB sin aplicar filtros adicionales.
const listProducts = async () => {
  return productsRepository.findAll();
};

// Funcion que obtiene un producto por su identificador numerico.
const getProductById = async (id) => {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return { error: 'Producto no encontrado' };
  }

  const product = await productsRepository.findById(numericId);
  if (!product) {
    return { error: 'Producto no encontrado' };
  }
  return { data: product };
};

// Funcion que crea un nuevo producto despues de validar sus datos.
const createProduct = async (payload) => {
  const validationMessage = validateProductData(payload);
  if (validationMessage !== '') {
    return { error: validationMessage };
  }

  const productToCreate = {
    name: payload.name,
    description: payload.description,
    price: Number(payload.price),
    category: payload.category,
    stock: Number(payload.stock),
    imageUrl: payload.imageUrl,
  };

  const created = await productsRepository.create(productToCreate);
  return { data: created };
};

// Funcion que actualiza un producto existente con datos validados.
const updateProduct = async (id, payload) => {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return { error: 'Producto no encontrado', notFound: true };
  }

  const existing = await productsRepository.findById(numericId);
  if (!existing) {
    return { error: 'Producto no encontrado', notFound: true };
  }

  const validationMessage = validateProductData(payload);
  if (validationMessage !== '') {
    return { error: validationMessage };
  }

  const productToUpdate = {
    name: payload.name,
    description: payload.description,
    price: Number(payload.price),
    category: payload.category,
    stock: Number(payload.stock),
    imageUrl: payload.imageUrl,
  };

  const updated = await productsRepository.update(numericId, productToUpdate);
  if (!updated) {
    return { error: 'No se pudo actualizar el producto', notFound: true };
  }

  return { data: updated };
};

// Funcion que elimina un producto existente por identificador numerico.
const deleteProduct = async (id) => {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return { error: 'Producto no encontrado', notFound: true };
  }

  const removed = await productsRepository.remove(numericId);
  if (!removed) {
    return { error: 'Producto no encontrado', notFound: true };
  }
  return { data: true };
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
