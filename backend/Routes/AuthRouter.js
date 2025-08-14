const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const {signup,login} = require("../Controllers/AuthController")

const express = require("express");
const router = express.Router();
// when the client is validate in signupvalidation process then he jump to signup process👇 
router.post("/signup",signupValidation,signup)
router.post("/login",loginValidation,login)



module.exports = router;