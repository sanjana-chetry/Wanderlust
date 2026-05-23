const express = require("express")
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const {validateReview} = require("../middleware.js")


//Reviews
//Post Review Route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    req.flash("success","New Review Created!");

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let { id,reviewId } = req.params;
    req.flash("success","Review Deleted!");

    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    
    res.redirect(`/listings/${id}`)
}));

module.exports = router;