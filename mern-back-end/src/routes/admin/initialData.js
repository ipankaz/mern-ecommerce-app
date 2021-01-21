const express = require("express");
const { initialData } = require("../../controllers/admin/initialData");
const router = express.Router();
const {requireSignin,adminMiddleware} = require('../../common-middleware/index')

router.get("/initialdata",requireSignin , adminMiddleware, initialData);

module.exports = router;
