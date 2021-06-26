exports.authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};
exports.isLoggin = (req, res, next) => {
    if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin === false) {
        res.redirect("/")
    } else {
        next();
    }
}

exports.isUser = (req, res, next) => {
    if (req.user.isAdmin === true) {
        res.redirect("/")
    } else {
        next();
    }
}

exports.auth = (req, res, next) => {
    if (req.user) {
        auth = true;
        next();
    } else {
        auth = false;
        next();
    }
}


