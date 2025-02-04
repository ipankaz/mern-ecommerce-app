const Category = require('../models/categories')
const slugify = require('slugify');
const env = require('dotenv')

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }

exports.addCategory = (req,res)=>{
  
    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name)
    }
    if(req.file){
      categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename
    }
     
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }
    const cat = new Category(categoryObj)
    cat.save((error,category)=>{
        if(error){
            res.status(400).json({error})
        }if(category){
            res.status(201).json({category})
        }
    })
    }

    exports.getCategories = (req,res)=>{
        Category.find({}).exec((error,categories)=>{
            if(error){
                res.status(400).json({error})
            }if(categories){
                const categoryList = createCategories(categories);
                res.status(200).json({categoryList})
            }
        })
    }

    exports.updateCategories = async (req,res)=>{
      const updatedCategories = []
      const {_id,name,type,parentId} = req.body
      if(name instanceof Array){
           for(let i = 0 ; i<name.length ; i++){
             const category = {
               name:name[i],
               type:type[i]
             }
             if(parentId[i]!==""){
               category.parentId = parentId[i]
             }
             const updatedCategory = await Category.findOneAndUpdate({_id : _id[i]},category,{new:true})
             updatedCategories.push(updatedCategory)
           }
          return  res.status(201).json({updatedCategories})
      }else{
         const category = {
           name,type
         }
         if(parentId[i]!==""){
           category.parentId = parentId
         }
         const updatedCategory = await Category.findOneAndUpdate({_id : _id[i]},category,{new:true})
         return res.status(201).json({updatedCategory})
      }
      
    }

    exports.deleteCategory = async (req,res) =>{
      const {idsArray} = req.body.payload
      const deletedCategories = []
      for(let i = 0 ; i<idsArray.length ; i++){
        const deletedCategory = await Category.findOneAndDelete({_id:idsArray[i]._id})
        deletedCategories.push(deletedCategory)
      }
      if(idsArray.length===deletedCategories.length){
        res.status(200).json({message:"Category deleted Successfully"})
      }else{
        res.status(400).json({message:"Something went wrong"})
      }
      
      
    }