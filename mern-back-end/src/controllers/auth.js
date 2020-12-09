const User = require("../models/users");
const jwt = require("jsonwebtoken");
const {validationResult}  = require('express-validator')

exports.signup = (req, res) => {

 

  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "User Already registered",
      });
    }

    const { firstName, lastName, email, password, username } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      const { _id, firstName, lastName, email, role, fullName } = user;
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    }
  });
};
exports.requireSignin =(req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1]
  const user = jwt.verify(token,process.env.SECRET_KEY)
  req.user = user
  
  next()
}
