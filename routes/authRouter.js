const { Router } = require('express');

const router = new Router();


// ? CONTROLLERS
const authCTRL = require('../controllers/authCTRL');

// * desc => login 
// * get /auth/login
router.get("/login",  authCTRL.getLogin)

// * desc => login 
// * post /auth/login
router.post("/login", authCTRL.loginUser, authCTRL.rememberMe)

// * desc => register 
// * get /auth/register
router.get("/register",  authCTRL.getRegister)

// * desc => register 
// * post /auth/register
router.post("/register", authCTRL.registerUser)


// * desc => logout 
// * get /logout
router.get("/logout", authCTRL.logoutUser)


module.exports = router;