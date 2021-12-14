const RoleModel = require('../models/RoleModel');

/* 
register role management route
*/
module.exports = function (router) {
  // add role
  router.post('/manage/role/add', (req, res) => {
    const {roleName} = req.body
    RoleModel.create({name: roleName})
      .then(role => {
        res.send({status: 0, data: role})
      })
      .catch(error => {
        console.error('Failed to add a role', error)
        res.send({ status: 1, msg: 'Failed to add a role'})
      })
  })

  // get role list
  router.get('/manage/role/list', (req, res) => {
    RoleModel.find()
      .then(roles => {
        res.send({status: 0, data: roles})
      })
      .catch(error => {
        console.error('Failed to get role list', error)
        res.send({ status: 1, msg: 'Failed to get role list'})
      })
  })

  // update role/set authorization
  router.post('/manage/role/update', (req, res) => {
    const role = req.body
    role.auth_time = Date.now()
    RoleModel.findOneAndUpdate({_id: role._id}, role)
      .then(oldRole => {
        
        res.send({status: 0, data: {...oldRole._doc, ...role}})
      })
      .catch(error => {
        console.error('Failed to update role', error)
        res.send({ status: 1, msg: 'Failed to update role'})
      })
  })
}