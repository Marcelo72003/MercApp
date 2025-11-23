const db = require('../data/db.json');

// Función que entrega todas las categorías almacenadas temporalmente en el archivo de datos.
const findAll = () => {
  return db.categories || [];
};

module.exports = { findAll };
