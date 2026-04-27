const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const ExpressError = require("../utils/ExpressError");
const  { listingSchema } = require("../schema.js");

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMssg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMssg);
    }else{
        next();
    }
}


//Listings
//INDEX ROUTE
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
})
);

//NEW Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//SHOW ROUTE
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{ listing });
})
);

//CREATE Route
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
    let newListing = new Listing(req.body.listing);
    
    await newListing.save();
    res.redirect("/listings");
})
);

//EDIT Route
router.get("/:id/edit",wrapAsync(async(req,res) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
);

//UPDATE Route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing });
    res.redirect(`/listings/${id}`); 
})
);

//DELETE Route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
);

module.exports = router;