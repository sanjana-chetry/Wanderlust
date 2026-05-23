const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const { isLoggedIn, isOwner ,validateListing} = require("../middleware.js");


//Listings
//INDEX ROUTE
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
})
);

//NEW Route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});

//SHOW ROUTE
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
})
);

//CREATE Route
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    req.flash("success","New Listing Created!");
    await newListing.save();
    res.redirect("/listings");
})
);

//EDIT Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(async(req,res) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
})
);

//UPDATE Route
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async(req,res)=>{
    let {id} = req.params;
    req.flash("success"," Listing Updated!");
    await Listing.findByIdAndUpdate(id,{...req.body.listing });
    res.redirect(`/listings/${id}`); 
})
);

//DELETE Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    req.flash("success"," Listing Deleted!");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
);

module.exports = router;