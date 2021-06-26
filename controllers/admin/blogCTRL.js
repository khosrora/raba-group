const Blog = require('../../models/blogModel');
const shortId = require('shortid');
const appRoot = require('app-root-path');
const sharp = require('sharp');
const { unlink } = require('fs/promises');

// ?HELPER
const { jalaliMoment } = require('../../helper/jalali');

exports.getBlogs = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Blog.find().countDocuments();
        const blogs = await Blog.find().skip((page - 1) * postPerPage).sort({ createdAt: -1 }).limit(postPerPage).populate("user");
        res.render("secure/blogs", {
            pageTitle: "پنل مدیریت || بلاگ ها",
            path: "/admin/blogs",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            blogs,
            jalaliMoment,
            message: req.flash("success_msg"),
            index,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getediteBlog = async (req, res) => {
    try {
        const detailblog = await Blog.findById(req.params.id).populate("user");
        res.render("secure/detailBlog", {
            pageTitle: "بخش مدیریت || ساخت بلاگ",
            path: "/admin/detail-blog",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            detailblog
        })
    } catch (err) {
        console.log(err);
    }
}





exports.getcreateBlogs = (req, res) => {
    try {
        res.render("secure/addBlog", {
            pageTitle: "بخش مدیریت || ساخت بلاگ",
            path: "/admin/create-blog",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname
        })
    } catch (error) {
        console.log(err);
    }
}



exports.createBlogs = async (req, res) => {
    const errors = [];
    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/${fileName}`
    try {
        // !VALIDATON
        await Blog.blogValidation(req.body)

        req.body = { ...req.body, image };

        await sharp(image.data).jpeg({ quality: 30 })
            .toFile(uploadPath).catch(err => console.log(err))

        await Blog.create({ ...req.body, user: req.user.id, image: fileName })
        res.redirect("/admin/blogs")
    } catch (err) {
        errors.push({
            message: err.message
        })
        res.render("secure/addBlog", {
            pageTitle: "بخش مدیریت || ساخت بلاگ",
            path: "/admin/create-blog",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            errors
        })
    }
}


exports.editeBlog = async (req, res) => {

    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/${fileName}`

    const detailblog = await Blog.findById(req.params.id);
    try {
        if (image.name) {
            unlink(`${appRoot}/public/uploads/images/${detailblog.image}`)
        }
        await sharp(image.data).jpeg({ quality: 30 })
            .toFile(uploadPath).catch(err => console.log(err))


        const { title, desc } = req.body;
        detailblog.title = title;
        detailblog.desc = desc;
        detailblog.image = image.name ? fileName : detailblog.image;

        await detailblog.save();
        return res.redirect("/admin/blogs")
    } catch (err) {
        console.log(err);
    }
}




exports.deleteBlog = async (req, res) => {
    try {
        const delBlog = await Blog.findOneAndRemove(req.params.id);

        await unlink(`${appRoot}/public/uploads/images/${delBlog.image}`, (err) => {
            console.log(err);
        })

        req.flash("success_msg", "با موفقیت حذف گردید")
        res.redirect("/admin/blogs")
    } catch (err) {
        console.log(err);
    }
}



