const Category = require('../models/category.model');

// Funcion auxiliar para devolver un objeto plano sin campos internos de MongoDB.
const sanitizeCategory = (doc) => {
  if (!doc) return null;
  const plain = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, ...rest } = plain;
  return rest;
};

// Funcion que ahora recupera las categorias directamente desde MongoDB.
const findAll = async () => {
  try {
    const categories = await Category.find().lean();
    return categories.map(sanitizeCategory);
  } catch (error) {
    console.error('Error al listar categorias desde MongoDB', error);
    throw error;
  }
};

// Funcion que busca una categoria en MongoDB por su identificador textual.
const findById = async (id) => {
  try {
    const category = await Category.findOne({ id: String(id) }).lean();
    return sanitizeCategory(category);
  } catch (error) {
    console.error('Error al buscar una categoria en MongoDB', error);
    throw error;
  }
};

// Funcion que inserta una categoria en MongoDB manteniendo su id legible.
const create = async (category) => {
  try {
    const newCategory = await Category.create(category);
    return sanitizeCategory(newCategory);
  } catch (error) {
    console.error('Error al crear una categoria en MongoDB', error);
    throw error;
  }
};

module.exports = { findAll, findById, create };
