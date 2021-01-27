const express = require('express');
const router = express.Router()
const {requireSignin,userMiddleware} = require('../common-middleware/index')
const { addItemToCart, getCartItems } = require('../controllers/cart');

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart)
router.post('/user/getcartitems',requireSignin,userMiddleware,getCartItems)

module.exports=router


