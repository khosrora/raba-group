const { Router } = require('express');
const router = new Router();


const indexCTRL = require('../controllers/indexCTRL');

const { auth } = require('../middleware/auth');
// * desc => everyBody 
// * get /
router.get("/", auth, indexCTRL.homePage);

// * desc => everyBody 
// * get /detailBlog/:id
router.get("/detail-blog/:id", auth, indexCTRL.detailBlog);

// * desc => everyBody 
// * get /Blogs/
router.get("/blogs", auth, indexCTRL.blogs);

// * desc => everyBody 
// * get /aboutUs
router.get("/aboutus", auth, indexCTRL.aboutUs);

// * desc => everyBody 
// * get /contactUs
router.get("/contactus", auth, indexCTRL.getcontactUs);

// * desc => everyBody 
// * post /contactUs
router.post("/contactus", auth, indexCTRL.contactUs);



module.exports = router;