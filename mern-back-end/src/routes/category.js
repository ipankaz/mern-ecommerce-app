const express = require('express');
const router = express.Router()
const {requireSignin,adminMiddleware} = require('../common-middleware/index')
const { addCategory,getCategories, updateCategories, deleteCategory } = require('../controllers/category');
const multer = require('multer')
const shortId = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname )
    }
  })
   
  const upload = multer({ storage: storage })



router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addCategory)
router.post('/category/update',requireSignin,adminMiddleware,upload.array('categoryImage'),updateCategories)
router.post('/category/delete',requireSignin,adminMiddleware,deleteCategory)
router.get('/category/getcategories',getCategories)
module.exports=router


