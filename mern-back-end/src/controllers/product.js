const Product = require('../models/product')
const shortId = require('shortid')
const slugify = require('slugify')

exports.createProduct = (req,res,next)=>{
    const {name,price,category,description,quantity,createdBy} = req.body

   let productPictures=[]
   if(req.files.length>0){
       productPictures = req.files.map(file=>{
           return {img:file.filename}
       })
   }
    const product = new Product({
        name,
        slug:slugify(name),
        price,
        quantity,
        category,
        description,
        productPictures,
        createdBy:req.user._id
    })
    product.save((error,products)=>{
        if(error){
            res.status(400).json({error})
        }if(products){
            res.status(200).json({products})
        }
    })
    }

   