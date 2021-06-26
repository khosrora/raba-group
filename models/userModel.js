const mongoose = require('mongoose');
const { schema } = require('../validation/auth');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "نام و نام خانوادگی الزامی است"],
        trim: true
    },
    email: {
        type: String,
        required: [true, " پست الکترونیک الزامی است"],
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: 0
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    }
}, { timestamps: true })


userSchema.statics.userValidation = function (body) {
    return schema.validate(body)
}





module.exports = mongoose.model("User", userSchema)