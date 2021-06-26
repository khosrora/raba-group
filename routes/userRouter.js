const { Router } = require('express');
const router = new Router();


// CONTROLLER
const userCTRL = require('../controllers/userCTRL');
// MIDDLEWARE
const { authenticated, isUser } = require('../middleware/auth');

// * desc => user 
// * get /
router.get("/", authenticated, isUser, userCTRL.profileUser);

// * desc => user 
// * get /dashboard/requests-user
router.get("/requests-user", authenticated, isUser, userCTRL.requestsPage);

// * desc => user 
// * post /dashboard/request
router.post("/request", authenticated, isUser, userCTRL.requestSend);





module.exports = router;


