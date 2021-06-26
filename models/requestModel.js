const mongoose = require('mongoose');
const { requestValidate } = require('../validation/userValidate');



const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String
    },
    phoneNum2: {
        type: String
    },
    request: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    checked: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true });


requestSchema.statics.requestValidation = function (body) {
    return requestValidate.validate(body)
}



module.exports = mongoose.model("Request", requestSchema)