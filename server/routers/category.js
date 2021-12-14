const CategoryModel = require('../models/CategoryModel');
/* 
register for category manging route
*/
module.exports = function (router) {
  
  // add category
  router.post('/manage/category/add', (req, res) => {
    const {categoryName} = req.body
    CategoryModel.findOne({name: categoryName})
      .then(category => {
        if (category) {
          res.send({status: 1, msg: 'Category exists'})
        } else {
          CategoryModel.create({name: categoryName})
            .then(category => {
              res.send({status: 0, data: category})
            })
            .catch(error => {
              console.error('Failed to add category', error)
              res.send({ status: 1, msg: 'Failed to add category'})
            })
        }
      })

    
  })

  // get category list
  router.get('/manage/category/list', (req, res) => {
    CategoryModel.find({})
      .then(categorys => {
        res.send({status: 0, data: categorys})
      })
      .catch(error => {
        console.error('Failed to get category list', error)
        res.send({ status: 1, msg: 'Failed to get category list'})
      })
  })

  // update vategory name
  router.post('/manage/category/update', (req, res) => {
    const {categoryId, categoryName} = req.body
    CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
      .then(oldCategory => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('Failed to update category', error)
        res.send({ status: 1, msg: 'Failed to update category'})
      })
  })

  // get category by id
  router.get('/manage/category/info', (req, res) => {
    const categoryId = req.query.categoryId
    CategoryModel.findOne({_id: categoryId})
      .then(category => {
        res.send({status: 0, data: category})
      })
      .catch(error => {
        console.error('Failed to get category info', error)
        res.send({ status: 1, msg: 'Failed to get category info'})
      })
  })
}