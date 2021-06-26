const { Router } = require('express');
const router = new Router;

const { authenticated, isAdmin } = require('../middleware/auth');
const secureCTRL = require('../controllers/admin/secureCTRL');
const blogCTRL = require('../controllers/admin/blogCTRL');
const requestCTRL = require('../controllers/admin/requestCTRL');
const contactUsCTRL = require('../controllers/admin/contactUsCTRL');

// !SECURECTRL
// * desc => Admin 
// * get /admin/home
router.get("/", authenticated, isAdmin, secureCTRL.getHome)

// * desc => Admin 
// * get /admin/users
router.get("/users", authenticated, isAdmin, secureCTRL.getUsers)

// * desc => Admin 
// * get /admin/usersdelete
router.get("/delete-users/:id", authenticated, isAdmin, secureCTRL.deleteUsers)

// * desc => Admin 
// * get /admin/setAdminUser
router.get("/admin-users/:id", authenticated, isAdmin, secureCTRL.setAdminUsers)

// * desc => Admin 
// * get /admin/setuser
router.get("/set-user/:id", authenticated, isAdmin, secureCTRL.setUser)

// * desc => Admin 
// * get /admin/detail-users
router.get("/detail-users/:id", authenticated, isAdmin, secureCTRL.detailUser)


// ! BLOGCTRL
// * desc => Admin 
// * get /admin/detail-users
router.get("/blogs", authenticated, isAdmin, blogCTRL.getBlogs)

// * desc => Admin 
// * get /admin/create-blogs
router.get("/create-blog", authenticated, isAdmin, blogCTRL.getcreateBlogs)

// * desc => Admin 
// * post /admin/create-blog
router.post("/create-blog", authenticated, isAdmin, blogCTRL.createBlogs)

// * desc => Admin 
// * get /admin/delete-blog
router.get("/delete-blog/:id", authenticated, isAdmin, blogCTRL.deleteBlog)

// * desc => Admin 
// * get /admin/edit-blog
router.get("/edit-blog/:id", authenticated, isAdmin, blogCTRL.getediteBlog)

// * desc => Admin 
//*  post /admin/edit-blog
router.post("/edit-blog/:id", authenticated, isAdmin, blogCTRL.editeBlog)


// !RequestCTRL
// * desc => Admin 
//*  get /admin/request-users
router.get("/request-users", authenticated, isAdmin, requestCTRL.getRequests)
// * desc => Admin 
//*  get /admin/request-delete/:id
router.get("/request-delete/:id", authenticated, isAdmin, requestCTRL.deleteRequest)

// * desc => Admin 
//*  get /admin/checked/:id
router.get("/checked/:id", authenticated, isAdmin, requestCTRL.checkedRequests)

// * desc => Admin 
//*  get /admin/notchecked
router.get("/notCheked", authenticated, isAdmin, requestCTRL.notChecked)

// * desc => Admin 
//*  get /admin/notchecked/:id
router.get("/notchecked/:id", authenticated, isAdmin, requestCTRL.notCheckedRequests)

// * desc => Admin 
//*  get /admin/detail-request/:id
router.get("/detail-request/:id", authenticated, isAdmin, requestCTRL.detailRequests)

// !CONTACT US
// * desc => Admin 
//*  get /admin/contactUs
router.get("/contactUs", authenticated, isAdmin, contactUsCTRL.getContactUs)
// * desc => Admin 
//*  get /admin/detailcontactUs/:id
router.get("/detailcontactUs/:id", authenticated, isAdmin, contactUsCTRL.detailContactUs)
// * desc => Admin 
//*  get /admin/contactUs
router.get("/contactUs/:id", authenticated, isAdmin, contactUsCTRL.deleteContactUs)

module.exports = router;