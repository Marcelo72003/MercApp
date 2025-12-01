const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Product = require('../models/product.model');
const Category = require('../models/category.model');

const dbJsonPath = path.join(__dirname, '../data/db.json');

// Semilla academica: solo para cargar datos iniciales en desarrollo, no debe usarse en produccion real.
const seedDatabaseIfEmpty = async () => {
  try {
    const [productCount, categoryCount] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
    ]);

    if (productCount > 0 || categoryCount > 0) {
      return;
    }

    const rawData = fs.readFileSync(dbJsonPath, 'utf8');
    const parsedData = JSON.parse(rawData);
    const products = parsedData.products || [];
    const categories = parsedData.categories || [];

    if (products.length > 0) {
      await Product.insertMany(products);
    }

    if (categories.length > 0) {
      await Category.insertMany(categories);
    }

    console.log('Semilla academica ejecutada: datos copiados desde src/data/db.json');
  } catch (error) {
    console.error('Error al ejecutar la semilla academica', error);
  }
};

// Funcion que establece la conexion con MongoDB Atlas usando la URI del archivo .env.
const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("DEBUG MONGODB_URI:", process.env.MONGODB_URI);
    if (!uri) {
      throw new Error('La variable de entorno MONGODB_URI no esta definida');
    }

    await mongoose.connect(uri);
    console.log('Conexion a MongoDB Atlas establecida correctamente');

    await seedDatabaseIfEmpty();
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas', error);
    throw error;
  }
};

module.exports = { connectToDatabase, seedDatabaseIfEmpty };
