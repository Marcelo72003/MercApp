const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

// Funcion que lee el archivo de base de datos y entrega su estructura como objeto.
const readDatabase = () => {
  const rawData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(rawData);
};

// Funcion que retorna todas las categorias disponibles en el archivo de datos.
const findAll = () => {
  const db = readDatabase();
  return db.categories || [];
};

// Funcion que busca una categoria por su identificador.
const findById = (id) => {
  const db = readDatabase();
  const categories = db.categories || [];
  const category = categories.find((item) => String(item.id) === String(id));
  return category || null;
};

module.exports = { findAll, findById };
