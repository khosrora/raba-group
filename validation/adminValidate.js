const Yup = require('yup');



exports.createBlogValidate = Yup.object().shape({
    image: Yup.string()
        .required(" وارد کردن عکس الزامی است"),
    title: Yup.string()
        .required("وارد کردن عنوان الزامی است"),
    desc: Yup.string()
        .required("وارد کردن توضیحات الزامی است"),
})