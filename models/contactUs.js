const mongoose = require('mongoose');
const { contactUsValidate } = require('../validation/userValidate');


const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true })

contactSchema.statics.contactUsValidation = function (body) {
    return contactUsValidate.validate(body)
}

module.exports = mongoose.model("Contact", contactSchema)