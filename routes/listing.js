const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const { isLoggedIn, isOwner ,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })

//Listings

//index & create route group
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.array('listing[image]',10),
        validateListing,
        wrapAsync(listingController.createListing)
    );

//NEW Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show, update & delete route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
    isLoggedIn,
    isOwner,
    upload.array('listing[image]',10),
    validateListing,
    wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//EDIT Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;