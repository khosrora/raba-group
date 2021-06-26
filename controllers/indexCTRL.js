const Blog = require('../models/blogModel');
const Contact = require('../models/contactUs');

// ?HELPER
const { jalaliMoment } = require('../helper/jalali');
const { truncate } = require('../helper/truncate');






exports.homePage = async (req, res) => {
    const Blogs = await Blog.find().sort({ createdAt: -1 }).limit(8);
    res.render("index", {
        pageTitle: "صفحه اصلی",
        path: "/detail-blog",
        layout: "./layouts/mainLayout",
        Blogs,
        truncate,
        auth
    })
}

exports.detailBlog = async (req, res) => {
    const detailBlog = await Blog.findById(req.params.id).populate("user");
    const Blogs = await Blog.find().sort({ createdAt: -1 }).limit(4);
    res.render("detailBlog", {
        pageTitle: "صفحه اصلی",
        path: "/",
        layout: "./layouts/mainLayout",
        truncate,
        detailBlog,
        jalaliMoment,
        Blogs
    })

}

exports.blogs = async (req, res) => {
    const page = +req.query.page || 1;
    const postPerPage = 6;
    try {

        const numberOfBlogs = await Blog.find().countDocuments();
        const blogs = await Blog.find().skip((page - 1) * postPerPage)
            .sort({ createdAt: -1 }).limit(postPerPage)
        const suggests = await Blog.find().sort({ createdAt: 1 }).limit(3)
        res.render("blogs", {
            pageTitle: "مقالات",
            blogs,
            suggests,
            truncate,
            path: "/",
            layout: "./layouts/mainLayout",
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfBlogs,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfBlogs / postPerPage)
        })
    } catch (err) {
        console.log(err);
    }
}

exports.aboutUs = (req, res) => {
    res.render("aboutUs", {
        pageTitle: "درباره ما",
        path: "/",
        layout: "./layouts/mainLayout",
    })
}


exports.getcontactUs = (req, res) => {
    res.render("contactUs", {
        pageTitle: "تماس با ما",
        path: "/",
        layout: "./layouts/mainLayout",
        message: req.flash("success_msg")
    })
}

exports.contactUs = async (req, res) => {
    const errors = [];
    try {
        // CHECK VALIDATION
        await Contact.contactUsValidation(req.body);
        req.body = { ...req.body };
        await Contact.create({ ...req.body });
        req.flash("success_msg", "پیام شما با موفقیت ارسال شد")
        res.redirect("/contactus")
    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render("contactUs", {
            pageTitle: "تماس با ما",
            path: "/",
            layout: "./layouts/mainLayout",
            message: req.flash("success_msg"),
            errors
        })
    }
}




