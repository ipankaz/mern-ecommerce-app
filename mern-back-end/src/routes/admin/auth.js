const express = require("express");
const { signup, signin , signout} = require("../../controllers/admin/auth");
const router = express.Router();
const {validateSignupRequest,validateSigninRequest,isRequestValidated} = require('../../Validators/auth')
const {requireSignin} = require('../../common-middleware/index')


router.post("/admin/signin",validateSigninRequest,isRequestValidated, signin);
router.post("/admin/signup",validateSignupRequest,isRequestValidated, signup);
router.post("/admin/signout", signout);


module.exports = router;
