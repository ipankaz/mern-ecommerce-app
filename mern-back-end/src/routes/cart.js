const express = require('express');
const router = express.Router()
const {requireSignin,userMiddleware} = require('../common-middleware/index')
const { addItemToCart } = require('../controllers/cart');

router.post('/user/cart/additemtocart',requireSignin,userMiddleware,addItemToCart)

module.exports=router


