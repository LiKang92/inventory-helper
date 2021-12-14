/*
operate categorys conllection data's Model
 */
// 1.import mongoose
const mongoose = require('mongoose')

// 2.Schema
const productSchema = new mongoose.Schema({
  categoryId: {type: String, required: true}, // category id
  name: {type: String, required: true}, // title
  price: {type: Number, required: true}, // price
  desc: {type: String},
  status: {type: Number, default: 1}, // 1:on sale 2: off sale
  imgs: {type: Array, default: []}, // json that save img name
  detail: {type: String}
})


// 3. defined Model
const ProductModel = mongoose.model('products', productSchema)

// 4. export Model
module.exports = ProductModel