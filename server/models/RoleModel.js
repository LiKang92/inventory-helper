
const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
  name: {type: String, required: true}, // role name
  auth_name: String, // authorization user's name
  auth_time: Number, // authorization time
  create_time: {type: Number, default: Date.now}, // creation time
  menus: Array // array that save all menus which user can get access to
})


const RoleModel = mongoose.model('roles', roleSchema)


module.exports = RoleModel
