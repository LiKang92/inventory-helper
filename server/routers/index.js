/*
route moudule to define route
 */
const express = require('express')
const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')

const {PRIVATE_KEY} = require('../config')
const UserModel = require('../models/UserModel')
const RoleModel = require('../models/RoleModel')


// get route objecte
const router = express.Router()

// login
router.post('/login', async(req, res) => {
  const {username, password} = req.body
  // log in according uusername and password

  try{
  const user = await UserModel.findOne({ username:username});
    if (!user) {
    res.send({status: 1, msg: 'Incorrect username'})
    return;
  }
    if (user.password== md5(password)) { // log in successfully
    //token created, expires in 7 days
    const token = jwt.sign({id: user._id}, PRIVATE_KEY, { expiresIn: '7 days' });
    

    if (user.role_id) {
      RoleModel.findOne({_id: user.role_id})
        .then(role => {
          user._doc.role = role
          // returen log in successful information(include user and token) 
          res.send({
            status: 0, 
            data: {
              user,
              token
            }
          })
        })
    } else {
      user._doc.role = {menus: []}
      // returen log in successful information(include user and token) 
      res.send({
        status: 0, 
        data: {
          user,
          token
        }
      })
    }

  } else {// Failed to login
    res.send({status: 1, msg: 'Incorrect password!'})
  }
} 
catch(error){
  console.error('Abnomal login', error)
  res.send({ status: 1, msg: 'Abnomal login, please try again'})
}

})

router.post('/check_token',(req,res)=>{
   res.status(200).json({
      status: 0,
      msg: 'valid token'
    })
})



require('./category')(router)
require('./product')(router)
require('./role')(router)
require('./user')(router)
require('./file-upload')(router)

module.exports = router