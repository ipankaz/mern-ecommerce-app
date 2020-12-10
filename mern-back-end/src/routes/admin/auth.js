const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth");
const router = express.Router();
const {validateSignupRequest,validateSigninRequest,isRequestValidated} = require('../../Validators/auth')


router.post("/admin/signin",validateSigninRequest,isRequestValidated, signin);
router.post("/admin/signup",validateSignupRequest,isRequestValidated, signup);


module.exports = router;
