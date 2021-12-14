const md5 = require('blueimp-md5');
const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');

/* 
register managing route for manage user
*/
module.exports = function (router) {
  // add user
  router.post('/manage/user/add', (req, res) => {
    // get requset info
    const {username, password} = req.body
    //  check if user exist, if so , return error message, if not then save
    // search by username
    UserModel.findOne({username})
      .then(user => {
        // if user exist
        if (user) {
          // return error info
          res.send({status: 1, msg: 'User exists'})
          return new Promise(() => {
          })
        } else { // if user doesn't exist
          // save
          return UserModel.create({...req.body, password: md5(password || 'kang')})
        }
      })
      .then(user => {
        // return json with user info in it
        res.send({status: 0, data: user})
      })
      .catch(error => {
        console.error('Failed to register', error)
        res.send({ status: 1, msg: 'Failed to register'})
      })
  })


  // update user
  router.post('/manage/user/update', (req, res) => {
    const user = req.body
    UserModel.findOneAndUpdate({_id: user._id}, user)
      .then(oldUser => {
        const data = Object.assign(oldUser, user)
        
        res.send({status: 0, data})
      })
      .catch(error => {
        console.error('Failed to update user', error)
        res.send({ status: 1, msg: 'Failed to update user'})
      })
  })

  // delete user
  router.post('/manage/user/delete', (req, res) => {
    const {userId} = req.body
    UserModel.deleteOne({_id: userId})
      .then((doc) => {
        res.send({status: 0})
      })
  })

  // get all users' list
  router.get('/manage/user/list', (req, res) => {
    UserModel.find({username: {'$ne': 'admin'}})
      .then(users => {
        RoleModel.find().then(roles => {
          res.send({status: 0, data: {users, roles}})
        })
      })
      .catch(error => {
        console.error('Failed to get user list', error)
        res.send({ status: 1, msg: 'Failed to get user list'})
      })
  })

}