const express = require("express")
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
var jwt = require('jsonwebtoken');

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSingnupForm)
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true}
    ),
   userController.login);

router.get("/logout",userController.logout);

//google authentication
router.get('/auth/google',
  passport.authenticate('google', { scope: ["profile","email"] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    req.flash("success","Welcome to Wanderlust!");
    res.redirect('/listings');
  });

module.exports = router;