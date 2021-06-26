const mongoose = require('mongoose');
const { createBlogValidate } = require('../validation/adminValidate');


const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


blogSchema.statics.blogValidation = function (body) {
    return createBlogValidate.validate(body)
}

module.exports = mongoose.model("Blog", blogSchema)