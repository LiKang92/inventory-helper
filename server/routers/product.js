const ProductModel = require('../models/ProductModel');
const {pageFilter} = require('../utils')

/* 
register managing route for add product
*/
module.exports = function (router) {
  
  // add product
  router.post('/manage/product/add', (req, res) => {
    const product = req.body
    console.log('product', product)
    ProductModel.findOne({name: product.name})
      .then(p => {
        if (p) {
          res.send({
            status: 1,
            msg: 'Product exists'
          })
        } else {
          ProductModel.create(product)
            .then(product => {
              res.send({
                status: 0,
                data: product
              })
            })
            .catch(error => {
              console.error('Failed to add product', error)
              res.send({
                status: 1,
                msg: 'Failed to add product'
              })
            })
        }
      })
    
  })

  // get product list
  router.get('/manage/product/list', (req, res) => {
    const {pageNum, pageSize} = req.query
    ProductModel.find({})
      .then(products => {
        res.send({status: 0, data: pageFilter(products.reverse(), pageNum, pageSize)})
      })
      .catch(error => {
        console.error('Failed to get product list', error)
        res.send({ status: 1, msg: 'Failed to get product list'})
      })
  })

  // search product list
  router.get('/manage/product/search', (req, res) => {
    const {pageNum, pageSize, searchName, productName, productDesc} = req.query
    let contition = {}
    if (productName) {
      contition = {name: new RegExp(`^.*${productName}.*$`)}
    } else if (productDesc) {
      contition = {desc: new RegExp(`^.*${productDesc}.*$`)}
    }
    ProductModel.find(contition)
      .then(products => {
        res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
      })
      .catch(error => {
        console.error('Failed to search product', error)
        res.send({ status: 1, msg: 'Failed to search product'})
      })
  })

  // get product by id
  router.get('/manage/product/info', (req, res) => {
    const productId = req.query.productId
    ProductModel.findOne({ _id: productId })
      .then(product => {
        res.send({
          status: 0,
          data: product
        })
      })
      .catch(error => {
        console.error('Failed to search product', error)
        res.send({
          status: 1,
          msg: 'Failed to search product'
        })
      })
  })

  // update product
  router.post('/manage/product/update', (req, res) => {
    const product = req.body
    ProductModel.findOneAndUpdate({_id: product._id}, product)
      .then(oldProduct => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('Failed to update product', error)
        res.send({ status: 1, msg: 'Failed to update product'})
      })
  })

  // update product status
  router.post('/manage/product/updateStatus', (req, res) => {
    const {productId, status} = req.body
    ProductModel.findOneAndUpdate({_id: productId}, {status})
      .then(oldProduct => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('Failed to update product status', error)
        res.send({ status: 1, msg: 'Failed to update product status'})
      })
  })
}