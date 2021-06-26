const Yup = require('yup');



exports.requestValidate = Yup.object().shape({
    title: Yup.string()
        .required("وارد کردن عنوان الزامی است"),
    request: Yup.string()
        .required("وارد کردن متن درخواست الزامی است"),
})

exports.contactUsValidate = Yup.object().shape({
    firstName: Yup.string()
        .required("نام کاربری الزامی است")
        .min(4, "نام کاربری نمیتواند کمتر از 4 کاراکتر باشد")
        .max(255, "نام کاربری نمیتواند بیشتر از 25 کاراکتر باشد"),
    lastName: Yup.string()
        .required("نام کاربری الزامی است")
        .min(4, "نام کاربری نمیتواند کمتر از 4 کاراکتر باشد")
        .max(255, "نام کاربری نمیتواند بیشتر از 25 کاراکتر باشد"),
    email: Yup.string()
        .email("ایمیل وارد شده معتبر نمیباشد")
        .required("وارد کردن پست الکترونیک الزامی است"),
    title: Yup.string()
        .required("وارد کردن عنوان الزامی است"),
    message: Yup.string()
        .required("وارد کردن پیام الزامی است"),
})