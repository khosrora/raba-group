const User = require('../../models/userModel');

// ?HELPER
const { jalaliMoment } = require('../../helper/jalali');

exports.getHome = (req, res) => {
    res.render("secure/home", {
        pageTitle: "پنل مدیریت || صفحه اول",
        layout: "./layouts/dashLayout",
        fullname: req.user.fullname
    })
}


exports.getUsers = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;

    try {
        const numerOfUsers = await User.find().countDocuments();

        const user = await User.find().skip((page - 1) * postPerPage).limit(postPerPage);
        res.render("secure/users", {
            pageTitle: "پنل مدیریت || کاربران",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            users: user,
            index ,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numerOfUsers,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numerOfUsers / postPerPage),
        })
    } catch (err) {
        console.log(err);
    }
}



exports.deleteUsers = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        res.redirect("/admin/users")
    } catch (err) {
        console.log(err);
    }
}


exports.setAdminUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.isAdmin = true;
        await user.save();
        res.redirect("/admin/users")
    } catch (err) {
        console.log(err);
    }
}


exports.setUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.isAdmin = false;
        await user.save();
        res.redirect("/admin/users")
    } catch (err) {
        console.log(err);
    }
}


exports.detailUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render("secure/user", {
            pageTitle: "پنل مدیریت || صفحه کاربر",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            user,
            jalaliMoment,
        })
    } catch (err) {
        console.log(err);
    }
}