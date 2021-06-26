const User = require('../models/userModel');
const passport = require('passport');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render("login", {
        pageTitle: "صفحه ورود || مدیریت",
        path: "/login",
        message: req.flash("success_msg"),
        errors: req.flash("error")
    })
}



exports.loginUser = async (req, res, next) => {
    try {
        if (!req.body["g-recaptcha-response"]) {
            req.flash("success_msg", "اعتبار سنجی کپچا الزامی است")
            return res.redirect("/auth/login");
        }

        const secretKey = process.env.SECRET_KEY;
        const verifyUrl = `
        https://google.com/recaptcha/api/siteverify?secret=${secretKey}
        &response=${req.body["g-recaptcha-response"]}&
        remoteip=${req.connection.remoteAddress}
        `

        const response = await fetch(verifyUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        })
        const json = await response.json();
        const { email, password } = req.body;

        if (!email) {
            req.flash("success_msg", "لطفا پست الکترونیک خود را وارد کنید")
            return res.render("login", {
                pageTitle: "صفحه ورود || مدیریت",
                path: "/login",
                message: req.flash("success_msg"),
            })
        }
        if (!password) {
            req.flash("success_msg", "لطفا کلمه عبور خود را وارد کنید")
            return res.render("login", {
                pageTitle: "صفحه ورود || مدیریت",
                path: "/login",
                message: req.flash("success_msg"),
            })
        }

        if (json.success) {
            passport.authenticate("local", {
                failureRedirect: "/auth/login",
                failureFlash: true
            })(req, res, next);
        }

    } catch (err) {
        req.flash("error", "مشکلی پیش آمده است")
        res.redirect("/auth/login")
    }
}




exports.rememberMe = async (req, res) => {
    if (req.body.remember) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.expire = null
    }
    res.redirect("/")
}





exports.getRegister = (req, res) => {
    res.render("register", {
        pageTitle: "صفحه ورود || مدیریت",
        path: "/register"
    })
}




//? CREATE USER
exports.registerUser = async (req, res) => {
    const errors = [];
    try {
        //CHECK VALIDATION
        await User.userValidation(req.body);
        const { fullname, email, phone, password } = req.body;
        const user = await User.findOne({ email: email });
        const contact = await User.findOne({ phone: phone });
        // CHECK ISUSER
        if (user || contact) {
            errors.push({
                message: "کاربری با این مشخصات وجود دارد"
            })
            return res.render("register", {
                pageTitle: "صفحه ورود || مدیریت",
                path: "/register",
                errors
            })
        }
        // PASSWORD HASH
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullname, email, phone, password: hashPassword
        })
        req.flash("success_msg", "ثبت نام موفقیت آمیز بود")
        res.redirect("/auth/login")
    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render("register", {
            pageTitle: "صفحه ورود || مدیریت",
            path: "/register",
            errors
        })
    }
}




// ?logoutUser
exports.logoutUser = async (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/auth/login');
}