const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const { isLoggedIn, isOwner ,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");


//Listings
//INDEX ROUTE
router.get("/", wrapAsync(listingController.index));

//NEW Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//SHOW ROUTE
router.get("/:id",wrapAsync(listingController.showListing));

//CREATE Route
router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//EDIT Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

//UPDATE Route
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing));

//DELETE Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;