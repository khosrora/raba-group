// const Kavenegar = require('kavenegar');

const Request = require('../models/requestModel');
const { requestValidation } = require('../models/requestModel');

// ?HELPERS
const { jalaliMoment } = require('../helper/jalali');
const { truncate } = require('../helper/truncate');


// const api = Kavenegar.KavenegarApi({
//     apikey: process.env.SMS_KEY
// });

exports.profileUser = (req, res) => {
    const user = req.user;
    res.render("user/profileUser.ejs", {
        pageTitle: "داشبورد کاربران || صفحه اول",
        path: "/dashboard",
        user,
        jalaliMoment,
        message: req.flash("success_message")
    })
}


exports.requestsPage = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfRequests = await Request.find().countDocuments();
        const user = req.user;
        const requests = await Request.find({ user: req.user.id }).skip((page - 1) * postPerPage)
            .sort({ createdAt: -1 }).limit(postPerPage)
        res.render("user/requestUser.ejs", {
            pageTitle: "داشبورد کاربران || صفحه درخواست ها",
            path: "/dashboard",
            requests,
            user,
            truncate,
            index,
            jalaliMoment,
            message: req.flash("success_message"),
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfRequests,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfRequests / postPerPage)
        })
    } catch (err) {
        console.log(err);
    }
}

exports.requestSend = async (req, res) => {
    const errors = [];
    const user = req.user;
    try {
        //! VALIDATION
        await Request.requestValidation(req.body)
        req.body = { ...req.body };
        await Request.create({ ...req.body, user: req.user.id });

        //! SEND SMS
        // api.Send({
        //     message: `
        //     ${user.fullname} عزیز درخواست شما ارسال شده
        //     بعد از بررسی درخواست شما توسط همکاران ما با شما تماس گرفته خواهد شد
        //     `,
        //     sender: "10004346",
        //     receptor: `${user.phone}`
        // })
        res.redirect("/dashboard");
    } catch (err) {
        errors.push({
            message: err.message
        })
        res.render("user/profileUser.ejs", {
            pageTitle: "داشبورد کاربران || صفحه اول",
            path: "/dashboard",
            user,
            jalaliMoment,
            message: req.flash("success_message"),
            errors
        })
    }
}