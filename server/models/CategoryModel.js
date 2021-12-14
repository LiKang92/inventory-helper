/*
operate categorys conllection data's Model
 */
// 1.import mongoose
const mongoose = require('mongoose')

// 2.Schema
const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
})

// 3. defined Model
const CategoryModel = mongoose.model('categorys', categorySchema)

// 4. export Model
module.exports = CategoryModel