const Yup = require('yup');



exports.schema = Yup.object().shape({
    fullname: Yup.string()
        .required("نام کاربری الزامی است")
        .min(4, "نام کاربری نمیتواند کمتر از 4 کاراکتر باشد")
        .max(255, "نام کاربری نمیتواند بیشتر از 25 کاراکتر باشد"),
    email: Yup.string()
        .email("ایمیل وارد شده معتبر نمیباشد")
        .required("وارد کردن پست الکترونیک الزامی است"),
    phone: Yup.string().
        required("وارد کردن شماره تلفن همراه الزامی است"),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),
    confirmPassword: Yup.string()
        .required("تکرار کلمه عبور الزامی می باشد")
        .oneOf([Yup.ref("password"), null], "کلمات عبور یکسان نیستند")
});


