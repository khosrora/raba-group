require('dotenv').config({
    path: "./config/.env"
})
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const Kavenegar = require('kavenegar');

// *PASSPORT CONFIG
require('./config/passport');


const app = express();


// *BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//* MONGOOSE CONFIG
const connectDB = require('./config/db');
connectDB()

// *Flash
app.use(flash());

// *FILEUPLOAD
app.use(fileUpload());
// *SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));



// *PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// * VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "./layouts/mainLayout.ejs")
app.use(expressLayouts);

// * PUBLIC FOLDER
app.use(express.static(path.join(__dirname, "public")))

app.use("/", require('./routes/indexRouter'));
app.use("/auth", require('./routes/authRouter'));
app.use("/dashboard", require('./routes/userRouter'));
app.use("/admin", require('./routes/secureRouter'));







PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is Running on port ${PORT}`);
})