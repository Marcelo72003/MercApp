const mongoose = require('mongoose');

// Modelo academico que representa la coleccion de productos en MongoDB Atlas.
const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { versionKey: false }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
