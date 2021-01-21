const jwt = require('jsonwebtoken')
const multer = require('multer')
const shortId = require('shortid')
const path = require('path')

exports.requireSignin =(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token,process.env.SECRET_KEY)
        req.user = user  
       
    }else{
        return res.status(400).json({message:"Access denied"})
    }
    next()
    
  }
  exports.userMiddleware = (req,res,next)=>{
    if(req.user.role!=="user"){
        res.status(400).json({message:"User Access denied"})
    }
    next()
  }

  exports.adminMiddleware = (req,res,next)=>{
      if(req.user.role!=="admin"){
          res.status(400).json({message:"Admin Access denied"})
      }
      next()
  }

 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname )
    }
  })
   
exports.upload = multer({ storage: storage })
