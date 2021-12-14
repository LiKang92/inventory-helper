/*
route that oprate file uploading
 */
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  destination: function (req, file, cb) { //create folder manually
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    // console.log('filename()', file)
    var ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})
const upload = multer({storage})
const uploadSingle = upload.single('image')

module.exports = function (router) {

  // uploade img
  router.post('/manage/img/upload', (req, res) => {
    uploadSingle(req, res, function (err) { //error operate
      if (err) {
        return res.send({
          status: 1,
          msg: 'Failed to upload file'
        })
      }
      var file = req.file
      res.send({
        status: 0,
        data: {
          name: file.filename,
          url: 'http://localhost:4000/upload/' + file.filename
        }
      })

    })
  })

  // delete image
  router.post('/manage/img/delete', (req, res) => {
    const {name} = req.body
    fs.unlink(path.join(dirPath, name), (err) => {
      if (err) {
        console.log(err)
        res.send({
          status: 1,
          msg: 'Failed to delete'
        })
      } else {
        res.send({
          status: 0
        })
      }
    })
  })
}
