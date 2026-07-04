const Listing = require("../models/listings.js");
const { geocoding, config } = require("@maptiler/client");
const { cloudinary } = require("../cloudConfig.js");
config.apiKey = process.env.MAP_API_KEY;
const Wishlist = require("../models/wishlist.js");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});

    let userWishlist = null;
    if(req.user){
        userWishlist = await Wishlist.findOne({owner : req.user._id}).populate("wishlists.listings")
    }
    res.render("listings/index.ejs",{ allListings,userWishlist });
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = (async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).
    populate({
        path : "reviews",
        populate : {
            path : "author",
        },
    }).
    populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
})

module.exports.createListing = async(req,res,next)=>{
    let response = await geocoding.forward(
        req.body.listing.location,
        {
            limit: 1,
        }
    );

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = req.files.map(file=>({
        url: file.path,
        filename: file.filename,
    }));

    newListing.geometry = response.features[0].geometry;

    let savedListing = await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async(req,res) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        return res.redirect("/listings");
    }

     const originalImageUrl = listing.image.map(img => ({
        url: img.url,
        previewImageUrl: img.url.replace(
            "/upload",
            "/upload/w_100,h_80"
        )
    }));
    res.render("listings/edit.ejs",{listing, originalImageUrl});
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing });

    if(typeof req.file !== "undefined"){
        listing.image = req.files.map(file => ({
            url : file.path,
            filename : file.filename,
        }));
        await listing.save();
    }

    req.flash("success"," Listing Updated!");
    res.redirect(`/listings/${id}`); 
}

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);

    for(let img of listing.image){
        await cloudinary.uploader.destroy(img.filename);
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
}
