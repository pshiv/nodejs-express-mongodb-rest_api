const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    productId: String,
    name: String,
    specialFeature: String,
    brand: String,
    itemWeight:String,
    description: String,
    price: Number,
    productDimensions: String,
    material: String,
    files: Array
  })
);

module.exports = Product;