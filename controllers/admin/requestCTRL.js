const Request = require('../../models/requestModel');



// ?HELPER
const { jalaliMoment } = require('../../helper/jalali');

exports.getRequests = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfRequests = await Request.find({ checked: false }).countDocuments();
        const requests = await Request.find().skip((page - 1) * postPerPage)
            .sort({ createdAt: -1 }).limit(postPerPage).populate("user");


        res.render("secure/requests", {
            pageTitle: "پنل مدیریت || درخواست ها",
            path: "/admin/requests",
            layout: "./layouts/dashLayout",
            requests,
            fullname: req.user.fullname,
            jalaliMoment,
            message: req.flash("success_message"),
            index,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfRequests,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfRequests / postPerPage),
        })
    } catch (err) {
        console.log(err);
    }
}

exports.deleteRequest = async (req, res) => {
    try {
        await Request.findByIdAndRemove(req.params.id);
        req.flash("success_message", "حذف شد")
        res.redirect("/admin/request-users")
    } catch (err) {
        console.log(err);
    }
}



exports.checkedRequests = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        request.checked = true;
        request.save();
        res.redirect("/admin/request-users")
    } catch (err) {
        console.log(err);
    }
}

exports.notChecked = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfRequests = await Request.find().countDocuments();
        const requests = await Request.find({ checked: false }).skip((page - 1) * postPerPage)
            .sort({ createdAt: -1 }).limit(postPerPage).populate("user")

        res.render("secure/notCheked", {
            pageTitle: "پنل مدیریت || درخواست ها",
            path: "/admin/requests",
            layout: "./layouts/dashLayout",
            requests,
            fullname: req.user.fullname,
            jalaliMoment,
            message: req.flash("success_message"),
            index,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfRequests,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfRequests / postPerPage),
        })
    } catch (err) {
        console.log(err);
    }
}

exports.notCheckedRequests = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        request.checked = false;
        request.save();
        res.redirect("/admin/request-users")
    } catch (err) {
        console.log(err);
    }
}

exports.detailRequests = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id).populate("user");
        res.render("secure/detailRequest", {
            pageTitle: "پنل مدیریت || درخواست ها",
            path: "/admin/requests",
            layout: "./layouts/dashLayout",
            request,
            fullname: req.user.fullname,
            jalaliMoment,
        })
    } catch (err) {
        console.log(err);
    }
}


