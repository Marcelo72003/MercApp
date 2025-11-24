const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

// Funcion que lee el archivo de base de datos y retorna su contenido como objeto.
const readDatabase = () => {
  const rawData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(rawData);
};

// Funcion que persiste en disco la estructura completa de la base de datos.
const writeDatabase = (data) => {
  const serialized = JSON.stringify(data, null, 2);
  fs.writeFileSync(dbPath, serialized, 'utf8');
};

// Funcion que entrega todos los productos disponibles en el archivo de datos.
const findAll = () => {
  const db = readDatabase();
  return db.products || [];
};

// Funcion que busca un producto por su identificador unico.
const findById = (id) => {
  const db = readDatabase();
  const products = db.products || [];
  const product = products.find((item) => String(item.id) === String(id));
  return product || null;
};

// Funcion que crea un producto nuevo asignando un identificador incremental.
const create = (product) => {
  const db = readDatabase();
  const products = db.products || [];
  const ids = products.map((item) => Number(item.id) || 0);
  const nextId = ids.length > 0 ? Math.max.apply(null, ids) + 1 : 1;
  const newProduct = {
    id: nextId,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock,
    imageUrl: product.imageUrl,
  };
  products.push(newProduct);
  db.products = products;
  writeDatabase(db);
  return newProduct;
};

// Funcion que actualiza un producto existente conservando su identificador.
const update = (id, product) => {
  const db = readDatabase();
  const products = db.products || [];
  const index = products.findIndex((item) => String(item.id) === String(id));

  if (index === -1) {
    return null;
  }

  const updatedProduct = {
    id: products[index].id,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock,
    imageUrl: product.imageUrl,
  };

  products[index] = updatedProduct;
  db.products = products;
  writeDatabase(db);
  return updatedProduct;
};

// Funcion que elimina un producto por su identificador y persiste el cambio.
const remove = (id) => {
  const db = readDatabase();
  const products = db.products || [];
  const index = products.findIndex((item) => String(item.id) === String(id));

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  db.products = products;
  writeDatabase(db);
  return true;
};

module.exports = { findAll, findById, create, update, remove };
