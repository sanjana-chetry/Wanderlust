const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
require("./passportConfig");
const User = require("./models/user.js");
// const Listing = require("../models/listings.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const wishlistRouter = require("./routes/wishlist.js");
const db_url = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("Connect succesful to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(db_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const store = MongoStore.create({
    mongoUrl : db_url,
    crypto: {
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600,
});
store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
})

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.get("/",(req,res)=>{
    res.redirect("/listings");
});

//Listings
app.use("/listings",listingsRouter);
//REVIEWS
app.use("/listings/:id/reviews",reviewsRouter);
//User
app.use("/",userRouter);

//Wishlist
app.use("/wishlist",wishlistRouter)

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!!"));
});

app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs",{ message });
})

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});
