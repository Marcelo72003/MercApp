const Product = require('../models/product.model');

// Funcion auxiliar para devolver un objeto plano sin campos internos de MongoDB.
const sanitizeProduct = (doc) => {
  if (!doc) return null;
  const plain = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, ...rest } = plain;
  return rest;
};

// Funcion que ahora consulta MongoDB para obtener todos los productos almacenados.
const findAll = async () => {
  try {
    const products = await Product.find().lean();
    return products.map(sanitizeProduct);
  } catch (error) {
    console.error('Error al listar productos desde MongoDB', error);
    throw error;
  }
};

// Funcion que consulta MongoDB para recuperar un producto por su id numerico.
const findById = async (id) => {
  try {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return null;
    }
    const product = await Product.findOne({ id: numericId }).lean();
    return sanitizeProduct(product);
  } catch (error) {
    console.error('Error al buscar un producto en MongoDB', error);
    throw error;
  }
};

// Funcion que escribe en MongoDB creando un producto nuevo con id incremental.
const create = async (product) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 }).lean();
    const nextId =
      lastProduct && typeof lastProduct.id === 'number'
        ? lastProduct.id + 1
        : Date.now();

    const newProduct = await Product.create({ id: nextId, ...product });
    return sanitizeProduct(newProduct);
  } catch (error) {
    console.error('Error al crear un producto en MongoDB', error);
    throw error;
  }
};

// Funcion que actualiza un producto directamente en MongoDB manteniendo su id numerico.
const update = async (id, product) => {
  try {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return null;
    }
    const updated = await Product.findOneAndUpdate(
      { id: numericId },
      { ...product },
      { new: true, lean: true }
    );
    return sanitizeProduct(updated);
  } catch (error) {
    console.error('Error al actualizar un producto en MongoDB', error);
    throw error;
  }
};

// Funcion que elimina un producto en MongoDB en lugar de borrar del archivo.
const remove = async (id) => {
  try {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return false;
    }
    const deleted = await Product.findOneAndDelete({ id: numericId });
    return Boolean(deleted);
  } catch (error) {
    console.error('Error al eliminar un producto en MongoDB', error);
    throw error;
  }
};

module.exports = { findAll, findById, create, update, remove };
