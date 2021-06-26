const ContactUs = require('../../models/contactUs');

// ?HELPER
const { truncate } = require('../../helper/truncate');
const { jalaliMoment } = require('../../helper/jalali');

exports.getContactUs = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const contactOfUsers = await ContactUs.find().countDocuments();
        const contactUs = await ContactUs.find()
            .skip((page - 1) * postPerPage).limit(postPerPage);


        res.render("secure/contactUs", {
            pageTitle: "پنل مدیریت || کاربران",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            index,
            truncate,
            contactUs,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < contactOfUsers,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(contactOfUsers / postPerPage),
        })
    } catch (err) {
        console.log(err);
    }
}

exports.detailContactUs = async (req, res) => {
    try {
        const contactUs = await ContactUs.findById(req.params.id)
        console.log(contactUs);

        res.render("secure/detailContactUs", {
            pageTitle: "پنل مدیریت || پیام ها",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            contactUs,
            jalaliMoment
        })
    } catch (err) {
        console.log(err);
    }
}
exports.deleteContactUs = async (req, res) => {
    try {
        await ContactUs.findByIdAndRemove(req.params.id)
        res.redirect("/admin/contactUs")
    } catch (err) {
        console.log(err);
    }
}