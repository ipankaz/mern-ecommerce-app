const express = require('express');
const router = express.Router()
const {requireSignin,adminMiddleware} = require('../common-middleware/index')
const {createProduct,getProductsBySlug, getProductDetailsById, getProducts, deleteProductById, } = require('../controllers/product')
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

// const { addCategory,getCategories } = require('../controllers/category');
router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPictures'),createProduct)
router.get('/products/:productId',getProductDetailsById)
router.get('/product/:slug',getProductsBySlug)
router.get('/product/getproducts',requireSignin,adminMiddleware,getProducts)
router.delete('/product/deleteproductbyid',requireSignin,adminMiddleware,deleteProductById)

// router.get('/category/getcategories',getCategories)
module.exports=router


