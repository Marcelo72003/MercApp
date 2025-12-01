const mongoose = require('mongoose');

// Modelo academico que representa la coleccion de categorias en MongoDB Atlas.
const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { versionKey: false }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
