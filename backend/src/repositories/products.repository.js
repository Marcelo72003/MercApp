const db = require('../data/db.json');

// Función que entrega todos los productos almacenados temporalmente en el archivo de datos.
const findAll = () => {
  return db.products || [];
};

module.exports = { findAll };
