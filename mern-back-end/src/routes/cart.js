const express = require('express');
const router = express.Router()
const {requireSignin,userMiddleware} = require('../common-middleware/index')
const { addItemToCart, getCartItems , removeCartItems } = require('../controllers/cart');

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart)
router.post('/user/getcartitems',requireSignin,userMiddleware,getCartItems)
router.post('/user/cart/removeitem',requireSignin,userMiddleware,removeCartItems)

module.exports=router


